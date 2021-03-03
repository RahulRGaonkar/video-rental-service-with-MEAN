import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService, SweetAlertObject } from 'src/app/services/global-data.service';

export interface Customer {
  _id: string;
  name: string;
  isGold: boolean;
  phone: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerForm = new FormGroup({});
  customerList: Customer[] = [];
  selectedCustomerIndex:number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.customerForm = this.formBuilder.group({
      _id: null,
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      isGold: [false, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe(
      (data) => {
        data.forEach((customer:any) => {
          this.customerList.push({
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
          });
        });
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed to fetch Customer list',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }
  
  addCustomer() {
    const object = {
      name: this.customerForm.get('name')!.value,
      isGold: this.customerForm.get('isGold')!.value,
      phone: this.customerForm.get('phone')!.value
    };
    this.apiService.addCustomer(object).subscribe(
      (data: Customer) => {
        this.customerList.push({
          _id: data._id,
          name: data.name,
          isGold: data.isGold,
          phone: data.phone
        });
        this.customerForm.reset();
        const swalObject: SweetAlertObject = {
          title: 'Customer Added Successfully',
          text: `Customer '${data.name}' has been successfully added to customer list`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Add Customer',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  selectCustomer(index: number) {
    console.log('selectMovie() >> index: ' + index);
    this.customerForm.get('_id')?.patchValue(this.customerList[index]._id);
    this.customerForm.get('name')?.patchValue(this.customerList[index].name);
    this.customerForm.get('isGold')?.patchValue(this.customerList[index].isGold);
    this.customerForm.get('phone')?.patchValue(this.customerList[index].phone);
    this.selectedCustomerIndex = index;
  }

  updateCustomer() {
    const object = {
      name: this.customerForm.get('name')!.value,
      isGold: this.customerForm.get('isGold')!.value,
      phone: this.customerForm.get('phone')!.value
    };
    this.apiService.updateCustomer(this.customerForm.get('_id')!.value, object).subscribe(
      (data: Customer) => {
        this.customerList[this.selectedCustomerIndex]._id = data._id;
        this.customerList[this.selectedCustomerIndex].name = data.name;
        this.customerList[this.selectedCustomerIndex].isGold = data.isGold;
        this.customerList[this.selectedCustomerIndex].phone = data.phone;
        const swalObject: SweetAlertObject = {
          title: 'Customer Update Successfully',
          text: `Customer '${data.name}' has been successfully updated`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Update Customer',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  cancelUpdate() {
    this.customerForm.reset();
    this.selectedCustomerIndex = -1;
  }

  deleteCustomer(index: number) {
    this.apiService.deleteCustomer(this.customerList[index]._id).subscribe(
      (data) => {
        console.log('data: ' + JSON.stringify(data));
        this.customerList.splice(index, 1);
        const swalObject: SweetAlertObject = {
          title: 'Customer Deleted Successfully',
          text: `Customer '${data.name}' has been successfully deleted`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Delete Customer',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }
}
