import { Component } from '@angular/core';
import { DropdownEvent, IStatus, ResponseApi, Room, RoomSearch } from '../../Interface/room';
import { RoomServiceService } from '../../Service/logic/room-service.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  providers: [ConfirmationService]
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
  noData: boolean = false;

  searchRoom: RoomSearch = {
    name: '',
    room: '',
    value: 0,
    status: '',
    stay: '',
    page: 0,
    size: 4,
    arrange: 'desc'
  }

  clearInput() {
    this.searchRoom.name = '';
    this.searchRoom.room = '';
    this.searchRoom.value = 0;
    this.searchRoom.status = '';
    this.searchRoom.stay = '';
  }

  constructor(
    private fbd: FormBuilder,
    private roomrService: RoomServiceService,
    private confirmationService: ConfirmationService
  ) { }

  searchForm = this.fbd.group({
    room: ['', [Validators.pattern(/^\d+$/)]],
    name: [''],
    status: [''],
    value: [''],
    stay: ['', [Validators.pattern(/^\d+$/)]],
  });

  ngOnInit(): void {
    this.search();
    this.loadStatuses();
  }

  loadStatuses() {
    this.roomIStatus = [
      { name: 'Open' },
      { name: 'Close' },
      { name: 'Using' }
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
    this.searchRoom.page = 0;
    this.search();
  }

  handleCloseUpdate(data: boolean) {
    this.showUpdateModal = false;
    this.search();
  }

  deleteRooms(id: number): void {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa phòng này?',
      header: 'Xác nhận xóa phòng',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading = true;
        this.roomrService.deleteRoom(id).subscribe(
          () => {
            this.isLoading = false;
            this.search();
          }, error => {
            this.isLoading = false;
          });
      },
      reject: () => {
        console.log('Xóa khách hàng đã bị hủy');
      }
    });
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
        this.noData = this.totalItems === 0;
      }, (err) => {
        this.isLoading = false;
        console.error('Error occurred:', err);
      });
  }

  reset() {
    this.clearInput();
    this.search()
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
