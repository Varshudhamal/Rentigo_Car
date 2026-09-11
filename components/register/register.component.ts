import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  successMessage:any = '';

  constructor(private router: Router){}

  registerUser(
    name:any,
    email:any,
    phone:any,
    password:any
  ){

    if(
      name &&
      email &&
      phone &&
      password
    ){

      this.successMessage =
      'Account Created Successfully ✓ Redirecting...';

      setTimeout(() => {

        this.router.navigate(['/user-dashboard']);
        

      },2000);

    }
    else{

      this.successMessage =
      'Please fill all fields';

    }

  }

}