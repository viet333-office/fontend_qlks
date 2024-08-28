import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  customer: Customer = {
    name: '',
    phone: '',
    address: '',
    cccd: ''
  };
  resetCustomer() {
    this.customer = {
      name: '',
      phone: '',
      address: '',
      cccd: ''
    };
  }
  constructor(private customerService: CustomerServiceService) { }
  isValid : boolean = false;
  errors: { [key: string]: string } = {};
  hideDialog() {
    this.errors = {};
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetCustomer();
  }

  saveCustomer(customer: Customer) {

  if (!/^[a-zA-Z\s]+$/.test(customer.name)) {
    this.errors['name'] = 'Name chỉ được chứa chữ cái';
    this.isValid = false;
  }

  if (!/^\d+$/.test(customer.phone)) {
    this.errors['phone'] = 'Phone phải là chuỗi số';
    this.isValid = false;
  }

  if (!/^\d+$/.test(customer.cccd)) {
    this.errors['cccd'] = 'CCCD phải là chuỗi số';
    this.isValid = false;
  }

  
  if (!this.isValid) {
    this.visible = true; 
    return; 
  }
    this.customerService.createCustomer(customer).subscribe(() => {
      this.hideDialog();
    })
  }
}
