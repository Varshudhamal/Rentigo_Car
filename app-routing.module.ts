import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarsComponent } from './components/cars/cars.component';
import { BookingComponent } from './components/booking/booking.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminCarsComponent } from './dashboards/admin-cars/admin-cars.component';
import { AdminBookingsComponent } from './dashboards/admin-bookings/admin-bookings.component';
import { AdminPaymentsComponent } from './dashboards/admin-payments/admin-payments.component';
import { AdminSettingsComponent } from './dashboards/admin-settings/admin-settings.component';
import { AdminAddCarComponent } from './dashboards/admin-add-car/admin-add-car.component';
import { AdminUsersComponent } from './dashboards/admin-users/admin-users.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserBookingsComponent } from './users/user-bookings/user-bookings.component';
import { UserWishlistComponent } from './users/user-wishlist/user-wishlist.component';
import { UserPaymentsComponent } from './users/user-payments/user-payments.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { AdminAddUserComponent } from './dashboards/admin-add-user/admin-add-user.component';
import { AdminFeedbackComponent } from './pages/admin-feedback/admin-feedback.component';
import { BikeComponent } from './bike/bike.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarsComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'contact', component: ContactComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'admin-cars', component: AdminCarsComponent },
{ path: 'admin-bookings', component: AdminBookingsComponent },
{ path: 'admin-users', component: AdminUsersComponent },
{ path: 'admin-payments', component: AdminPaymentsComponent },
{ path: 'admin-settings', component: AdminSettingsComponent },
{ path:'admin-add-car', component: AdminAddCarComponent },
{ path:'user-profile', component: UserProfileComponent },
{ path:'user-bookings', component: UserBookingsComponent },
{ path:'user-wishlist', component: UserWishlistComponent },
{ path:'user-payments', component: UserPaymentsComponent },
{ path:'user-settings', component: UserSettingsComponent },
{ path:'admin-add-user', component: AdminAddUserComponent },
{path:'my-bookings',component:UserBookingsComponent},
  { path: 'bikes', component: BikeComponent },

{
  path: 'admin-feedback',
  component: AdminFeedbackComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
