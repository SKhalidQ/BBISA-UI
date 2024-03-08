import { GetProduct } from './../../Models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private apiURL = environment.apiURL + '/Products/ListProducts';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getProductList(): Observable<GetProduct[]> {
    return this.http.get<GetProduct[]>(this.apiURL);
  }
}
