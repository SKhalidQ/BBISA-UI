import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { GetSell } from 'src/app/Models/sell.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sell-table',
  templateUrl: './sell-table.component.html',
  styleUrls: ['./sell-table.component.css'],
})
export class SellTableComponent implements OnInit {
  displayColumns = ['sellID', 'quantity', 'totalCost', 'containerReturned', 'payed', 'sellDate', 'productID'];
  dataSource: MatTableDataSource<GetSell>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection = new SelectionModel<GetSell>(true, []);

  constructor(private sellService: SellService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<GetSell>();
    this.fillTable();
    this.dataSource.sort = this.sort;

    this.sellService.redoGet.subscribe(() => {
      this.dataSource = new MatTableDataSource<GetSell>();
      this.fillTable();
      this.dataSource.sort = this.sort;
    });
  }

  fillTable() {
    this.dataSource.paginator = this.paginator;
    this.sellService.getSellList().subscribe((products) => {
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

export class SellDataSource extends DataSource<any> {
  constructor(private sellService: SellService) {
    super();
  }

  connect(): Observable<GetSell[]> {
    return this.sellService.getSellList();
  }

  disconnect() {}
}
