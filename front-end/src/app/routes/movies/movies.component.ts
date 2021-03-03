import { GlobalDataService, SweetAlertObject } from 'src/app/services/global-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

export interface Genre {
  _id: string;
  name: string;
}

export interface Movie {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movieForm = new FormGroup({});
  genreList: Genre[] = [];
  movieList: Movie[] = [];
  selectedMovieIndex:number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.getGenre();
    this.getMovies();
    this.movieForm = this.formBuilder.group({
      _id: null,
      title: [null, [Validators.required]],
      genreId: [null, [Validators.required]],
      numberInStock: [null, [Validators.required, Validators.min(1)]],
      dailyRentalRate: [null, [Validators.required, Validators.min(1)]]
    });
  }

  getGenre() {
    this.apiService.getGenre().subscribe(
      (data: Genre[]) => {
        console.log('data: ' + JSON.stringify(data));
        data.forEach((genre:any, index) => {
          this.genreList.push({
            _id: genre._id,
            name: genre.name
          });
        });
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed to fetch Genre list',
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
          const genre: Genre = {
            _id: movie.genre._id,
            name: movie.genre.name
          }
          this.movieList.push({
            _id: movie._id,
            title: movie.title,
            genre: genre,
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
  
  addMovie() {
    const object = {
      title: this.movieForm.get('title')!.value,
      genreId: this.movieForm.get('genreId')!.value,
      numberInStock: this.movieForm.get('numberInStock')!.value,
      dailyRentalRate: this.movieForm.get('dailyRentalRate')!.value,
    };
    this.apiService.createMovie(object).subscribe(
      (data: Movie) => {
        console.log('data: ' + JSON.stringify(data));
        const genre: Genre = {
          _id: data.genre._id,
          name: data.genre.name
        }
        this.movieList.push({
          _id: data._id,
          title: data.title,
          genre: genre,
          numberInStock: data.numberInStock,
          dailyRentalRate: data.dailyRentalRate
        });
        this.movieForm.reset();
        const swalObject: SweetAlertObject = {
          title: 'Movie Added Successfully',
          text: `Movie '${data.title}' has been successfully added to movie list`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Add Movie',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  selectMovie(index: number) {
    this.movieForm.get('_id')?.patchValue(this.movieList[index]._id);
    this.movieForm.get('title')?.patchValue(this.movieList[index].title);
    this.movieForm.get('genreId')?.patchValue(this.movieList[index].genre._id);
    this.movieForm.get('numberInStock')?.patchValue(this.movieList[index].numberInStock);
    this.movieForm.get('dailyRentalRate')?.patchValue(this.movieList[index].dailyRentalRate);
    this.selectedMovieIndex = index;
  }

  updateMovie() {
    const object = {
      title: this.movieForm.get('title')!.value,
      genreId: this.movieForm.get('genreId')!.value,
      numberInStock: this.movieForm.get('numberInStock')!.value,
      dailyRentalRate: this.movieForm.get('dailyRentalRate')!.value
    };
    this.apiService.updateMovie(this.movieForm.get('_id')!.value, object).subscribe(
      (data: Movie) => {
        this.movieList[this.selectedMovieIndex]._id = data._id;
        this.movieList[this.selectedMovieIndex].title = data.title;
        this.movieList[this.selectedMovieIndex].genre._id = data.genre._id;
        this.movieList[this.selectedMovieIndex].genre.name = data.genre.name;
        this.movieList[this.selectedMovieIndex].numberInStock = data.numberInStock;
        this.movieList[this.selectedMovieIndex].dailyRentalRate = data.dailyRentalRate;
        const swalObject: SweetAlertObject = {
          title: 'Movie Update Successfully',
          text: `Movie '${data.title}' has been successfully updated`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Update Movie',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  cancelUpdate() {
    this.movieForm.reset();
    this.selectedMovieIndex = -1;
  }

  deleteMovie(index: number) {
    this.apiService.deleteMovie(this.movieList[index]._id).subscribe(
      (data) => {
        console.log('data: ' + JSON.stringify(data));
        this.movieList.splice(index, 1);
        const swalObject: SweetAlertObject = {
          title: 'Movie Deleted Successfully',
          text: `Movie '${data.title}' has been successfully deleted`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Delete Movie',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

}
