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
   start:null,
   end:null,
   id_customer:0,
   id_room:0
  };
  @Output() visibleChange = new EventEmitter<boolean>();


  constructor(private bookingService: BookingServiceService) { }
  updateBooking(booking: Booking) {
    console.log(booking,"log");
    
    this.bookingService.putBooking(booking).subscribe(() => {
      console.log("put ok");
      
      this.visibleChange.emit(false);
      })
  }
}
