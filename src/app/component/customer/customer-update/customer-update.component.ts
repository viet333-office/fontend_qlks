import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css',
  providers: [MessageService]
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

  constructor(private fb: FormBuilder, private customerService: CustomerServiceService, private messageService: MessageService) { }
  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^[^\d]+$/), Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', [Validators.required, Validators.pattern(/^(03|09|02)\d{8}$/)]],
    address: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.minLength(5), Validators.maxLength(50)]],
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
    this.loadingChange.emit(true);
    this.customerService.putCustomer(customer).subscribe(
      (data) => {
        if (!data.content) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          this.loadingChange.emit(false);
        } else {
          this.loadingChange.emit(false);
          this.visibleChange.emit(false);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa khách hàng thành công' });
        }
      }, error => {
        this.loadingChange.emit(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    )
  }
}
