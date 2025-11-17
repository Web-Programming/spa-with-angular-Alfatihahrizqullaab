import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LokasiperumahanComponent } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing-model';
import { CommonModule } from '@angular/common';
import { HOUSING_DATA } from '../data/housing-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LokasiperumahanComponent, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  // Array untuk data perumahan (bisa diisi dari backend nanti)
  housingList: Housing[] = HOUSING_DATA;

  // housingList: Housing = [...];
  filteredList: Housing[] = [];
  selectedFilter: string = 'all';

  ngOnInit() {
    // Initialize filtered list with all housing
    this.filteredList = [...this.housingList];
  }

  filterByType(type: string) {
    this.selectedFilter = type;
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