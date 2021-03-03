import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
/* import { MatTable } from '@angular/material/table'; */
import { ApiService } from 'src/app/services/api.service';
import { GlobalDataService, SweetAlertObject } from 'src/app/services/global-data.service';

export interface Genre {
  _id: string;
  name: string;
  index?: number;
}

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  genreForm = new FormGroup({});
  genreList: Genre[] = [];
  selectedGenreIndex:number = -1;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.getGenre();
    this.genreForm = this.formBuilder.group({
      _id: null,
      name: [null, [Validators.required]]
    });
  }

  getGenre() {
    this.apiService.getGenre().subscribe(
      (data: Genre[]) => {
        console.log('data: ' + JSON.stringify(data));
        data.forEach((genre:Genre, index) => {
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
  
  createGenre() {
    const object = {
      name: this.genreForm.get('name')!.value
    };
    this.apiService.createGenre(object).subscribe(
      (data: Genre) => {
        console.log('data: ' + JSON.stringify(data));
        this.genreList.push({
          _id: data._id,
          name: data.name
        });
        this.genreForm.reset();
        const swalObject: SweetAlertObject = {
          title: 'Genre Added Successfully',
          text: `Genre '${data.name}' has been successfully added to genre list`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Add Genre',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  selectGenre(index: number) {
    console.log('selectGenre() >> index: ' + index);
    this.genreForm.get('_id')?.patchValue(this.genreList[index]._id);
    this.genreForm.get('name')?.patchValue(this.genreList[index].name);
    this.selectedGenreIndex = index;
  }

  updateGenre() {
    const object = {
      name: this.genreForm.get('name')!.value
    };
    this.apiService.updateGenre(this.genreForm.get('_id')!.value, object).subscribe(
      (data: Genre) => {
        this.genreList[this.selectedGenreIndex!].name = data.name;
        const swalObject: SweetAlertObject = {
          title: 'Genre Update Successfully',
          text: `Genre '${data.name}' has been successfully updated`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Update Genre',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }

  cancelUpdate() {
    this.genreForm.reset();
    this.selectedGenreIndex = -1;
  }

  deleteGenre(index: number) {
    this.apiService.deleteGenre(this.genreList[index]._id).subscribe(
      (data) => {
        console.log('data: ' + JSON.stringify(data));
        this.genreList.splice(index, 1);
        const swalObject: SweetAlertObject = {
          title: 'Genre Deleted Successfully',
          text: `Genre '${data.title}' has been successfully deleted`,
          icon: 'success'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }, (error: HttpErrorResponse) => {
        console.log('error: ' + error.message);
        const swalObject: SweetAlertObject = {
          title: 'Failed To Delete Genre',
          text: error.message,
          icon: 'error'
        };
        this.globalDataService.triggerSweetAlert(swalObject);
      }
    );
  }
}
