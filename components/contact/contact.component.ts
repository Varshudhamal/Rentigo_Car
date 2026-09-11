import { Component } from '@angular/core';

@Component({
  selector:'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls:['./contact.component.css']
})
export class ContactComponent {

  successMessage = '';
address: any;
contactcomponent: any;
contactForm: any;
contact: any;
message: any;

  sendMessage(
    name:any,
    email:any,
    address:any,
    subject:any,
    message:any
  ){

    if(
      name &&
      email &&
      address &&
      subject &&
      message
    ){

      this.successMessage =
      'Message Sent Successfully ✅';

    }
    else{

      this.successMessage =
      'Please fill all fields ❌';

    }

  }

}