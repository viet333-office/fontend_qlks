import { Component } from '@angular/core';
import { ResponseApi, Room, RoomSearch } from '../../Interface/room';
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
  totalPages: number = 0;
  totalItems: number = 0;
  searchRoom: RoomSearch = {
    name: '',
    room: '',
    value: 0,
    status: '',
    stay: '',
    page: 0,
    size: 4,
    arrange: 'asc'
  }
  clearInput() {
    this.searchRoom.name = '';
    this.searchRoom.room = '';
    this.searchRoom.value = 0;
    this.searchRoom.status = '';
    this.searchRoom.stay = '';
  }
  constructor(private roomrService: RoomServiceService) { }
  ngOnInit(): void {
    this.getRooms();
    // this.search();
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

  search() {
    console.log(this.searchRoom,"this.searchRoom");
    
    this.roomrService.filterRoom(this.searchRoom).subscribe((data: ResponseApi) => {
      this.roomList = data.content as Room[];
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
      this.clearInput();
    });
  }
  onPageChange(event: any): void {
    console.log("event : ", event);
    this.searchRoom.page = event.page;
    this.search();
  }
  onStatusChange(event: any) {
    const selectedStatus = event.value ? event.value.status : '';
    this.searchRoom.status = selectedStatus;
  }
}
