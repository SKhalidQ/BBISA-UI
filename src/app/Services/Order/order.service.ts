import { GetOrder } from './../../Models/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private defaultURL = 'https://bbisa.azurewebsites.net/api/Orders/ListOrders';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getOrderList(): Observable<GetOrder[]> {
    return this.http.get<GetOrder[]>(this.defaultURL);
  }
}
