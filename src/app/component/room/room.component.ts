import { Component } from '@angular/core';
import { DropdownEvent, IStatus, ResponseApi, Room, RoomSearch } from '../../Interface/room';
import { RoomServiceService } from '../../Service/logic/room-service.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  sidebarVisible: boolean = true;
  roomList: Room[] = [];
  roomIStatus: IStatus[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedRoom!: Room;
  isLoading: boolean = false;
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
    this.search();
    this.loadStatuses();
  }
  loadStatuses() {
    this.roomIStatus = [
      { name: 'open' },
      { name: 'close' },
      { name: 'using' }
    ];
  }

  openAddModal() {
    this.showUpdateModal = false;
    this.clearInput();
    this.showAddModal = true;
  }
  openUpdateModal(room: Room) {
    this.showAddModal = false;
    this.clearInput();
    this.selectedRoom = { ...room };
    this.showUpdateModal = true;
  }
  handleDialogClose(data: boolean) {
    this.showAddModal = false;
    this.search();
  }
  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;
    this.search();
  }

  deleteRooms(id: number): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa phòng này?');
    if (confirmed) {
      this.roomrService.deleteRoom(id).subscribe(
        () => {
            this.isLoading = false;
            this.search();
        },error => {
          this.isLoading = false;
        }
      );
    }
  }

  search() {
    console.log(this.searchRoom, "this.searchRoom");
    this.isLoading = true;
    this.roomrService.filterRoom(this.searchRoom).subscribe(
      (data) => {
        this.isLoading = false;
        this.roomList = data.content as Room[];
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
        this.clearInput();
      }, (err) => {
        this.isLoading = false;
        console.error('Error occurred:', err);
      }
    );
  }
  onPageChange(event: any): void {
    this.searchRoom.page = event.page;
    this.search();
  }
  onStatusChange(event: DropdownEvent) {
    const selectedStatus = event.value ? event.value.name : ''; 
    this.searchRoom.status = selectedStatus; 
  }
}
