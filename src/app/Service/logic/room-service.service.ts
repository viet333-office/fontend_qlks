import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseApi, Room, RoomSearch } from '../../Interface/room';


@Injectable({
  providedIn: 'root'
})

export class RoomServiceService {

  private apiUrl = 'http://localhost:8080/api/room';
  constructor(private http: HttpClient) { }

  createRoom(room: Room): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/postRoom`, room);
  }

  putRoom(room: Room): Observable<ResponseApi> {
    console.log("putRoom service", room);
    return this.http.put<ResponseApi>(`${this.apiUrl}/putRoom?id=${room.id}`, room);
  }

  deleteRoom(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/deleteRoom/${id}`)
  }

  filterRoom(searchRoom: RoomSearch): Observable<ResponseApi> {
    console.log(searchRoom, "searchRoom");
    const params = new HttpParams()
      .set('name', searchRoom.name)
      .set('room', searchRoom.room)
      .set('value', searchRoom.value)
      .set('status', searchRoom.status)
      .set('stay', searchRoom.stay)
      .set('page', searchRoom.page.toString())
      .set('size', searchRoom.size.toString())
      .set('arrange', searchRoom.arrange || 'asc');
    console.log(params, "LOG param");
    return this.http.get<ResponseApi>(`${this.apiUrl}/filter`, { params })
  }
  
}
