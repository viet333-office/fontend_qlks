import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../Service/logic/customer-service.service'
import { Customer, CustomerSearch, ResponseApi } from '../../Interface/customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  sidebarVisible: boolean = true;


  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedCustomer!: Customer;
  customerList: Customer[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  searchCustomer: CustomerSearch = {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    page: 1,
    size: 4,
    sortType: 'asc'  
  }
  clearInput(){
    this.searchCustomer.name = '';
    this.searchCustomer.phone = '';
    this.searchCustomer.address = '';
    this.searchCustomer.cccd = '';
  }
  constructor(private customerService: CustomerServiceService) { }

  ngOnInit(): void {
    // this.getCustomers();
    this.search();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customerList = data as Customer[];
  });
  }

  openAddModal() {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }

  handleDialogClose(data: boolean) {
    this.showAddModal = false;
    this.getCustomers();
  }

  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;
    this.getCustomers();
  }

  openUpdateModal(customer: Customer) {
    this.showAddModal = false;
    this.selectedCustomer = { ...customer };
    this.showUpdateModal = true;
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.getCustomers();
    });
  }

  search(){
    this.customerService.filterCustomer(this.searchCustomer).subscribe((data: ResponseApi) => {
        this.customerList = data.content as Customer[];
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.clearInput();
    });
  }
  onPageChange(event: any): void {
    console.log("event : ",event);
    this.searchCustomer.page = event.page;
    // this.searchCustomer.page = Math.floor(event.first / this.searchCustomer.size) + 1;
    this.search(); // Tìm kiếm với trang mới
  }
}

