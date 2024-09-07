import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStatus, Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css',
  providers: [MessageService, ConfirmationService]
})
export class RoomUpdateComponent {
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() room: Room = {
    name: '',
    room: '',
    value: 0,
    status: '',
    stay: ''
  };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();
  roomList: IStatus[] = [];
  selectedStatus: string = '';
  statusOption: IStatus = { name: '' }

  constructor(
    private fbd: FormBuilder,
    private roomrService: RoomServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  roomForm = this.fbd.group({
    name: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^[^\d]+$/), Validators.minLength(3), Validators.maxLength(20)]],
    room: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(3), Validators.maxLength(20)]],
    value: [0, [Validators.required, Validators.min(1), Validators.max(9999999999)]],
    stay: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1), Validators.maxLength(100)]]
  });

  get nameError() {
    const nameControl = this.roomForm.get('name');
    if (nameControl?.errors && nameControl.dirty) {
      const value = (nameControl.value || '');
      if (!/^[^\d]+$/.test(value)) {
        return 'Không được chứa số';
      } else if (/[^a-zA-Z0-9\s]/.test(value)) {
        return 'Không được chứa ký tự đặc biệt';
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.roomList = [
      { name: "open" },
      { name: "close" },
      { name: "using" }
    ];
  }

  onChangeStatus(selectedStatus: IStatus) {
    this.room.status = selectedStatus.name;
  }

  hideDialog() {
    this.visible = false;
    this.roomForm.reset();
    this.visibleChange.emit(this.visible);
  }

  updateRooms(room: Room) {


    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn sửa phòng này?',
      header: 'Xác nhận sửa phòng',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loadingChange.emit(true);
        this.roomrService.putRoom(room).subscribe(
          (data) => {
            if (!data.content) {
              this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: data.message });
            } else {
              console.log("run true");
              this.visibleChange.emit(false);
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Sửa phòng thành công' });
            }
            this.loadingChange.emit(false);
          }, error => {
            this.loadingChange.emit(false);
            this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: 'Có lỗi xảy ra, vui lòng thử lại.' });
          });
      },
      reject: () => {
        console.log('Sửa thông tin phòng đã bị hủy');
      }
    });
  }

}
