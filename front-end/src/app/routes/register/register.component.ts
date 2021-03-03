import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({});
  name = null;
  email = null;
  password = null;
  logArray:any[] = [];

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null,  Validators.required ], 
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [ Validators.required, Validators.minLength(8) ]]
    });
  }

  registerUser() {
    const object = {
      name: this.registerForm.get('name'),
      email: this.registerForm.get('email'),
      password: this.registerForm.get('password')
    };
    this.apiService.registerUsers(object).subscribe(
      (data) => {
        console.log('Data: ' + JSON.stringify(data));
        this.logArray.push(data);
      }, (error: HttpErrorResponse) => {
        console.log(JSON.stringify(error))
        this.logArray.push(error.error);
      }
    );
  }
}
