import { Component } from '@angular/core';
import { BookingServiceService } from '../../Service/logic/booking-service.service'
import { Booking, BookingSearch, ResponseApi } from '../../Interface/booking';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  sidebarVisible: boolean = true;
  bookingList: Booking[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedBooking!: Booking;
  totalPages: number = 0;
  totalItems: number = 0;
  searchBooking: BookingSearch = {
    id_customer: '',
    id_room: '',
    start: new Date,
    end:new Date,
    page: 0,
    size: 4,
    arrange: 'asc'
  }
  clearInput() {
    this.searchBooking.start =  new Date;
    this.searchBooking.end =  new Date;
    this.searchBooking.id_customer = '';
    this.searchBooking.id_room = '';
  }
  constructor(private bookingService: BookingServiceService) { }

  ngOnInit(): void {
    this.getBooking();
  }

  getBooking(): void { 
    
    this.bookingService.getBooking().subscribe((data: any) => {
      this.bookingList = data as Booking[];
    });
  }
  openAddModal() {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }

  handleDialogClose(data: boolean) {
    this.showAddModal = false;
    this.getBooking();
  }

  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;
    this.getBooking();
  }

  openUpdateModal(booking: Booking) {
    this.showAddModal = false;
    this.selectedBooking = { ...booking };
    this.showUpdateModal = true;
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.getBooking();
    });
  }
  
  search() {
    console.log(this.searchBooking,"this.searchRoom");
    this.bookingService.filterBooking(this.searchBooking).subscribe((data: ResponseApi) => {
      this.bookingList = data.content as Booking[];
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
      this.clearInput();
    });
  }
  onPageChange(event: any): void {
    this.searchBooking.page = event.page;
    this.search();
  }

}
