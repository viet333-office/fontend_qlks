import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css'
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
  resetRoom() {
    this.room = {
      name: '',
      room: '',
      value: 0,
      status: '',
      stay: ''
    };
  }
  constructor(private fbd: FormBuilder, private roomrService: RoomServiceService) { }
  roomForm = this.fbd.group({
    name: ['', [Validators.required, Validators.pattern(/^[^!@#$%^&*(),.?":{}|<>]*$/), Validators.pattern(/^[^\d]+$/), Validators.pattern(/^\s*$/), Validators.minLength(3), Validators.maxLength(20)]],
    room: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(3), Validators.maxLength(20)]],
    value: [0, [Validators.required,  Validators.min(1), Validators.max(9999999999)]],
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
      } else if (/^\s*$/.test(value)) {
        return 'phải nhập kí tự không được để khoảng trắng';
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
    room.status = 'open';
    this.roomrService.createRoom(room).subscribe(
      () => {
        this.loadingChange.emit(false);
        this.roomForm.reset();
        this.hideDialog();
      }, (error) => {
        this.loadingChange.emit(false);
        console.error('Error occurred:', error);
      }
    )
  }
}
