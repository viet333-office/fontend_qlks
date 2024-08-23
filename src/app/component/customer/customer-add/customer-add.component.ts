import { Component,EventEmitter, Input, Output } from '@angular/core';
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

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetCustomer();
  }

  saveCustomer(customer: Customer) {
    this.customerService.createCustomer(customer).subscribe(() => { 
      this.hideDialog();
    })
  }
}
