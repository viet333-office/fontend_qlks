import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrl: './booking-add.component.css',
  providers: [DatePipe]
})
export class BookingAddComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  booking: Booking = {
    start: null,
    end: null,
    id_customer: '',
    id_room: '',
  };
  resetBooking() {
    this.booking = {
      start: null,
      end: null,
      id_customer: '',
      id_room: '',
    };
  }
  constructor(private bookingService: BookingServiceService, private datePipe: DatePipe) { }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetBooking();
  }

  saveBooking(booking: Booking) {
    console.log("log booking", booking);
    const formattedStartDate = this.datePipe.transform(this.booking.start, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(this.booking.end, 'yyyy-MM-dd');
    console.log(formattedStartDate ,"formattedStartDate");
    console.log(this.booking.start ,"this.booking.start");
    
    // this.booking.start = formattedStartDate
    // this.booking.end = formattedEndDate
    this.bookingService.createBooking(booking).subscribe(() => {
      this.hideDialog();
    })
  }
  
}
