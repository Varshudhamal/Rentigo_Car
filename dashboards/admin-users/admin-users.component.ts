import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];

  selectedUser = {
    userID: 0,
    name: '',
    email: '',
    phone:'',
    city:'',
    status: ''
  };
sakshiUser = {
  userID: 1,
  name: 'Sakshi Mule',
  email: 'sakshi@gmail.com',
  phone:'9561486371',
  city:'Baramati',
  status: 'Active'
};

rahulUser = {
  userID: 2,
  name: 'Rahul Sharma',
  email: 'rahul@gmail.com',
  status: 'Premium'
};

priyaUser = {
  userID: 3,
  name: 'Priya Verma',
  email: 'priya@gmail.com',
  status: 'Active'
};

aryanUser = {
  userID: 4,
  name: 'Aryan Patil',
  email: 'aryan@gmail.com',
  status: 'Blocked'
};

nehaUser = {
  userID: 5,
  name: 'Neha Kapoor',
  email: 'neha@gmail.com',
  status: 'Premium'
};

karanUser = {
  userID: 6,
  name: 'Karan Mehta',
  email: 'karan@gmail.com',
  status: 'Active'
};

ngOnInit(): void {
  this.loadUsers();
}
editingUser: any = null;


  constructor(
  private http: HttpClient,
  private modalService: NgbModal
) {}

  loadUsers(): void {
    this.http.get<any[]>(
      'http://localhost:5068/api/User'
    ).subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users Loaded:', data);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  openEditUserModal(content: any, user: any) {

  this.selectedUser = {
    userID: user.userID,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    status: user.status
  };

  this.modalService.open(content, {
    centered: true
  });
}
  

 saveUserChanges(): void {

  this.http.put(
  `http://localhost:5068/api/User/${this.selectedUser.userID}`,
    {
      userID: this.selectedUser.userID,
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      status: this.selectedUser.status
    }
  ).subscribe({

    next: () => {

      alert('User Updated Successfully');

      this.loadUsers();

      console.log('Updated:', this.selectedUser);

    },

    error: (err) => {

      console.error(err);

      alert('Failed to Update User');

    }

  });

}


deleteUser(id: number) {

  const confirmDelete = confirm(
    'Are you sure you want to delete this user?'
  );

  if(confirmDelete){

    alert('User Deleted Successfully');

  }

}
}
