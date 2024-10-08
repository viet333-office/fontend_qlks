import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Customer, CustomerSearch, ResponseApi } from '../../Interface/customer';



@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private apiUrl = 'http://localhost:8080/api/customer';
  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiUrl}/post`, customer);
  }

  putCustomer(customer: Customer): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiUrl}/update?id=${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/delete/${id}`)
  }

  filterCustomer(searchCustomer: CustomerSearch): Observable<ResponseApi> {
    const params = new HttpParams()
      .set('name', searchCustomer.name || '')
      .set('phone', searchCustomer.phone || '')
      .set('address', searchCustomer.address || '')
      .set('cccd', searchCustomer.cccd || '')
      .set('page', searchCustomer.page.toString())
      .set('size', searchCustomer.size.toString())
      .set('sortType', searchCustomer.sortType || 'asc');
    return this.http.get<ResponseApi>(`${this.apiUrl}/filter`, { params })
  }

}
