import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../Interface/room';

export interface ResponseApi {
  status: boolean;
  message: string;
  content: Room[];
}
@Injectable({
  providedIn: 'root'
})

export class RoomServiceService {
  // public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private apiUrl = 'http://localhost:8080/api/room';
  constructor(private http: HttpClient) { }


  getRoom(): Observable<Room[]> {
    return this.http.get<ResponseApi>(`${this.apiUrl}/getRoom`).pipe(
      map(response => response.content as Room[])
    );
  }

  createRoom(room: Room): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/postRoom`, room);
  }

  putRoom(room: Room): Observable<ResponseApi> {
    console.log("putRoom service",room);
    return this.http.put<ResponseApi>(`${this.apiUrl}/putRoom?id=${room.id}`, room);
  }

  deleteRoom(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/deleteRoom/${id}`)
  }

}
