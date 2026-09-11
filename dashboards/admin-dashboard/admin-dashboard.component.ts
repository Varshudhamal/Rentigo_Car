import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { NotificationService } from 'src/app/services/notification.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { interval } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})


export class AdminDashboardComponent implements OnInit {
  recentBookings: any[] = [];
  chart: any;
  bookingChart: any;
  topCarsChart: any;
  trendChart: any;
  activities: any[] = [];
  notifications: string[] = [];
  unreadCount = 0;
  showNotifications = false;
  toasts: string[] = [];
  topCustomersChart: any;
  mostProfitableCarsChart: any;
  currentRevenue = 0;
  lastRevenue = 0;
  revenueGrowth = 0;
  recentPayments: any[] = [];
  fleetUtilization = 0;
  lowAvailabilityCars: any[] = [];


  totalBookings = 0;
  pendingBookings = 0;
  confirmedBookings = 0;
  cancelledBookings = 0;
  totalCars = 0;

  totalRevenue = 0;
  totalUsers = 0;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {



    this.notificationService.startConnection();

    this.notificationService.addNotificationListener(
      (message: string) => {

        console.log('Notification:', message);

        this.notifications.unshift(message);

        this.unreadCount++;

        this.toasts.push(message);

        setTimeout(() => {
          this.toasts.shift();
        }, 5000);

      }
    );

    this.loadRevenueChart();
    this.loadTopCarsChart();
    this.loadRevenueTrendChart();
    this.loadTopCustomersChart();
    this.loadMostProfitableCarsChart();
    this.loadRevenueGrowth();
    this.loadRecentPayments();
    this.loadLowAvailabilityCars();
    interval(30000).subscribe(() => {

      this.loadDashboardData();

    });


    this.http.get<number>('http://localhost:5068/api/Booking/total-bookings')
      .subscribe(res => {
        this.totalBookings = res;
      });

    this.http.get<number>('http://localhost:5068/api/Booking/pending-bookings')
      .subscribe(res => {
        this.pendingBookings = res;
      });

    this.http.get<number>('http://localhost:5068/api/Booking/confirmed-bookings')
      .subscribe(res => {
        this.confirmedBookings = res;
      });

    this.http.get<number>('http://localhost:5068/api/Booking/cancelled-bookings')
      .subscribe(res => {
        this.cancelledBookings = res;
        this.loadBookingStatusChart();

      });

    this.http.get<number>('http://localhost:5068/api/Car/total-cars')
      .subscribe(res => {
        this.totalCars = res;
      });

    this.http.get<number>('http://localhost:5068/api/Booking/total-revenue')
      .subscribe(res => {
        this.totalRevenue = res;
      });

    this.http.get<number>('http://localhost:5068/api/User/total-users')
      .subscribe(res => {
        this.totalUsers = res;
      });


    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/recent-bookings'
    )
      .subscribe(res => {
        this.recentBookings = res;



      }
      );
    this.http.get<any[]>(
      'http://localhost:5068/api/Activity'
    )
      .subscribe(res => {
        this.activities = res;
      });


