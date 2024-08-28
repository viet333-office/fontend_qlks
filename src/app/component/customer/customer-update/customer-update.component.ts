import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() customer: Customer = {
    name: '',
    phone: '',
    address: '',
    cccd: ''
  };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private customerService: CustomerServiceService) { }
  updateCustomer(customer: Customer) {
    this.loadingChange.emit(true);
    this.customerService.putCustomer(customer).subscribe(
      () => {
        this.loadingChange.emit(false);
      this.visibleChange.emit(false);
      },(err) =>{
        this.loadingChange.emit(false);
        console.error('Error occurred:', err);
      }
    )
  }
}
