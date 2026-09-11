import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  deleteCar(id: number) {
    return this.http.delete(
      'http://localhost:5068/api/Car/' + id
    );
  }
}