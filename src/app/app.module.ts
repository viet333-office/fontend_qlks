import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarModule } from 'primeng/sidebar';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenttComponent } from './component/componentt.component'
import { CustomerComponent } from './component/customer/customer.component';
import { RoomComponent } from './component/room/room.component';
import { BookingComponent } from './component/booking/booking.component';
import { CustomerAddComponent } from './component/customer/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './component/customer/customer-update/customer-update.component';
import { RoomAddComponent } from './component/room/room-add/room-add.component';
import { RoomUpdateComponent } from './component/room/room-update/room-update.component';
import { BookingAddComponent } from './component/booking/booking-add/booking-add.component';
import { BookingUpdateComponent } from './component/booking/booking-update/booking-update.component';




@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ComponenttComponent,
    RoomComponent,
    BookingComponent,
    CustomerAddComponent,
    CustomerUpdateComponent,
    RoomAddComponent,
    RoomUpdateComponent,
    BookingAddComponent,
    BookingUpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ImageModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    BrowserAnimationsModule,
    FormsModule,
    PanelModule,
    CardModule,
    InputTextModule,
    TableModule,
    FileUploadModule,
    DialogModule,
    HttpClientModule,
    MenuModule,
    DropdownModule,
    CalendarModule,
    ToolbarModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
