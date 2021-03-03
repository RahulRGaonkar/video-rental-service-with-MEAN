import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = environment.api.baseUrl + '/api';

  constructor(private http: HttpClient) {}

  /* user APIs */
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/users');
  }
  registerUsers(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/users/register', object);
  }
  loginUser(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/users/login', object);
  }

  /* Genre APIs */
  getGenre(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/genres');
  }
  getGenrebyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/genres/' + id);
  }
  createGenre(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/genres', object);
  }
  updateGenre(id: string, object: any): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl + '/genres/' + id, object);
  }
  deleteGenre(id: string): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + '/genres/' + id);
  }

  /* Movies APIs */
  getMovies(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/movies');
  }
  getMoviebyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/movies/' + id);
  }
  createMovie(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/movies', object);
  }
  updateMovie(id: number, object: any): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl + '/movies/' + id, object);
  }
  deleteMovie(id: string): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + '/movies/' + id);
  }

  /* Customers APIs */
  getCustomers(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/customers');
  }
  getCustomerbyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/customers/' + id);
  }
  addCustomer(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/customers', object);
  }
  updateCustomer(id: number, object: any): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl + '/customers/' + id, object);
  }
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + '/customers/' + id);
  }

  /* Customers APIs */
  getRentals(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/rentals');
  }
  getRentalbyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/rentals/' + id);
  }
  createRental(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/rentals', object);
  }
  updateRental(id: number, object: any): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl + '/rentals/' + id, object);
  }
  deleteRental(id: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + '/rentals/' + id);
  }

  /* Television series APIs */
  getTeleseries(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/teleseries');
  }
  getTeleseriesbyId(id: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/teleseries/' + id);
  }
  createTeleseries(object: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/teleseries', object);
  }
  updateTeleseries(id: number, object: any): Observable<any> {
    return this.http.put<any>(this.apiBaseUrl + '/teleseries/' + id, object);
  }
  deleteTeleseries(id: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + '/teleseries/' + id);
  }

}