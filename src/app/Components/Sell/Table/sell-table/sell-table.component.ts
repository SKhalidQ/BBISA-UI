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
    this.fillTable();

    this.sellService.redoGet.subscribe(() => {
      this.fillTable();
    });
  }

  fillTable() {
    this.dataSource = new MatTableDataSource<GetSell>();
    this.dataSource.paginator = this.paginator;
    this.sellService.getSellList().subscribe((products) => {
      this.dataSource.data = products;
    });
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.dataSource.data.map((t) => t.totalCost).reduce((acc, value) => acc + value, 0);
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
