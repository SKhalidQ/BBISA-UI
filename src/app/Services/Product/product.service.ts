import { GetProduct } from './../../Models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private localHostURL = 'https://localhost:5001/API/Products/ListProducts';
  private azureURL = 'https://bbisa.azurewebsites.net/api/Products/ListProducts';
  private privateHostURL = 'https://raspi.skhalidq.dev/bbis_api/Products/ListProducts';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getProductList(): Observable<GetProduct[]> {
    return this.http.get<GetProduct[]>(this.privateHostURL);
  }
}
