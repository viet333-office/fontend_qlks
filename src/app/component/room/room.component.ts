import { Component } from '@angular/core';
import { Room } from '../../Interface/room';
import { RoomServiceService } from '../../Service/logic/room-service.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  sidebarVisible: boolean = true;
  roomList: Room[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedRoom!: Room;
  constructor(private roomrService: RoomServiceService) { }
  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomrService.getRoom().subscribe((data: Room[]) => {
      this.roomList = data as Room[];
    });
  }

  openAddModal() {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }
  openUpdateModal(room: Room) {
    this.showAddModal = false;
    this.selectedRoom = { ...room };
    this.showUpdateModal = true;
  }
  handleDialogClose(data: boolean) {
    this.showAddModal = false;
    this.getRooms();
  }
  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;
    this.getRooms();
  }

  deleteRooms(id: number): void {
    this.roomrService.deleteRoom(id).subscribe(() => {
      this.getRooms();
    });
  }
}
