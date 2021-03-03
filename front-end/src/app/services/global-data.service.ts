import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import swal from 'sweetalert2';

export interface User {
  id: string | number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface SweetAlertObject {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question" | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  userDetails: User = {
    id: '',
    name: '',
    email: '',
    isAdmin: false,
    token: ''
  };
  
  constructor(
    private persistenceService: PersistenceService,
    private router: Router,
    ) {}

  setUserDetails(userobject: User) {
    this.userDetails = {
      id: userobject.id,
      name: userobject.name,
      email: userobject.email,
      isAdmin: userobject.isAdmin,
      token: userobject.token
    }
    this.saveUserDetailsToLocalStorage(this.userDetails);
  }

  saveUserDetailsToLocalStorage(userobject: User) {
    console.log('userobject :'+ JSON.stringify(userobject))
    this.persistenceService.remove('userDetails', StorageType.LOCAL);
    this.persistenceService.set('userDetails', JSON.stringify(userobject), {type: StorageType.LOCAL, expireAfter: 1728000000});
  }

  fetchUserDetailsFromLocalStorage(): User {
    let userDetails = this.persistenceService.get('userDetails', StorageType.LOCAL);
    console.log('userDetails: ' + JSON.stringify(userDetails));
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      return userDetails;
    } else {
      return {
        id: '',
        name: '',
        email: '',
        isAdmin: false,
        token: ''
      };
    }
  }

  fetchAndSetUserDetailsFromLocalStorage() {
    this.userDetails = this.fetchUserDetailsFromLocalStorage();
    console.log('userDetails: ' + JSON.stringify(this.userDetails));
  }

  logOutUser() {
    console.log('logOutUser() called');
    this.userDetails = {
      id: '',
      name: '',
      email: '',
      isAdmin: false,
      token: ''
    }
    this.persistenceService.remove('userDetails', StorageType.LOCAL);
    this.router.navigate(['/login']);
  }

  triggerSweetAlert(swalobject: SweetAlertObject) {
    swal.fire({
      title: swalobject.title,
      text: swalobject.text,
      icon: swalobject.icon,
      showConfirmButton: true
    });
  }
}