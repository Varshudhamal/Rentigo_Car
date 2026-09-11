import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Chart } from 'chart.js/auto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];
  searchText = '';
  bookingChart: any;
  statusChart: any;
  totalBookings = 0;
  completed = 0;
  pending = 0;
  cancelled = 0;
  selectedStatus: any;
  completedBookings = 0;
  pendingBookings = 0;
  cancelledBookings = 0;
  selectedBooking: any = null;

  showBookingPopup = false;
  currentPage = 1;

  pageSize = 10;

  totalRecords = 0;

  totalPages = 0;
  sortColumn = '';
  sortDirection = true;
  showConfirm = false;

  confirmTitle = '';

  confirmMessage = '';

  selectedBookingId = 0;

  actionType = '';

  showConfirmPopup = false;
  loading = false;
  showAlert = false;
alertMessage = '';
  refundStatus: any[] = [];
  booking: any;
  customerHistory: any[] = [];
  paymentDetails: any = {};
  customerDetails: any = {};
  carDetails: any = {};
  timeline: any[] = [];
  damageAmount = 0;

  damageRemarks = '';

  damageDetails: any = {};
  actualReturnDate = '';

  chargePerDay = 1000;

  lateCharge: any = {};

  lateDays = 0;

  totalLateCharge = 0;
  newReturnDate = '';

  showExtendPopup = false;
  drivers: any[] = [];

  selectedDriver = 0;
  cancelReason = '';
  showOperationsPopup = false;
  // ================= DRIVER =================

  showDriverPopup = false;
  showDamagePopup = false;
  showLateChargePopup = false;
  summary:any;

  private toastTimeout: any;




  openDriverPopup() {

    this.selectedDriver = 0;

    this.loadDrivers();

    this.showDriverPopup = true;

  }

  closeDriverPopup() {

    this.showDriverPopup = false;

  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMonthlyChart();

    this.loadStatusChart();
    this.loadBookings();
    this.loadDrivers();


    // Dashboard Cards
    this.http.get<number>('http://localhost:5068/api/Booking/total-bookings')
      .subscribe(res => this.totalBookings = res);

    this.http.get<number>('http://localhost:5068/api/Booking/completed-bookings')
      .subscribe(res => this.completedBookings = res);

    this.http.get<number>('http://localhost:5068/api/Booking/pending-bookings')
      .subscribe(res => this.pendingBookings = res);

    this.http.get<number>('http://localhost:5068/api/Booking/cancelled-bookings')
      .subscribe(res => this.cancelledBookings = res);

  }

  loadBookings() {

    this.loading = true;

    this.http.get<any>(
      `http://localhost:5068/api/Booking/paged?page=${this.currentPage}&pageSize=${this.pageSize}`
    )
      .subscribe(res => {

        this.bookings = res.data;
        this.filteredBookings = res.data;

        this.totalRecords = res.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

        this.loading = false;

      }, () => {

        this.loading = false;

      });

  }



  searchBookings() {

    this.filteredBookings =
      this.bookings.filter(x =>

        (x.customerID + '').includes(this.searchText) ||

        (x.carID + '').includes(this.searchText) ||

        x.bookingStatus
          .toLowerCase()
          .includes(this.searchText.toLowerCase())

      );

  }

  approve(id: number) {

    this.http.put(
      `http://localhost:5068/api/Booking/approve/${id}`, {}
    ).subscribe(() => {
    this.alertMessage = "Booking Approved Successfully.";

      this.closePopup();

      this.loadBookings();

    });

  }

  cancel(id: number) {

    this.http.put(
      `http://localhost:5068/api/Booking/cancel/${id}`, {}
    ).subscribe(() => {
    this.alertMessage = "Booking cancelled Successfully.";
      this.closePopup();

      this.loadBookings();

    });


  }
  complete(id: number) {

    this.http.put(
      `http://localhost:5068/api/Booking/complete/${id}`, {}
    ).subscribe(() => {
    this.alertMessage = "Booking Completed Successfully.";
      this.closePopup();

      this.loadBookings();

    });

  }

  exportBookings(): void {

    const worksheet = XLSX.utils.json_to_sheet(this.filteredBookings);

    const workbook = {
      Sheets: {
        data: worksheet
      },
      SheetNames: ['data']
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    FileSaver.saveAs(data, 'Bookings.xlsx');

  }



  filterBookings() {

    this.filteredBookings = this.bookings.filter(b => {

      const matchesSearch =
        (b.customerID + '').includes(this.searchText) ||
        (b.carID + '').includes(this.searchText) ||
        b.bookingStatus.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'All' ||
        b.bookingStatus === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }


  viewBooking(booking: any) {
      console.log("BOOKING =", booking);


    this.selectedBooking = booking;
    
    this.loadBookingSummary(booking.bookingID);

    this.showBookingPopup = true;

    this.loadCustomerHistory(booking.customerID);

    this.loadPaymentDetails(booking.bookingID);

    this.loadCustomerDetails(booking.customerID);

    this.loadCarDetails(booking.carID);

    this.loadTimeline(booking.bookingID);

    this.loadDamageCharge(booking.bookingID);

    this.loadLateCharge(booking.bookingID);

  }
  closePopup(): void {

    this.showBookingPopup = false;

    this.selectedBooking = null;

  }
  openOperationsPopup() {

    this.showBookingPopup = false;

    setTimeout(() => {

      this.showOperationsPopup = true;

    }, 50);

  }

  closeOperationsPopup() {

    this.showOperationsPopup = false;

    setTimeout(() => {

      this.showBookingPopup = true;

    }, 50);

  }
  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadBookings();

    }

  }

  nextPage() {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.loadBookings();

    }

  }
  sort(column: string) {

    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }

    this.filteredBookings.sort((a: any, b: any) => {

      let valueA = a[column];
      let valueB = b[column];

      if (column === 'startDate' || column === 'endDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB)
        return this.sortDirection ? -1 : 1;

      if (valueA > valueB)
        return this.sortDirection ? 1 : -1;

      return 0;

    });

  }
  openConfirm(action: string, id: number) {

    this.selectedBookingId = id;

    this.actionType = action;

    if (action == 'approve') {

      this.confirmTitle = 'Approve Booking';

      this.confirmMessage =
        'Are you sure you want to approve this booking?';

    }

    if (action == 'cancel') {

      this.confirmTitle = 'Cancel Booking';

      this.confirmMessage =
        'Are you sure you want to cancel this booking?';

    }

    if (action == 'complete') {

      this.confirmTitle = 'Complete Booking';

      this.confirmMessage =
        'Mark this booking as completed?';

    }

    else if (action == 'refund') {

      this.confirmTitle = 'Refund Booking';

      this.confirmMessage = 'Are you sure you want to process the refund?';

    }

    this.showConfirm = true;

  }
  confirmAction() {

    if (this.actionType == 'approve') {

      this.approve(this.selectedBookingId);

    }

    if (this.actionType == 'cancel') {

      this.cancel(this.selectedBookingId);

    }

    if (this.actionType == 'complete') {

      this.complete(this.selectedBookingId);

    }

    else if (this.actionType == 'refund') {

      this.refundBooking(this.selectedBookingId);

    }



    this.showConfirm = false;

  }

  deleteBooking(id: number) {

    if (confirm("Delete this booking?")) {

      this.http.delete(
        `http://localhost:5068/api/Booking/${id}`
      )
        .subscribe(() => {

    this.alertMessage = "Booking Deleted.";

          this.loadBookings();

        });

    }

  }

  closeConfirmPopup() {
    this.showConfirm = false;
  }
  
  loadMonthlyChart() {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/monthly-bookings-chart'
    ).subscribe(data => {

      const labels = data.map(x => "Month " + x.month);

      const bookings = data.map(x => x.bookings);

      if (this.bookingChart) {

        this.bookingChart.destroy();

      }

      this.bookingChart = new Chart(

        'bookingChart',

        {

          type: 'bar',

          data: {

            labels: labels,

            datasets: [{

              label: 'Bookings',

              data: bookings,

              backgroundColor: '#2563EB'

            }]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false

          }

        });

    });

  }
  loadStatusChart() {

    this.http.get<any>(
      'http://localhost:5068/api/Booking/booking-status-chart'
    ).subscribe(data => {

      if (this.statusChart) {

        this.statusChart.destroy();

      }

      this.statusChart = new Chart(

        'statusChart',

        {

          type: 'pie',

          data: {

            labels: [

              'Pending',

              'Confirmed',

              'Completed',

              'Cancelled'

            ],

            datasets: [{

              data: [

                data.pending,

                data.confirmed,

                data.completed,

                data.cancelled

              ],

              backgroundColor: [

                '#F59E0B',

                '#10B981',

                '#3B82F6',

                '#EF4444'

              ]

            }]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false

          }

        });

    });

  }
  downloadInvoice(booking: any) {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.setTextColor(37, 99, 235);

    doc.text("RENTIGO", 15, 20);

    doc.setFontSize(11);

    doc.setTextColor(100);

    doc.text("Premium Car Rental Service", 15, 28);

    doc.setDrawColor(200);

    doc.line(15, 34, 195, 34);

    doc.setFontSize(16);

    doc.setTextColor(0);

    doc.text("BOOKING INVOICE", 15, 45);

    doc.setFontSize(11);

    doc.text("Invoice No : INV-" + booking.bookingID, 15, 58);

    doc.text("Booking ID : " + booking.bookingID, 15, 66);

    doc.text("Customer : " + booking.customerName, 15, 74);

    doc.text("Vehicle : " + booking.vehicleNumber, 15, 82);

    doc.text("Pickup : " + new Date(booking.startDate).toLocaleDateString(), 15, 90);

    doc.text("Return : " + new Date(booking.endDate).toLocaleDateString(), 15, 98);

    doc.text("Status : " + booking.bookingStatus, 15, 106);

    autoTable(doc, {

      startY: 118,

      head: [["Description", "Amount"]],

      body: [

        ["Rental Charges", "₹" + booking.totalAmount],

        ["GST (18%)", "₹" + (booking.totalAmount * 0.18).toFixed(2)],

        ["Security Deposit", "₹5000"]

      ]

    });

    const gst = booking.totalAmount * 0.18;

    const grand = booking.totalAmount + gst + 5000;

    doc.setFontSize(14);

    doc.text("Grand Total : ₹" + grand.toFixed(2), 15, (doc as any).lastAutoTable.finalY + 15);

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text("Thank you for choosing Rentigo.", 15, (doc as any).lastAutoTable.finalY + 30);

    doc.save("Invoice_" + booking.bookingID + ".pdf");

  }
  saveAdminNote() {

  this.http.put(
    `http://localhost:5068/api/Booking/admin-note/${this.selectedBooking.bookingID}`,
    JSON.stringify(this.selectedBooking.adminNote),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).subscribe(() => {

    alert("Note Saved");

  });

}
  refundBooking(id: number) {



    this.http.put(
      `http://localhost:5068/api/Booking/refund/${id}`,
      {}
    ).subscribe({
      next: (res) => {



    this.alertMessage = "Refund Processed Successfully.";

        this.loadBookings();

        // this.closeConfirmPopup();//
      },
      error: (err) => {
        console.log("ERROR", err);
      }
    });


  }
  loadCustomerHistory(customerId: number) {

    this.http.get<any[]>(

      `http://localhost:5068/api/Booking/customer-history/${customerId}`

    ).subscribe(res => {

      this.customerHistory = res;

    });

  }
  loadPaymentDetails(bookingId: number) {

    this.http.get<any>(
      `http://localhost:5068/api/Booking/payment-details/${bookingId}`
    ).subscribe({

      next: (res) => {

        this.paymentDetails = res;

      },

      error: () => {

        this.paymentDetails = {};

      }

    });

  }


  
  loadCustomerDetails(customerId: number) {

    this.http.get<any>(
      `http://localhost:5068/api/Booking/customer-details/${customerId}`
    )

      .subscribe(res => {

        this.customerDetails = res;

      });

  }
  loadCarDetails(carId: number) {

    this.http.get<any>(
      `http://localhost:5068/api/Booking/car-details/${carId}`
    )

      .subscribe(res => {

        this.carDetails = res;

      });

  }
  loadTimeline(id: number) {

    

    this.http.get<any[]>(

      `http://localhost:5068/api/Booking/timeline/${id}`

    ).subscribe(res => {

      this.timeline = res;

    });
  }

