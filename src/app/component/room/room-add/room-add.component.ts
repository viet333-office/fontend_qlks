import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css',
  providers: [MessageService]
})
export class RoomAddComponent {
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();
  roomList: Room[] = [];
  room: Room = {
    name: '',
    room: '',
    value: 0,
    status: '',
    stay: ''
  };
  originalRoomValue: number = 0;
  resetRoom() {
    this.room = {
      name: '',
      room: '',
      value: 0,
      status: '',
      stay: ''
    };
  }

  constructor(private fbd: FormBuilder, private roomrService: RoomServiceService, private messageService: MessageService) { }

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

  hideDialog() {
    this.visible = false;
    this.roomForm.reset();
    this.visibleChange.emit(this.visible);
    this.resetRoom();
  }

  saveRoom(room: Room) {
    this.loadingChange.emit(true);
    room.status = 'Open';
    this.loadingChange.emit(true);
    if (this.roomForm.get('value')?.dirty && room.value !== this.originalRoomValue) {
      room.value = Math.floor(room.value) * 1000;
    }
    this.roomrService.createRoom(room).subscribe(
      (data) => {
        if (!data.content) {
          this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: data.message });
        } else {
          this.roomForm.reset();
          this.hideDialog();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm khách hàng thành công' });
        }
        this.loadingChange.emit(false);
      }, error => {
        this.loadingChange.emit(false);
        this.messageService.add({ severity: 'error', summary: 'cảnh báo lỗi', detail: 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    )
  }

}
