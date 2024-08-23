import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../../Interface/booking';
export interface ResponseApi {
  status: boolean;
  message: string;
  content: Booking[]; 
}
@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private apiUrl = 'http://localhost:8080/api/booking';
  constructor(private http: HttpClient) { }


  getBooking(): Observable<Booking[]> {
    return this.http.get<ResponseApi>(`${this.apiUrl}/getBooking`).pipe(
      map(response => response.content as Booking[])
    );
  }

  createBooking(booking: Booking): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/postBooking`, booking);
  }

  putBooking(booking: Booking): Observable<ResponseApi> {
    console.log("putRoom service",booking);
    return this.http.put<ResponseApi>(`${this.apiUrl}/putBooking?id=${booking.id}`, booking);
  }

  deleteBooking(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/deleteBooking/${id}`)
  }
}
