import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from './services/global-data.service';

export interface Menu {
  name: string;
  link?: string;
  isAdmin?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';
  publicMenu: Menu[] = [
    {name: 'Home', link: '/home'}
  ];
  
  userMenu: Menu[] = [
    {name: 'Home', link: '/home', isAdmin: false},
    {name: 'Users', link: '/users', isAdmin: true},
    {name: 'Genre', link: '/genre', isAdmin: false},
    {name: 'Movies', link: '/movies', isAdmin: false},
    {name: 'Customers', link: '/customers', isAdmin: true},
    {name: 'Rentals', link: '/rentals', isAdmin: false},
    {name: 'Log Out', isAdmin: false},
  ];

  constructor(public globalDataService: GlobalDataService) {}

  ngOnInit() {
    this.globalDataService.fetchAndSetUserDetailsFromLocalStorage();
  }

  isUserLoggedIn(): boolean {
    if (this.globalDataService.userDetails.name != null && this.globalDataService.userDetails.name != '') return true;
    return false; 
  }
}
