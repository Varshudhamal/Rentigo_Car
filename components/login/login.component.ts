import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  successMessage:any='';

  login(email:any,password:any){

    // ADMIN LOGIN

    if(
      email === 'admin' &&
      password === 'admin123'
    ){

      this.successMessage =
      'Welcome Admin ✓ Redirecting to Admin Dashboard';

      setTimeout(() => {

        window.location.href='/admin-dashboard';

      },1500);

    }

    // USER LOGIN

    else{

      this.successMessage =
      'Login Successful ✓ Welcome back to Rentigo';

      setTimeout(() => {

        window.location.href='/user-dashboard';

      },1500);

    }

  }

}