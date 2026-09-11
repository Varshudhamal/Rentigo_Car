import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: any[] = [];
image:any[]=[];
vehicleNumber:any[]=[];
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {

    this.apiService.getCars().subscribe({
      next: (data: any) => {
        console.log(data);
        this.cars = data;
      },
      error: (error) => {
        console.error('Error loading cars', error);
      }
    });

  }

  

 bookNow(car: any) {

  this.router.navigate(
    ['/booking'],
    {
      queryParams: {

        car: car.brand + ' ' + car.model,

        image: car.image,

        price: car.pricePerDay,

        carId: car.id,

        type: 'Car'

      }
    }
  );

}
  }


