import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {

  feedbacks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<any[]>(
      'http://localhost:5068/api/Feedback'
    )
    .subscribe(res => {

      this.feedbacks = res;

    });

  }

}