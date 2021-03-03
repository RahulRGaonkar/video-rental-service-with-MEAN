import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { UserComponent } from './routes/user/user.component';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { GenreComponent } from './routes/genre/genre.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { CustomersComponent } from './routes/customers/customers.component';
import { RentalsComponent } from './routes/rentals/rentals.component';
import { TelevisionSeriesComponent } from './routes/television-series/television-series.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UserComponent},
  { path: 'genre', component: GenreComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'rentals', component: RentalsComponent},
  { path: 'teleseries', component: TelevisionSeriesComponent},
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
