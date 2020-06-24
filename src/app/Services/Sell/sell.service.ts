import { GETSell } from './../../Models/sell.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  private getListURL = 'https://bbisa.azurewebsites.net/api/Sell/ListSells';

  constructor(private http: HttpClient) { }

  getSellList(): Observable<GETSell[]>{
    return this.http.get<GETSell[]>(this.getListURL);
  }

  redoGet: Subject<any> = new Subject();
}