loadBookingSummary(id:number){

this.http.get<any>(
'http://localhost:5068/api/Booking/booking-summary/'+id
)

.subscribe(res=>{

this.summary=res;

});

}
    

  
  printBooking() {

    const content = document.getElementById('printSection')?.innerHTML;

    const popup = window.open('', '_blank', 'width=900,height=700');

    popup?.document.write(`

<html>

<head>

<title>Booking Receipt</title>

<style>

body{

font-family:Arial;

padding:30px;

}

h1{

text-align:center;

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

td{

padding:10px;

border:1px solid #ddd;

}

</style>

</head>

<body>

${content}

<script>

window.print();

window.close();

</script>

</body>

</html>

`);

    popup?.document.close();

  }
  sendEmail(id: number) {

    this.http.post(

      `http://localhost:5068/api/Booking/send-email/${id}`,

      {}

    )

      .subscribe({

        next: () => {

          alert("Email Sent");

        },

        error: () => {

          alert("Email Failed");

        }

      });
  }
  sendWhatsApp() {

    const phone = this.customerDetails.phone;

    const message =

      `🚗 Rentigo Booking Receipt

Booking ID : ${this.selectedBooking.bookingID}

Vehicle : ${this.selectedBooking.vehicleNumber}

Pickup : ${this.selectedBooking.startDate}

Return : ${this.selectedBooking.endDate}

Amount : ₹${this.selectedBooking.totalAmount}

Status : ${this.selectedBooking.bookingStatus}

Thank you for choosing Rentigo.`;

    window.open(

      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,

      '_blank'

    );


  }
  saveDamageCharge() {

  const obj = {
    bookingID: this.selectedBooking.bookingID,
    damageAmount: this.damageAmount,
    damageDescription: this.damageRemarks
  };

  this.http.post(
    'http://localhost:5068/api/Booking/damage-charge',
    obj
  ).subscribe({

    next: () => {

      this.showDamagePopup = false;

      this.loadDamageCharge(this.selectedBooking.bookingID);

      // Custom Alert
      this.alertMessage = "Damage charge saved successfully.";
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 2500);

    },

    error: () => {

      this.alertMessage = "Failed to save damage charge.";
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 2500);

    }

  });

}
  loadDamageCharge(id: number) {

    this.http.get<any>(

      `http://localhost:5068/api/Booking/damage-charge/${id}`

    ).subscribe(res => {

      this.damageDetails = res;

    });

  }
  calculateLateCharge() {

    const expected = new Date(this.selectedBooking.endDate);

    const actual = new Date(this.actualReturnDate);

    const diff = actual.getTime() - expected.getTime();

    this.lateDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (this.lateDays < 0)
      this.lateDays = 0;

    this.totalLateCharge =

      this.lateDays * this.chargePerDay;

  }
  saveLateCharge() {

    const obj = {
  bookingID: this.selectedBooking.bookingID,
  expectedReturnDate: this.selectedBooking.endDate,
  actualReturnDate: this.actualReturnDate,
  lateDays: this.lateDays,
  chargePerDay: this.chargePerDay,
  totalCharge: this.totalLateCharge
};
    this.http.post(

      'http://localhost:5068/api/Booking/late-return',

      obj

   ).subscribe({

  next: () => {

    this.showLateChargePopup = false;

    this.loadLateCharge(this.selectedBooking.bookingID);

    this.alertMessage = "Late return charge saved successfully.";
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2500);

  },

  error: () => {

    this.alertMessage = "Failed to save late return charge.";
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2500);

  }

});
  }
  loadLateCharge(id: number) {

    this.http.get<any>(

      `http://localhost:5068/api/Booking/late-return/${id}`

    ).subscribe(res => {

      this.lateCharge = res;

    });

  }


  openExtendPopup() {

    this.newReturnDate = '';

    this.showExtendPopup = true;

  }
  closeExtendPopup() {

    this.showExtendPopup = false;

  }


