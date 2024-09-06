import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../Interface/booking';
import { BookingServiceService } from '../../../Service/logic/booking-service.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Customer, CustomerSearch } from '../../../Interface/customer';
import { Room, RoomSearch } from '../../../Interface/room';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service';
import { RoomServiceService } from '../../../Service/logic/room-service.service';


@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrl: './booking-add.component.css',
  providers: [DatePipe, MessageService]
})
export class BookingAddComponent {
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();
  customerList: Customer[] = [];
  roomList: Room[] = [];
  minDate: Date | null = null;
  maxDate: Date | null = null;
  booking: Booking = {
    start: null,
    end: null,
    id_customer: '',
    phone_booking: '',
    id_room: '',
  };

  searchCustomer: CustomerSearch = {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    page: 0,
    size: 4,
    sortType: 'asc'
  }

  searchRoom: RoomSearch = {
    name: '',
    room: '',
    value: 0,
    status: '',
    stay: '',
    page: 0,
    size: 4,
    arrange: 'asc'
  }
  
  resetBooking() {
    this.booking = {
      start: null,
      end: null,
      id_customer: '',
      phone_booking: '',
      id_room: '',
    };
  }

  constructor(
    private fbb: FormBuilder,
    private customerService: CustomerServiceService,
    private roomService: RoomServiceService,
    private bookingService: BookingServiceService,
    private messageService: MessageService
  ) { }

  bookingForm = this.fbb.group({
    start: [null, Validators.required],
    end: [null, Validators.required],
    id_customer: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    phone_booking: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    id_room: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(3), Validators.maxLength(20)]]
  });

  ngOnChanges(): void {
    this.load();
  }

  hideDialog() {
    this.visible = false;
    this.bookingForm.reset();
    this.visibleChange.emit(this.visible);
    this.resetBooking();
  }

  saveBooking(booking: Booking) {
    this.loadingChange.emit(true);
    this.bookingService.createBooking(booking).subscribe(
      (data) => {
        if (!data.content) {
          this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: data.message });
          this.loadingChange.emit(false);
        } else {
          this.loadingChange.emit(false);
          this.bookingForm.reset();
          this.hideDialog();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm lịch đặt phòng thành công' });
        }
      }, error => {
        this.loadingChange.emit(false);
        this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    )
  }

  load() {
    this.customerService.filterCustomer(this.searchCustomer).subscribe((data) => {
     
        this.customerList = data.content;
     
    });
    this.roomService.filterRoom(this.searchRoom).subscribe((data) => {
      
        this.roomList = data.content;
      
    });
  }

  onIdChange(event: any) {
    this.booking.id_customer = event.value;
  }

  onPhoneChange(event: any) {
    this.booking.phone_booking = event.value;
  }

  onRoomChange(event: any) {
    this.booking.id_room = event.value;
  }
 
  
  onStartDate(event: Date) {
      this.minDate = event;
    }
  
  onEndDate(event: Date) {
      this.maxDate = event;
    }
  
}
