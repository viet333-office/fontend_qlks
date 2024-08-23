import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../Service/logic/customer-service.service'
import { Customer } from '../../Interface/customer';
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

}

