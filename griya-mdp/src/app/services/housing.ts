import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Housing } from '../lokasi-perumahan/housing-model';

// Service tersedia di seluruh app
@Injectable({
  providedIn: 'root', 
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/housing';

  // HttpClient - Untuk HTTP requests
  constructor(private http: HttpClient){}

  // Observable<Housing[]> - Return type asynchronous
  getAllHousing(): Observable<Housing[]> {
    return this.http.get<Housing[]>(this.apiUrl); // apiUrl - Endpoint backend (sesuaikan dengan backend Anda)
  }

  getHousingById(id: number): Observable<Housing> {
    return this.http.get<Housing>(`${this.apiUrl}/${id}`);
  }

  filterHousingByType(type: string): Observable<Housing[]> {
    return this.http.get<Housing[]>(`${this.apiUrl}?type=${type}`);
  }
}
