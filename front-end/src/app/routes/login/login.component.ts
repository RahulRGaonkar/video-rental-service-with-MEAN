import { GlobalDataService } from './../../services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({});
  email = null;
  password = null;
  logArray:any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [ Validators.required, Validators.minLength(8) ]]
    });
  }

  loginUser() {
    const object = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    };
    console.log('object: ' + JSON.stringify(object));
    this.apiService.loginUser(object).subscribe(
      (data) => {
        console.log('Data: ' + JSON.stringify(data));
        this.logArray.push(data);
        this.globalDataService.setUserDetails(data);
    this.router.navigate(['/home']);
      }, (error: HttpErrorResponse) => {
        console.log(JSON.stringify(error))
        this.logArray.push(error.error);
      }
    );
  }
}
