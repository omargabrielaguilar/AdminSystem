import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterRatingComponent } from './components/ratings/registerRating/registerRating.component';
import { RegisterHotelComponent } from './components/hotels/registerHotel/registerHotel.component';
import { UpdateHotelComponent } from './components/hotels/updateHotel/updateHotel.component';
import { UpdateUserComponent } from './components/users/updateUser/updateUser.component';
import { RegisterUserComponent } from './components/users/registerUser/registerUser.component';
import { UpdateRatingComponent } from './components/ratings/updateRating/updateRating.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/register', component: RegisterUserComponent },
  { path: 'users/:id', component: UpdateUserComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: 'ratings/register', component: RegisterRatingComponent },
  { path: 'ratings/:id', component: UpdateRatingComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/register', component: RegisterHotelComponent },
  { path: 'hotels/:id', component: UpdateHotelComponent },
];
