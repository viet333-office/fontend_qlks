import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service'

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrl: './booking-update.component.css'
})
export class BookingUpdateComponent {
  @Input() visible: boolean = false;
  @Input() booking: Booking = {
   start:new Date,
   end:new Date,
   customer:{
    id: 0,
    name: '',       
    cccd: '',         
    address: '',     
    phone: ''  
   },
   room:{
      id: 0,
      name: '',
      room: '',
      value: 0,
      status: '',
      stay: ''
   }
  };
  @Output() visibleChange = new EventEmitter<boolean>();


  constructor(private bookingService: BookingServiceService) { }
  updateCustomer(booking: Booking) {
    this.bookingService.putBooking(booking).subscribe(() => {
      this.visibleChange.emit(false);
      })
  }
}
