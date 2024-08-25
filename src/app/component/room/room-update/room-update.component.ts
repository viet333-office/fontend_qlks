import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStatus, Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  roomList :IStatus[] = [];
  selectedStatus: string = '';
  statusOption :IStatus = {name: ''}
  @Input() visible: boolean = false;
  @Input() room: Room = {
    name:'',
    room:'',
    value:0,
    status:'',
    stay:''
  };
  @Output() visibleChange = new EventEmitter<boolean>();


  constructor(private roomrService: RoomServiceService) { }
  ngOnInit(): void {
    this.roomList = [
      { name:"open"},
      { name:"close"},
      { name:"using"}
    ];
  }

  onChangeStatus(status: IStatus){
    this.room.status = status.name;
  }

  updateRooms(room: Room) {
    this.roomrService.putRoom(room).subscribe(() => {
      this.visibleChange.emit(false);
      })
  }
}
