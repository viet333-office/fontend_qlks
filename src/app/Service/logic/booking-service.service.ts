import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking, BookingSearch, ResponseApi } from '../../Interface/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private apiUrl = 'http://localhost:8080/api/booking';
  constructor(private http: HttpClient) { }


  createBooking(booking: Booking): Observable<ResponseApi> {
    console.log(booking, "booking")
    return this.http.post<ResponseApi>(`${this.apiUrl}/postBooking`, booking);
  }

  putBooking(booking: Booking): Observable<ResponseApi> {
    console.log("putRoom service", booking);
    return this.http.put<ResponseApi>(`${this.apiUrl}/putBooking?id=${booking.id}`, booking);
  }

  deleteBooking(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/deleteBooking?id=${id}`)
  }

  filterBooking(searchBooking: BookingSearch): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/filter`, searchBooking)
  }
}
