import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← Untuk search
import { LokasiperumahanComponent } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing-model';
import { HousingService } from '../services/housing'; // <- untuk service
import { CommonModule } from '@angular/common';
import { HOUSING_DATA } from '../data/housing-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LokasiperumahanComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  // Array untuk data perumahan (bisa diisi dari backend nanti)
  // housingList: Housing[] = HOUSING_DATA;
  housingList: Housing[] = []; // Data dari BackEnd

  // housingList: Housing = [...];
  
  filteredList: Housing[] = []; // Data setelah Filter/Search

  // State Management
  isLoading: boolean = false; // Loading state or Untuk menampilkan spinner
  errorMessage: string = ''; // Error Message
  selectedFilter: string = 'all'; // Filter Aktif

  // search
  searchQuery: string = ''; // Query Pencarian

  // Pagination
  currentPage: number = 1; // Halaman saat ini
  itemsPerPage: number = 6; // Items per halaman

  // Fallback data (jika backend tidak tersedia)
  private fallbackData: Housing[] = [
    {
      id: 1,
      title: 'Griya Asri Residence',
      location: 'Jakarta Selatan',
      price: 850000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
      rating: 4.5,
      status: 'Available',
      type: 'rumah',
      description: 'Hunian modern dengan desain minimalis di kawasan Jakarta Selatan yang strategis.',
      postedDays: 2
    },
    {
      id: 2,
      title: 'Cendana Green Living',
      location: 'Bekasi',
      price: 650000000,
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop',
      rating: 4.2,
      status: 'Available',
      type: 'rumah',
      description: 'Rumah asri dengan lingkungan hijau, cocok untuk keluarga kecil.',
      postedDays: 5
    },
    {
      id: 3,
      title: 'Asteria Residence',
      location: 'Bandung',
      price: 1200000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      status: 'Available',
      type: 'Villa',
      description: 'Hunian elegan dengan pemandangan pegunungan dan udara sejuk khas Bandung.',
      postedDays: 1
    },
    {
      id: 4,
      title: 'Permata Indah Residence',
      location: 'Surabaya',
      price: 950000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 130,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      rating: 4.4,
      status: 'Sold',
      type: 'rumah',
      description: 'Rumah bergaya modern di kawasan berkembang Surabaya Barat.',
      postedDays: 7
    },
  ];

  constructor(private housingService: HousingService){}

  ngOnInit() {
    // Initialize filtered list with all housing
    // this.filteredList = [...this.housingList]; // <-tanpa back end
    this.loadHousingData();
  }

  loadHousingData(){
    this.isLoading = true;
    this.errorMessage = '';

    // subscribe() - Listen to Observable
    this.housingService.getAllHousing().subscribe({
      // next - callback saat sukses
      next: (data) => {
        this.housingList = data;
        this.filteredList = data;
        this.isLoading = false;
        console.log('Data berhasil dimuat dari backend:', data);
      },
      // error - callback saat error
      error: (err) => {
        console.error('Error loading housing data:', err);
        // Gunakan data fallback
        this.housingList = this.fallbackData;
        this.filteredList = this.fallbackData;
        this.isLoading = false;
        this.errorMessage = 'Menggunakkan data demo (Backend tidak tersedia)';
      }
    })
  }

  filterByType(type: string) {
    // this.selectedFilter = type;
    // if (type === 'all') {
    //   this.filteredList = [...this.housingList];
    // }else{
    //   this.filteredList = this.housingList.filter(h => h.type === type);
    // }
    this.selectedFilter = type;
    this.currentPage = 1;
    this.isLoading = true;
    this.errorMessage = '';

    if(type === 'all'){
      // Load semua data dari backend
      this.housingService.getAllHousing().subscribe({
        next: (data) => {
          this.housingList = data;
          this.filteredList = data;
          this.isLoading = false;

          // Terapakan search jika ada query
          if(this.searchQuery){
            this.applySearch();
          }
        },
        error: (err) => {
          console.log('Error loading all  housing data: ', err);
          // Fallback ke filter lokal
          this.filteredList = [...this.housingList];
          this.isLoading = false;

          // Terapkan search jika ada query
          if(this.searchQuery){
            this.applySearch();
          }
        }
      });
    }else{
      // Filter berdasarkan type dari backend
      this.housingService.filterHousingByType(type).subscribe({
        next: (data) => {
          this.filteredList = data;
          this.isLoading = false;

          // Terapkan search jika ada query
          if(this.searchQuery){
            this.applySearch();
          }
        },
        error: (err) => {
          console.error('Error filtering housing by type: ', err);
          // Fallback ke filter lokal
          this.filteredList = this.housingList.filter(h => h.type === type);
          this.isLoading = false;

          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        }
      })
    }
  }

  isFilterActive(type: string): boolean {
    return this.selectedFilter === type;
  }

  // Computed property untuk data yang ditampilkan (paginated)
  // paginatedList - Hanya 6 items yang ditampilkan per halaman
  get paginatedList(): Housing[]{
    const start = (this.currentPage - 1) * this.itemsPerPage;
    // slice() adalah method JavaScript yang digunakan untuk mengambil sebagian data dari array
    return this.filteredList.slice(start, start + this.itemsPerPage);
  }

  // Total Halaman
  get totalPages(): number{
    // Math.ceil() - Pembulatan ke atas (9 items / 6 = 1.5 → 2 pages)
    return Math.ceil(this.filteredList.length / this.itemsPerPage); // totalPages - Jumlah total halaman (misal: 9 items = 2 halaman)
  }

  // Array untuk loop pagination buttons
  get totalPagesArray(): number[]{
    return Array.from({ length: this.totalPages}, (_, i) => i + 1);
  }

  // index awal item di halaman ini
  get startIndex(): number{
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  // Index akhir item di halaman ini
  get endIndex(): number{
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredList.length);
  }

  // Pindah ke halaman tertentu
  goToPage(page: number){
    // Validasi page >= 1 && page <= totalPages - Cegah navigate ke halaman invalid
    if(page >= 1 && page <= this.totalPages){
      this.currentPage = page;
      // Smooth scroll ke section
      // scrollIntoView() - Scroll otomatis ke section properties
      // behavior: 'smooth' - Animasi scroll yang halus
      document.getElementById('properties')?.scrollIntoView({behavior: 'smooth'}); 
    }
  }

  // Halaman berikutnya
  nextPage(){
    if(this.currentPage < this.totalPages){
      this.goToPage(this.currentPage + 1);
    }
  }

  // Halaman sebelumnya
  previousPage(){
    if(this.currentPage > 1){
      this.goToPage(this.currentPage - 1);
    }
  }

  // Method yang dipanggil saay user mengetik
  searchHousing(){
    this.currentPage = 1; // Reset ke halaman pertama
    this.applySearch();
  }

  // Logic search
  private applySearch(){

    const query = this.searchQuery.toLowerCase().trim(); // trim() - Hapus spasi di awal/akhir

    // Jika search kosong, kembalikan ke filter saat ini
    if(!query){
      this.filterByType(this.selectedFilter);
      return;
    }

    // Base list berdasarkan filter
    let baseList = this.selectedFilter === 'all' ? this.housingList : this.housingList.filter(h => h.type === this.selectedFilter);

    // Apply search pada base list
     // Search pada 4 field: title, location, description, status
    this.filteredList = baseList.filter(house => 
      house.title.toLowerCase().includes(query) || // toLowerCase() - Case-insensitive search
      house.location.toLowerCase().includes(query) || // includes() - Check apakah string mengandung query
      house.description?.toLowerCase().includes(query) ||
      house.status.toLowerCase().includes(query)
    );
  }

  // Clear search
  // Reset pagination ke halaman 1 saat search
  clearSerach(){
    this.searchQuery = '';
    this.filterByType(this.selectedFilter);
  }

  
}