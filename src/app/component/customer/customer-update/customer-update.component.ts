import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../../Interface/customer';
import { CustomerServiceService } from '../../../Service/logic/customer-service.service'
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css',
  providers: [MessageService, ConfirmationService]
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

  constructor
    (private fb: FormBuilder,
      private customerService: CustomerServiceService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService) { }

  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^[^\d]+$/), Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', [Validators.required, Validators.pattern(/^(01|02|03|08|09)\d{8}$/)]],
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
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn sửa khách hàng này?',
      header: 'Xác nhận sửa khách hàng',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingChange.emit(true);
        this.customerService.putCustomer(customer).subscribe(
          (data) => {
            if (!data.content) {
              this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: data.message });
            } else {
              this.hideDialog();
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm khách hàng thành công' });
            }
            this.loadingChange.emit(false);
          },  error => {
            this.loadingChange.emit(false);
            this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: 'Có lỗi xảy ra, vui lòng thử lại.' });

          });
      },
      reject: () => {
        console.log('Sửa thông tin khách hàng đã bị hủy');
      }
    });
  }
}