extendBooking() {


  console.log(this.selectedBooking.endDate);
console.log(this.newReturnDate);
  const body = {
    newReturnDate: this.newReturnDate
  };

  this.http.put(
    `http://localhost:5068/api/Booking/extend-booking/${this.selectedBooking.bookingID}`,
    body
  ).subscribe({

  next: () => {

    this.showExtendPopup = false;

    this.loadBookings();

    this.alertMessage = "Booking extended successfully.";
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2500);

  },

  error: () => {

    this.alertMessage = "Failed to extend booking.";
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2500);

  }

});
  
}



  loadDrivers() {
  this.http.get<any[]>(
    'http://localhost:5068/api/Booking/drivers'
  ).subscribe(res => {

    console.log("Drivers Response:", res);

    this.drivers = res;

  });
}
  assignDriver() {

    this.http.put(

      `http://localhost:5068/api/Booking/assign-driver/${this.selectedBooking.bookingID}?driverId=${this.selectedDriver}`,

      {}

    )

      .subscribe(() => {


  this.alertMessage = "Booking extended successfully.";
this.showAlert = true;

setTimeout(() => {
  this.showAlert = false;
}, 2500);


});
  }
 openDamagePopup() {

  this.showDamagePopup = true;

  setTimeout(() => {
    alert("showDamagePopup = " + this.showDamagePopup);
  }, 100);
}
  openLateChargePopup() {

    this.actualReturnDate = '';
    this.lateDays = 0;
    this.totalLateCharge = 0;

    this.showLateChargePopup = true;

  }


}


