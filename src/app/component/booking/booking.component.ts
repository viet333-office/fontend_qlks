import { Component } from '@angular/core';
import { BookingServiceService } from '../../Service/logic/booking-service.service'
import { Booking, BookingSearch } from '../../Interface/booking';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [DatePipe]
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
  searchBooking: BookingSearch = {
    start: null,
    end: null,
    id_customer: '',
    phone_booking:'',
    id_room: '',
    page: 0,
    size: 4,
    arrange: 'asc'
  }
  clearInput() {
    this.searchBooking.start = null;
    this.searchBooking.end = null;
    this.searchBooking.id_customer = '';
    this.searchBooking.phone_booking = '';
    this.searchBooking.id_room = '';
  }
  constructor(private datePipe: DatePipe, private bookingService: BookingServiceService) { }

  ngOnInit(): void {
    this.search();
  }

  openAddModal() {
    this.showUpdateModal = false;
    this.clearInput();
    this.showAddModal = true;
  }

  handleDialogClose(data: boolean) {
    this.showAddModal = false;
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
  }

  deleteBooking(id: number): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa lịch đặt phòng này?');
    if (confirmed) {
      this.bookingService.deleteBooking(id).subscribe(
        () => {
            this.isLoading = false;
            this.search();
        });
    }
  }


  search() {
    this.isLoading = true;
    this.bookingService.filterBooking(this.searchBooking).subscribe(
      (data) => {
        this.isLoading = false;
        this.bookingList = data.content as Booking[];
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        
      }, (error) => {
        this.isLoading = false;
        console.error('Error occurred:', error);
      }
    );
  }
  reset(){
    this.clearInput();
    this.search();
  }
  onPageChange(event: any): void {
    this.searchBooking.page = event.page;
    this.search();
  }


}
