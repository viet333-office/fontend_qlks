import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { RoomComponent } from './component/room/room.component';
import { BookingComponent } from './component/booking/booking.component';
const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CustomerComponent},
  { path: 'room', component: RoomComponent},
  { path: 'booking', component: BookingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
