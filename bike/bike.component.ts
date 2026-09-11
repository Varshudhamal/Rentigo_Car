import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  bikes: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.apiService.getBikes().subscribe({

      next: (data: any) => {
        console.log(data);
        this.bikes = data;
      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  bookNow(bike: any) {

    this.router.navigate(['/booking'], {
      queryParams: {
        vehicle: bike.vehicleNumber,
        image: bike.image,
        price: bike.pricePerDay,
        type: 'Bike'
      }
    });

  }

}