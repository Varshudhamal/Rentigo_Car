import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5068/api';

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<any[]>(`${this.apiUrl}/Car`);
  }

  getBrands() {
    return this.http.get<any[]>(`${this.apiUrl}/Brand`);
  }

  getModels() {
    return this.http.get<any[]>(`${this.apiUrl}/Model`);
  }

  getCustomers() {
    return this.http.get<any[]>(`${this.apiUrl}/Customer`);
  }

  getBookings() {
    return this.http.get<any[]>(`${this.apiUrl}/Booking`);
  }

  getPayments() {
    return this.http.get<any[]>(`${this.apiUrl}/Payment`);
  }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/User`);
  }
  getBikes() {
  return this.http.get("http://localhost:5068/api/Bike");
}
getCarById(id:number){

  return this.http.get(
    `${this.apiUrl}/Car/${id}`
  );

}
}