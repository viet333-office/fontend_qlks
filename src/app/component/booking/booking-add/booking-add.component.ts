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
  @Input() isLoading: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();
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
   
  
    this.loadingChange.emit(true);
    this.bookingService.createBooking(booking).subscribe(
      () => {
        this.loadingChange.emit(false);
        this.hideDialog();
      }, (error) => {
        this.loadingChange.emit(false);
        console.error('Error occurred:', error);
      }
    )
  }

}
