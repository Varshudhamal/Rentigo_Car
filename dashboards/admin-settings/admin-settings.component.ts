import { Component } from '@angular/core';

@Component({
  selector: 'admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent {

  successMessage:any='';

  saveSettings(){

    this.successMessage =
    'Settings updated successfully ✓ Changes synced with Rentigo admin dashboard.';

  }

}