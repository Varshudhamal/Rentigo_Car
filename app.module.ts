
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminAddCarComponent } from './dashboards/admin-add-car/admin-add-car.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarsComponent } from './components/cars/cars.component';

import { BookingComponent } from './components/booking/booking.component';
import { ContactComponent } from './components/contact/contact.component';


import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminCarsComponent } from './dashboards/admin-cars/admin-cars.component';
import { AdminBookingsComponent } from './dashboards/admin-bookings/admin-bookings.component';
import { AdminUsersComponent } from './dashboards/admin-users/admin-users.component';
import { AdminPaymentsComponent } from './dashboards/admin-payments/admin-payments.component';
import { AdminSettingsComponent } from './dashboards/admin-settings/admin-settings.component';

import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { FormsModule } from '@angular/forms';
import { AdminAddUserComponent } from './dashboards/admin-add-user/admin-add-user.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserBookingsComponent } from './users/user-bookings/user-bookings.component';
import { UserWishlistComponent } from './users/user-wishlist/user-wishlist.component';
import { UserPaymentsComponent } from './users/user-payments/user-payments.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminFeedbackComponent } from './pages/admin-feedback/admin-feedback.component';
import { BikeComponent } from './bike/bike.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CarsComponent,
    NavbarComponent,
    FooterComponent,
        BookingComponent,
        ContactComponent,
   AdminDashboardComponent,
UserDashboardComponent,
AdminAddCarComponent,
ProfileComponent,
AdminCarsComponent,
AdminBookingsComponent,
AdminUsersComponent,
AdminPaymentsComponent,
AdminSettingsComponent,
UserProfileComponent,
UserBookingsComponent,
UserWishlistComponent,
UserPaymentsComponent,
UserSettingsComponent,
AdminFeedbackComponent,
  AdminAddUserComponent,
  BikeComponent   ,
],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
   
    HttpClientModule,
        NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
