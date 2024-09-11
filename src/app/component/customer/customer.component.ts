import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../../Service/logic/customer-service.service'
import { Customer, CustomerSearch } from '../../Interface/customer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
  providers: [MessageService, ConfirmationService]
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
  noData: boolean = false;

  searchCustomer: CustomerSearch = {
    name: '',
    phone: '',
    address: '',
    cccd: '',
    page: 0,
    size: 4,
    sortType: 'desc'
  }

  clearInput() {
    this.searchCustomer.name = '';
    this.searchCustomer.phone = '';
    this.searchCustomer.address = '';
    this.searchCustomer.cccd = '';
  }

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
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
          (data) => {
            if (!data.status) {
              this.messageService.add({ severity: 'error', summary: 'Cảnh báo lỗi', detail: data.message });
            } else {
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'xoá khách hàng thành công' });
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
        console.log('Xóa khách hàng đã bị hủy');
      }
    });
  }

  search() {
    this.isLoading = true;
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

  searchReset() {
    this.searchCustomer.page = 0;
    this.search();
  }

  onPageChange(event: any): void {
    this.searchCustomer.page = event.page;
    this.search();
  }


}

