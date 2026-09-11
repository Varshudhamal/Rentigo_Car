import { Component } from '@angular/core';

@Component({
  selector: 'admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent {

  reportMessage:any='';
  reportLink:any='';

  generateReport(){

    this.reportMessage =
    'Payment report generated successfully ✓ Download file ready for May 2026 transactions.';

    this.reportLink =
    'assets/payment-report.pdf';

  }

}