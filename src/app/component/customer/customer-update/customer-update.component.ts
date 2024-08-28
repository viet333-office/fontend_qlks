import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'
import { FormBuilder, Validators } from '@angular/forms';

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
  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^[^\d]+$/), Validators.pattern(/^\s*$/), Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', [Validators.required, Validators.pattern(/^(03|09|02)\d{8}$/)]],
    address: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^\s*$/), Validators.minLength(5), Validators.maxLength(50)]],
    cccd: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]]
  });

  get nameError() {
    const nameControl = this.customerForm.get('name');
    if (nameControl?.errors && nameControl.dirty) {
      const value = (nameControl.value || '');
      if (/\d/.test(value)) {
        return 'Không được chứa số';
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        return 'Không được chứa ký tự đặc biệt';
      } else if (/^\s*$/.test(value)) {
        return 'phải nhập kí tự không được để khoảng trắng';
      }
    }
    return null;
  }

  get addressError() {
    const addressControl = this.customerForm.get('address');
    if (addressControl?.errors && addressControl.dirty) {
      const value = (addressControl.value || '');
      if (/^\s*$/.test(value)) {
        return 'phải nhập kí tự không được để khoảng trắng ';
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        return 'Không được chứa ký tự đặc biệt';
      }
    }
    return null;
  }
  hideDialog() {
    this.visible = false;
    this.customerForm.reset();
    this.visibleChange.emit(this.visible);
  }

  updateCustomer(customer: Customer) {
    console.log(customer,"log");
    
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