    this.http.get<any[]>(
      'http://localhost:5068/api/Notification'
    )
      .subscribe(res => {

        this.notifications =
          res.map(x => x.message);

        this.unreadCount =
          this.notifications.length;

      });


  }
  toggleNotifications() {

    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      this.unreadCount = 0;
    }
  }

  clearNotifications() {

    this.http.delete(
      'http://localhost:5068/api/Notification/clear'
    )
      .subscribe(() => {

        this.notifications = [];
        this.unreadCount = 0;

      });

  }
  loadRevenueChart(): void {

    console.log('Chart Method Called');

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/revenue-chart'
    )
      .subscribe(data => {

        console.log('Revenue Data', data);

        const labels = data.map(x => 'Month ' + x.month);
        const revenue = data.map(x => x.revenue);

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart('revenueChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenue',
              data: revenue,
              backgroundColor: [
                '#3B82F6',
                '#6366F1',
                '#8B5CF6',
                '#EC4899',
                '#F59E0B',
                '#10B981'
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
  loadBookingStatusChart(): void {

    if (this.bookingChart) {
      this.bookingChart.destroy();
    }

    this.bookingChart = new Chart('bookingStatusChart', {
      type: 'pie',
      data: {
        labels: [
          'Pending',
          'Confirmed',
          'Cancelled'
        ],
        datasets: [{
          data: [
            this.pendingBookings,
            this.confirmedBookings,
            this.cancelledBookings
          ],
          backgroundColor: [
            '#F59E0B', // Pending - Orange
            '#10B981', // Confirmed - Green
            '#EF4444'  // Cancelled - Red
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

  }
  loadTopCarsChart(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/top-rented-cars'
    )
      .subscribe(data => {

        const labels = data.map(x => x.vehicleNumber);
        const bookings = data.map(x => x.totalBookings);

        if (this.topCarsChart) {
          this.topCarsChart.destroy();
        }

        this.topCarsChart = new Chart('topCarsChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Bookings',
              data: bookings,
              backgroundColor: [
                '#3B82F6',
                '#6366F1',
                '#8B5CF6',
                '#EC4899',
                '#F59E0B'
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

  loadRevenueTrendChart(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/monthly-revenue-trend'
    )
      .subscribe(data => {

        const labels = data.map(x => 'Month ' + x.month);
        const revenue = data.map(x => x.revenue);

        this.trendChart = new Chart('trendChart', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenue Trend',
              data: revenue,
              borderColor: '#3B82F6',
              backgroundColor: '#3B82F6',
              fill: false,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });

      });

  }
  loadTopCustomersChart(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/top-customers'
    )
      .subscribe(data => {

        const labels = data.map(x => x.customerName);
        const bookings = data.map(x => x.totalBookings);

        if (this.topCustomersChart) {
          this.topCustomersChart.destroy();
        }

        this.topCustomersChart = new Chart('topCustomersChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Bookings',
              data: bookings,
              backgroundColor: [
                '#06B6D4',
                '#3B82F6',
                '#6366F1',
                '#8B5CF6',
                '#EC4899'
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
  loadMostProfitableCarsChart(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/most-profitable-cars'
    )
      .subscribe(data => {

        const labels = data.map(x => x.vehicleNumber);
        const revenue = data.map(x => x.revenue);

        if (this.mostProfitableCarsChart) {
          this.mostProfitableCarsChart.destroy();
        }

        this.mostProfitableCarsChart = new Chart(
          'mostProfitableCarsChart',
          {
            type: 'doughnut',

            data: {
              labels: labels,

              datasets: [{
                label: 'Revenue',

                data: revenue,

                backgroundColor: [
                  '#10B981',
                  '#3B82F6',
                  '#8B5CF6',
                  '#F59E0B',
                  '#EC4899'
                ]
              }]
            },

            options: {
              responsive: true,
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          }
        );

      });

  }
  loadRevenueGrowth(): void {

    this.http.get<any>(
      'http://localhost:5068/api/Booking/revenue-growth'
    )
      .subscribe(data => {

        this.currentRevenue = data.currentRevenue;
        this.lastRevenue = data.lastRevenue;
        this.revenueGrowth = data.growth;

      });

  }
  loadRecentPayments(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Payment/recent-payments'
    )
      .subscribe(res => {

        this.recentPayments = res;

      });

  }
  exportBookings(): void {

    const worksheet = XLSX.utils.json_to_sheet(
      this.recentBookings
    );

    const workbook = {
      Sheets: {
        data: worksheet
      },
      SheetNames: ['data']
    };

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    FileSaver.saveAs(
      data,
      'Bookings.xlsx'
    );

  }
  loadTodayBookings(): void {

    this.http.get<number>(
      'http://localhost:5068/api/Booking/today-bookings'
    )
      .subscribe(res => {

        this.totalBookings = res;

      });

  }
  loadFleetUtilization(): void {

    this.http.get<number>(
      'http://localhost:5068/api/Booking/fleet-utilization'
    )
      .subscribe(res => {

        this.fleetUtilization = res;

      });

  }



  loadDashboardData(): void {

    this.loadRevenueChart();

    this.loadTopCarsChart();

    this.loadRevenueTrendChart();

    this.loadTopCustomersChart();

    this.loadMostProfitableCarsChart();

    this.loadRevenueGrowth();

    this.loadRecentPayments();
    this.loadLowAvailabilityCars();

    this.loadFleetUtilization();

  }
  loadLowAvailabilityCars(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Booking/low-availability-cars'
    )
      .subscribe(res => {

        this.lowAvailabilityCars = res;

      });

  }
  exportDashboardPDF(): void {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Rentigo Dashboard Report', 14, 20);

    doc.setFontSize(12);

    doc.text(
      `Total Bookings: ${this.totalBookings}`,
      14,
      40
    );

    doc.text(
      `Total Cars: ${this.totalCars}`,
      14,
      50
    );

    doc.text(
      `Total Users: ${this.totalUsers}`,
      14,
      60
    );

    doc.text(
      `Revenue: ₹${this.totalRevenue}`,
      14,
      70
    );

    autoTable(doc, {
      startY: 90,

      head: [[
        'Customer',
        'Vehicle',
        'Status'
      ]],

      body: this.recentBookings.map(x => [
        x.customerName,
        x.vehicleNumber,
        x.bookingStatus
      ])
    });

    doc.save('Rentigo_Report.pdf');

  }
  loadActivity(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Activity'
    )
      .subscribe(res => {

        this.activities = res;

      });

  }
}
