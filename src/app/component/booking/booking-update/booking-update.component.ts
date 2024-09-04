import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service'
import { MessageService } from 'primeng/api';import { FormBuilder, Validators } from '@angular/forms';
  providers: [MessageService]

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
    phone_booking:'',
    id_room: ''
  };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();

  constructor(private fbb: FormBuilder,private bookingService: BookingServiceService ,private messageService: MessageService) { }
  bookingForm = this.fbb.group({
    start: [null, Validators.required],
    end: [null, Validators.required],
    id_customer: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    phone_booking:['', [Validators.required, Validators.pattern(/^(03|09|02)\d{8}$/)]],
    id_room: ['', [Validators.required,  Validators.pattern(/^\d+$/), Validators.minLength(3), Validators.maxLength(20)]]
  
  });
  
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
    },error => {
      this.loadingChange.emit(false);
  this.messageService.add({severity:'error', summary:'Error', detail:'Có lỗi xảy ra, vui lòng thử lại.'});
    }
  )
  }
}
