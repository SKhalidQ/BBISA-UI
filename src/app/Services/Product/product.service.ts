import { GETProduct } from './../../Models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getListURL = 'https://bbisa.azurewebsites.net/api/Products/ListProducts';

  constructor(private http: HttpClient) { }

  getProductList(): Observable<GETProduct[]>{
    return this.http.get<GETProduct[]>(this.getListURL);
  }

  redoGet: Subject<any> = new Subject();
}
