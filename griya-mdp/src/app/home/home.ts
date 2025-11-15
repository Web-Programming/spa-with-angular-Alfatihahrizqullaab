import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Housing, LokasiperumahanComponent } from '../lokasi-perumahan/lokasi-perumahan';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LokasiperumahanComponent, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  // Array untuk data perumahan (bisa diisi dari backend nanti)
  housingList = [
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
      type: 'apartemen',
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
    {
      id: 5,
      title: 'Taman Sakura Hills',
      location: 'Bogor',
      price: 780000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 110,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
      rating: 3,
      status: 'Available',
      type: 'apartemen',
      description: 'Hunian nyaman dengan suasana sejuk dan dekat kawasan wisata Bogor.',
      postedDays: 3
    },
    {
      id: 6,
      title: 'Seruni Lakeview',
      location: 'Depok',
      price: 720000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1074&auto=format&fit=crop',
      rating: 4.3,
      status: 'Available',
      type: 'apartemen',
      description: 'Rumah minimalis dekat danau dengan akses mudah ke pusat kota Depok.',
      postedDays: 4
    }
  ];

  // housingList: Housing = [...];
  filteredList: Housing[] = [];
  selectedFilter: string = 'all';

  ngOnInit() {
    // Initialize filtered list with all housing
    this.filteredList = [...this.housingList];
  }

  filterByType(type: string) {
    this. selectedFilter = type;
    if (type === 'all') {
      this.filteredList = [...this.housingList];
    }else{
      this.filteredList = this.housingList.filter(h => h.type === type);
    }
  }

  isFilterActive(type: string): boolean {
    return this.selectedFilter === type;
  }
  
}