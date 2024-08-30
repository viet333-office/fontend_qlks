import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service'
import { MessageService } from 'primeng/api';  providers: [MessageService]

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrl: './booking-update.component.css',
  providers: [MessageService]
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

  constructor(private bookingService: BookingServiceService ,private messageService: MessageService) { }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  updateBooking(booking: Booking) {
    this.loadingChange.emit(true);
    this.bookingService.putBooking(booking).subscribe((data) => {
      if(!data.content){
        this.messageService.add({severity:'error', summary:'error', detail:data.message});
        this.loadingChange.emit(false);
      }else{
        this.loadingChange.emit(false);
        this.visibleChange.emit(false);
        this.messageService.add({severity:'success', summary:'Success', detail:'Sửa lịch đặt phòng thành công'});
      }
    })
  }
}
