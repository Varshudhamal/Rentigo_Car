import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:5068/api';

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get(`${this.apiUrl}/Car`);
  }
}