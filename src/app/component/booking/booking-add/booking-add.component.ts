import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrl: './booking-add.component.css',
  providers: [DatePipe,MessageService]  
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
  constructor(private bookingService: BookingServiceService, private datePipe: DatePipe,private messageService: MessageService) { }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetBooking();
  }


  saveBooking(booking: Booking) {
    this.loadingChange.emit(true);
    this.bookingService.createBooking(booking).subscribe(
      (data) => {
        if (!data.content) {
          this.messageService.add({severity:'error', summary:'error', detail:data.message});
          this.loadingChange.emit(false);
        } else {
          this.loadingChange.emit(false);
          this.hideDialog();
          this.messageService.add({severity:'success', summary:'Success', detail:'Thêm lịch đặt phòng thành công'});
        }
      },error => {
        this.loadingChange.emit(false);
    this.messageService.add({severity:'error', summary:'Error', detail:'Có lỗi xảy ra, vui lòng thử lại.'});
      }
    )
  }

}
