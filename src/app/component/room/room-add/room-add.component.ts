import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css'
})
export class RoomAddComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  roomList: Room[] = [];
  room: Room = {
    name:'',
    room:'',
    value:0,
    status:'',
    stay:''

  };
  resetRoom() {
    this.room = {
      name:'',
      room:'',
      value:0,
      status:'',
      stay:''
    };
  }
  constructor(private roomrService: RoomServiceService) { }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetRoom();
  }

  saveCustomer(room: Room) {
    room.status = 'open';
    this.roomrService.createRoom(room).subscribe(() => { 
      this.hideDialog();
    })
  }
}
