import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from '../home/home';
import { Housing } from './housing-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lokasi-perumahan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lokasi-perumahan.html',
  styleUrls: ['./lokasi-perumahan.css'],
})

export class LokasiperumahanComponent {
  @Input() housing: Housing = { 
      id: 0,
      title: '',
      location: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      image: '',
      rating: 0,
      status: '',
      type: '',
      description: '',
      postedDays: 0
      // Bisa di isi dan bisa juga tidak
   };

  getStars(): number[] {
    return Array(Math.floor(this.housing.rating)).fill(0);
  }

  hasHalfStars(): boolean {
    return this.housing.rating % 1 >= 0.5;
  }

  getEmptyStars(): number[] {
    const fullStars = Math.floor(this.housing.rating);
    const hasHalf = this.hasHalfStars() ? 1 : 0;
    const EmptyStars = 5 - fullStars - hasHalf;
    return Array (EmptyStars).fill(0);
  }

  //Format harga ke Rupiah
  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }
}

