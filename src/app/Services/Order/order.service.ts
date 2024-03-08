import { GetOrder } from './../../Models/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  private apiURL = environment.apiURL + '/Orders/ListOrders';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getOrderList(): Observable<GetOrder[]> {
    return this.http.get<GetOrder[]>(this.apiURL);
  }
}
