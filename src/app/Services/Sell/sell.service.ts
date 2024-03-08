import { GetSell } from './../../Models/sell.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellService {
  
  private apiURL = environment.apiURL + '/Sell/ListSells';

  redoGet: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getSellList(): Observable<GetSell[]> {
    return this.http.get<GetSell[]>(this.apiURL);
  }
}
