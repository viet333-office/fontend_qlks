import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStatus, Room } from '../../../Interface/room';
import { RoomServiceService } from '../../../Service/logic/room-service.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() room: Room = {
    name:'',
    room:'',
    value:0,
    status:'',
    stay:''
  };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loadingChange = new EventEmitter<boolean>();
  roomList :IStatus[] = [];
  selectedStatus: string = '';
  statusOption :IStatus = {name: ''}

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
    this.loadingChange.emit(true);
    this.roomrService.putRoom(room).subscribe(
      () => {
      this.loadingChange.emit(false);
      this.visibleChange.emit(false);
      }, (error) => {
        this.loadingChange.emit(false);
        console.error('Error occurred:', error);
      }
    )
  }
}
