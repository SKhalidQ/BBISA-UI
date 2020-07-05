import { GetProduct } from './../../Models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private defaultURL = 'https://bbisa.azurewebsites.net/api/Products/ListProducts';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getProductList(): Observable<GetProduct[]> {
    return this.http.get<GetProduct[]>(this.defaultURL);
  }
}
