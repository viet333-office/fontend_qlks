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
}
