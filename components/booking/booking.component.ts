import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  carName:any;
  carImage:any;
  carPrice:any;
  value:string;
selectedCar: any;
  successMessage = '';

  fullName = '';
  email = '';
  phone = '';
  location = '';
  carId: any;
vehicleType: any;
currentStep = 1;

 constructor(
  private route: ActivatedRoute,
  private http: HttpClient,
    private apiService: ApiService

){}

  ngOnInit(): void {

  this.route.queryParams.subscribe(params => {

    this.carId = params['carId'];

    this.carName = params['car'];

    this.carImage = params['image'];

    this.carPrice = params['price'];

    this.vehicleType = params['type'];

    if (this.carId) {

      this.apiService.getCarById(this.carId).subscribe({

        next: (res: any) => {

          console.log(res);

          this.selectedCar = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  });

}
nextStep(){

  this.currentStep = 2;

}
previousStep(){

  this.currentStep = 1;

}


  bookNow(
  name: string,
  email: string,
  phone: string,
  location: string,
) {

  if (!name || !email || !phone || !location) {
    alert('Please fill all fields');
    return;
  }

  const booking = {

    customerName: name,

    email: email,

    phone: phone,

    location: location,

    carId: this.carId,

    carName: this.selectedCar?.model?.name,

    pricePerDay: this.selectedCar?.pricePerDay

  };

  console.log(booking);

  this.successMessage = 'Booking Confirmed Successfully!';

}
}