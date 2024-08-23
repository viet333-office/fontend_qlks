import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {
  @Input() visible: boolean = false;
  @Input() customer: Customer = {
    name: '',
    phone: '',
    address: '',
    cccd: ''
  };
  @Output() visibleChange = new EventEmitter<boolean>();


  constructor(private customerService: CustomerServiceService) { }
  updateCustomer(customer: Customer) {
    this.customerService.putCustomer(customer).subscribe(() => {
      this.visibleChange.emit(false);
      })
  }
}
