import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent {

  successMessage:any = '';

  addCar(
    carName:any,
    brand:any,
    price:any,
    location:any,
    image:any
  ){

    if(
      carName &&
      brand &&
      price &&
      location &&
      image
    ){

      this.successMessage =
'Luxury car added successfully ✓ Now visible in Rentigo fleet.';

    }
    else{

      this.successMessage =
      'Please fill all fields';

    }

  }

}