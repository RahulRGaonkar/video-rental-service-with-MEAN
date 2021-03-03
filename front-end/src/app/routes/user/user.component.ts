import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'isAdmin'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe(
      (data) => {
        console.log('data: ' + JSON.stringify(data));
        data.forEach((user:any) => {
          this.userList.push({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          });
        });
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
      }
    );
  }
}
