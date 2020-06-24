import { GETOrder } from './../../Models/order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getListURL = 'https://bbisa.azurewebsites.net/api/Orders/ListOrders';

  constructor(private http: HttpClient) { }

  getOrderList(): Observable<GETOrder[]>{
    return this.http.get<GETOrder[]>(this.getListURL);
  }

  redoGet: Subject<any> = new Subject();
}
