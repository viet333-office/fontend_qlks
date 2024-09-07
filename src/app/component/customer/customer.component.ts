import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../Service/logic/customer-service.service'
import { Customer, CustomerSearch } from '../../Interface/customer';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
  providers: [ConfirmationService]
})
export class CustomerComponent implements OnInit {
  sidebarVisible: boolean = true;


  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedCustomer!: Customer;
  customerList: Customer[] = [];
  isLoading: boolean = false;
  totalPages: number = 0;
  totalItems: number = 0;
  cccdError: boolean = false;
  phoneError: boolean = false;
  noData: boolean = false;

  searchCustomer: CustomerSearch = {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    page: 0,
    size: 4,
    sortType: 'asc'
  }

  clearInput() {
    this.searchCustomer.name = '';
    this.searchCustomer.phone = '';
    this.searchCustomer.address = '';
    this.searchCustomer.cccd = '';
  }

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private confirmationService: ConfirmationService
  ) { }

  searchFormCustomer = this.fb.group({
    name: [''],
    phone: ['', [Validators.pattern(/^\d+$/)]],
    address: [''],
    cccd: ['', [Validators.pattern(/^\d+$/)]]
  });

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

  openUpdateModal(customer: Customer) {
    this.showAddModal = false;
    this.clearInput();
    this.selectedCustomer = { ...customer };
    this.showUpdateModal = true;
  }

  deleteCustomer(id: number): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa khách hàng này?',
      header: 'Xác nhận xóa khách hàng',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.customerService.deleteCustomer(id).subscribe(
          () => {
            this.isLoading = false;
            this.search();
          },
          error => {
            this.isLoading = false;
            console.error('Error deleting customer', error);
          });
      },
      reject: () => {
        console.log('Xóa khách hàng đã bị hủy');
      }
    });
  }

  search() {
    this.isLoading = true;
    this.phoneError = false;
    this.cccdError = false;
    this.customerService.filterCustomer(this.searchCustomer).subscribe(
      (data) => {
        this.isLoading = false;
        this.customerList = data.content as Customer[];
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.noData = this.totalItems === 0;
      }, (error) => {
        this.isLoading = false;
        console.error('Error occurred:', error);
      });
  }

  reset() {
    this.clearInput();
    this.search();
  }

  onPageChange(event: any): void {
    console.log("event : ", event);
    this.searchCustomer.page = event.page;
    this.search();
  }

  validatePhone() {
    this.phoneError = !/^\d+$/.test(this.searchCustomer.phone);
  }

  validateCCCD() {
    this.cccdError = !/^\d+$/.test(this.searchCustomer.cccd);
  }

}

