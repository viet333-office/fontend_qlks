import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users,ResponseApi, User} from '../../Interface/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) { }

  loginAcc(user: Users): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/authenticate`, user);
  }

  register(user: User): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/register`, user);
  }
}
