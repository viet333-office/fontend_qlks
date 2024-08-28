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
  @Input() isLoading: boolean = false;
  @Input() booking: Booking = {
    start: null,
    end: null,
    id_customer: '',
    id_room: ''
  };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();

  constructor(private bookingService: BookingServiceService) { }
  updateBooking(booking: Booking) {
    this.loadingChange.emit(true);
    this.bookingService.putBooking(booking).subscribe(() => {
      this.loadingChange.emit(true);
      this.visibleChange.emit(false);
    }, (error) => {
      this.loadingChange.emit(false);
      console.error('Error occurred:', error);
    }
    )
  }
}
