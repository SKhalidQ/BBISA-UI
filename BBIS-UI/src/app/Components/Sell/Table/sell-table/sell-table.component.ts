import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { GETSell } from 'src/app/Models/sell.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sell-table',
  templateUrl: './sell-table.component.html',
  styleUrls: ['./sell-table.component.css']
})
export class SellTableComponent implements OnInit {

  displayColumns = ['sellID', 'quantity', 'totalCost', 'containerReturned', 'sellDate', 'productID'];
  dataSource: MatTableDataSource<GETSell>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private sellService: SellService) { }

  ngOnInit(): void {  
    this.dataSource = new MatTableDataSource<GETSell>();
    this.fillTable();

    this.sellService.redoGet.subscribe(() =>{
      this.dataSource = new MatTableDataSource<GETSell>();
      this.fillTable();
    });
  }

  fillTable(){
    this.dataSource.paginator = this.paginator;
    this.sellService.getSellList().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    // return this.sellService
    // return this.dataSource.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}

export class SellDataSource extends DataSource<any>{

  constructor(private sellService: SellService) {
    super();
  }

  connect(): Observable<GETSell[]>{
    return this.sellService.getSellList();
  }

  disconnect() {}
}