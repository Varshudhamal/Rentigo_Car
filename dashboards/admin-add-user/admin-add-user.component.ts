import { Component } from '@angular/core';

@Component({
  selector: 'admin-add-user',
  
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {
   user = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  addUser() {
    console.log(this.user);

    // API Call Here
    // this.http.post('https://localhost:5001/api/customer', this.user)
    // .subscribe(res => console.log(res));

    alert('User Added Successfully');
  }
}


