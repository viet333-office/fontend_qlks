import { Component } from '@angular/core';
import { BookingServiceService } from '../../Service/logic/booking-service.service'
import { Booking } from '../../Interface/booking';
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

  constructor(private customerService: BookingServiceService) { }

  ngOnInit(): void {
    this.getBooking();
  }

  getBooking(): void {
    console.log(this.bookingList,"log");
    
    this.customerService.getBooking().subscribe((data: any) => {
      console.log(data,"log data");
      this.bookingList = data as Booking[];
      console.log(this.bookingList,"log data2");
    });
  }



  openAddModal() {
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
    this.selectedBooking = { ...booking };
    this.showUpdateModal = true;
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteBooking(id).subscribe(() => {
      this.getBooking();
    });
  }
}
