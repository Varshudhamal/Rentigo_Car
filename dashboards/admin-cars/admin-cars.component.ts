import { Component } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent {
  constructor(private carService: CarService) {}

  selectedCar = {
    name: '',
    brand: '',
    price: '',
    location: '',
    status: ''
  };

  editingCar: any = null;

  bmwCar = {
    id: 3,
    name: 'BMW X5',
    brand: 'BMW',
    price: '₹5000/day',
    location: 'Mumbai',
    status: 'Available'
  };

  fordCar = {
    id: 4,
    name: 'Ford Mustang',
    brand: 'Ford',
    price: '₹9000/day',
    location: 'Mumbai',
    status: 'Booked'
  };

  mercedesCar = {
    id: 5,
    name: 'Mercedes C-Class',
    brand: 'Mercedes',
    price: '₹6500/day',
    location: 'Delhi',
    status: 'Available'
  };

  lamboCar = {
    id: 6,
    name: 'Lamborghini Huracan',
    brand: 'Lamborghini',
    price: '₹15000/day',
    location: 'Goa',
    status: 'Booked'
  };

  teslaCar = {
    id: 5,
    name: 'Tesla Model S',
    brand: 'Tesla',
    price: '₹11000/day',
    location: 'Bangalore',
    status: 'Available'
  };

  tharCar = {
    id: 6,
    name: 'Mahindra Thar',
    brand: 'Mahindra',
    price: '₹4000/day',
    location: 'Jaipur',
    status: 'Available'
  };

  audiCar = {
    id: 7,
    name: 'Audi A6',
    brand: 'Audi',
    price: '₹4500/day',
    location: 'Hyderabad',
    status: 'Available'
  };

  rangeRoverCar = {
    id: 8,
    name: 'Range Rover Sport',
    brand: 'Range Rover',
    price: '₹13000/day',
    location: 'Chennai',
    status: 'Booked'
  };

  porscheCar = {
    id: 9,
    name: 'Porsche 911',
    brand: 'Porsche',
    price: '₹18000/day',
    location: 'Mumbai',
    status: 'Available'
  };

  ferrariCar = {
    id: 10,
    name: 'Ferrari F8',
    brand: 'Ferrari',
    price: '₹22000/day',
    location: 'Dubai',
    status: 'Booked'
  };

  openEditModal(car: any) {

    this.editingCar = car;

    this.selectedCar = {
      name: car.name,
      brand: car.brand,
      price: car.price,
      location: car.location,
      status: car.status
    };
  }

  saveChanges() {

    if (this.editingCar) {

      this.editingCar.name = this.selectedCar.name;
      this.editingCar.brand = this.selectedCar.brand;
      this.editingCar.price = this.selectedCar.price;
      this.editingCar.location = this.selectedCar.location;
      this.editingCar.status = this.selectedCar.status;
    }

    alert('Car Updated Successfully');
  }

 deleteCar(car: any) {

  const confirmDelete = confirm(
    `Are you sure you want to delete ${car.carName}?`
  );

  if (confirmDelete) {

    alert(`${car.carName} deleted successfully`);

  }

}
  }

