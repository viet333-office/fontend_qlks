import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../Service/logic/customer-service.service'
import { Customer, CustomerSearch } from '../../Interface/customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  sidebarVisible: boolean = true;

  customerList: Customer[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedCustomer!: Customer;
  searchCustomer: CustomerSearch = {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    page: 0,
    size: 8
  }
  clearInput(){
    this.searchCustomer.name = '';
    this.searchCustomer.phone = '';
    this.searchCustomer.address = '';
    this.searchCustomer.cccd = '';
  }
  constructor(private customerService: CustomerServiceService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customerList = data as Customer[];
    });
  }

  openAddModal() {
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
    this.selectedCustomer = { ...customer };
    this.showUpdateModal = true;
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.getCustomers();
    });
  }

  search(){
    this.customerService.filterCustomer(this.searchCustomer).subscribe(()=>{
      this.clearInput();
    })
  }
}

