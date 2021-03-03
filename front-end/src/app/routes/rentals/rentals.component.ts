import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService, SweetAlertObject } from 'src/app/services/global-data.service';

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  isGold: boolean;
}

export interface Movie {
  _id: string;
  title: string;
  numberInStock?: number;
  dailyRentalRate: number;
}

export interface Rental {
  _id: string;
  customer: Customer;
  movie: Movie;
  dateOut: Date;
  dateReturned: Date;
  rentalFee: Number;
}

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent implements OnInit {

  rentalForm = new FormGroup({});
  customerList: Customer[] =[];
  movieList: Movie[] =[];
  rentalList: Rental[] = [];
  selectedRentalIndex:number = -1;
  dateNow = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getRental();
    this.rentalForm = this.formBuilder.group({
      _id: null,
      customerId: [null, Validators.required],
      movieId: [null, [Validators.required]],
      dateOut: [this.dateNow],
      dateReturned: [null],
      rentalFee: [null]
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
        this.getMovies();
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

  getMovies() {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        console.log('data: ' + JSON.stringify(data));
        data.forEach((movie: Movie) => {
          this.movieList.push({
            _id: movie._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
          });
        });
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed to fetch Movie list',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  getRental() {
    this.apiService.getRentals().subscribe(
      (data: Rental[]) => {
        data.forEach((rental:any) => {
          this.rentalList.push({
            _id: rental._id,
            customer: {
              _id: rental.customer._id,
              name: rental.customer.name,
              phone: rental.customer.phone,
              isGold: rental.customer.isGold
            },
            movie: {
              _id: rental.movie._id,
              title: rental.movie.title,
              dailyRentalRate: rental.movie.dailyRentalRate
            },
            dateOut: rental.dateOut,
            dateReturned: rental.dateReturned,
            rentalFee: rental.rentalFee
          });
        });
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed to fetch Rental list',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  addRental() {
    const object = {
      customerId: this.rentalForm.get('customerId')!.value,
      movieId: this.rentalForm.get('movieId')!.value,
      dateReturned: this.rentalForm.get('dateReturned')!.value,
      rentalFee: this.rentalForm.get('rentalFee')!.value
    };
    this.apiService.createRental(object).subscribe(
      (data: Rental) => {
        this.rentalList.push({
          _id: data._id,
          customer: {
            _id: data.customer._id,
            name: data.customer.name,
            phone: data.customer.phone,
            isGold: data.customer.isGold
          },
          movie: {
            _id: data.movie._id,
            title: data.movie.title,
            dailyRentalRate: data.movie.dailyRentalRate
          },
          dateOut: data.dateOut,
          dateReturned: data.dateReturned,
          rentalFee: data.rentalFee
        });
        this.rentalForm.reset();
        const swalObject: SweetAlertObject = {
          title: 'Rental Added Successfully',
          text: `Rental has been successfully added to rental list`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Add Rental',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  selectRental(index: number) {
    this.rentalForm.get('_id')?.patchValue(this.rentalList[index]._id);
    this.rentalForm.get('customerId')?.patchValue(this.rentalList[index].customer._id);
    this.rentalForm.get('movieId')?.patchValue(this.rentalList[index].movie._id);
    this.rentalForm.get('dateOut')?.patchValue(this.rentalList[index].dateOut);
    this.rentalForm.get('dateReturned')?.patchValue(this.rentalList[index].dateReturned);
    this.rentalForm.get('rentalFee')?.patchValue(this.rentalList[index].rentalFee);
    this.selectedRentalIndex = index;
  }

  updateRental() {
    const object = {
      customerId: this.rentalForm.get('customerId')!.value,
      movieId: this.rentalForm.get('movieId')!.value,
      dateReturned: this.rentalForm.get('dateReturned')!.value,
      rentalFee: this.rentalForm.get('rentalFee')!.value
    };
    this.apiService.updateRental(this.rentalForm.get('_id')!.value, object).subscribe(
      (data: Rental) => {
        this.rentalList[this.selectedRentalIndex]._id = data._id;
        this.rentalList[this.selectedRentalIndex].customer._id = data.customer._id;
        this.rentalList[this.selectedRentalIndex].customer.name = data.customer.name;
        this.rentalList[this.selectedRentalIndex].customer.phone = data.customer.phone;
        this.rentalList[this.selectedRentalIndex].customer.isGold = data.customer.isGold;
        this.rentalList[this.selectedRentalIndex].movie._id = data.movie._id;
        this.rentalList[this.selectedRentalIndex].movie.title = data.movie.title;
        this.rentalList[this.selectedRentalIndex].movie.dailyRentalRate = data.movie.dailyRentalRate;
        this.rentalList[this.selectedRentalIndex].dateOut = data.dateOut;
        this.rentalList[this.selectedRentalIndex].dateReturned = data.dateReturned;
        this.rentalList[this.selectedRentalIndex].rentalFee = data.rentalFee;
        const swalObject: SweetAlertObject = {
          title: 'Rental Update Successfully',
          text: `Rental has been successfully updated`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Update Rental',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  cancelUpdate() {
    this.rentalForm.reset();
    this.selectedRentalIndex = -1;
  }

  deleteRental(index: number) {
    this.apiService.deleteCustomer(this.rentalList[index]._id).subscribe(
      (data) => {
        console.log('data: ' + JSON.stringify(data));
        this.rentalList.splice(index, 1);
        const swalObject: SweetAlertObject = {
          title: 'Rental Deleted Successfully',
          text: `Rental has been successfully deleted`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Delete Rental',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  getRentalRate() {
    const movie = this.movieList.find(movie => movie._id === this.rentalForm.get('movieId')?.value);
    return movie?.dailyRentalRate;
  }
}
