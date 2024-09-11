import { Component } from '@angular/core';
import { BookingServiceService } from '../../Service/logic/booking-service.service'
import { Booking, BookingSearch } from '../../Interface/booking';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [MessageService, DatePipe, ConfirmationService]
})
export class BookingComponent {
  sidebarVisible: boolean = true;
  bookingList: Booking[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedBooking!: Booking;
  totalPages: number = 0;
  totalItems: number = 0;
  isLoading: boolean = false;
  noData: boolean = false;
  minDate: Date | null = null;
  maxDate: Date | null = null;

  searchBooking: BookingSearch = {
    start: null,
    end: null,
    id_customer: '',
    phone_booking: '',
    id_room: '',
    total:0,
    page: 0,
    size: 4,
    arrange: 'desc'
  }

  clearInput() {
    this.searchBooking.start = null;
    this.searchBooking.end = null;
    this.searchBooking.id_customer = '';
    this.searchBooking.phone_booking = '';
    this.searchBooking.id_room = '';
  }

  constructor(
    private fbb: FormBuilder,
    private messageService: MessageService,
    private bookingService: BookingServiceService,
    private confirmationService: ConfirmationService
  ) { }

  searchFormBooking = this.fbb.group({
    start: [null],
    end: [null],
    id_customer: ['', [Validators.pattern(/^\d+$/)]],
    phone_booking: ['', [Validators.pattern(/^\d+$/)]],
    id_room: ['', [Validators.pattern(/^\d+$/)]]
  });

  ngOnInit(): void {
    this.search();
  }

  reset() {
    this.clearInput();
    this.search();
  }

  openAddModal() {
    this.showUpdateModal = false;
    this.clearInput();
    this.showAddModal = true;
  }

  handleDialogClose(data: boolean) {
    this.showAddModal = false;
    this.searchBooking.page = 0;
    this.search();
  }

  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;

    this.search();
  }

  openUpdateModal(booking: Booking) {
    this.showAddModal = false;
    this.clearInput();
    this.selectedBooking = { ...booking };
    this.showUpdateModal = true;
    console.log("selectedBooking : ", this.selectedBooking);

  }

  deleteBooking(id: number): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa lịch đặt phòng này?',
      header: 'Xác nhận xóa lịch đặt phòng',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.bookingService.deleteBooking(id).subscribe(
          (data) => {
            if (!data.status) {
              this.messageService.add({ severity: 'error', summary: 'Cảnh báo lỗi', detail: data.message });
            } else {
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'xoá lịch đặt phòng thành công' });
            }
            this.isLoading = false;
            this.search();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Cảnh báo lỗi', detail: error.message });
            this.isLoading = false;
          });
      },
      reject: () => {
        console.log('Xóa lịch đặt phòng đã bị hủy');
      }
    });
  }

  search() {
    this.isLoading = true;
    this.bookingService.filterBooking(this.searchBooking).subscribe(
      (data) => {
        this.isLoading = false;
        this.bookingList = data.content as Booking[];
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.noData = this.totalItems === 0;
      }, (error) => {
        this.isLoading = false;
        console.error('Error occurred:', error);
      });
  }

  searchReset() {
    this.searchBooking.page = 0;
    this.search();
  }

  onPageChange(event: any): void {
    this.searchBooking.page = event.page;
    this.search();
  }

  onStartDate(event: Date) {
    this.minDate = event;
  }

  onEndDate(event: Date) {
    this.maxDate = event;
  }
}
