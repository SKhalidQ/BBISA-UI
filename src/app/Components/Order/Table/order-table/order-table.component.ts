import { MatSort } from '@angular/material/sort';
import { GetOrder } from './../../../../Models/order.model';
import { OrderService } from './../../../../Services/Order/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit {
  displayColumns = ['orderID', 'quantityOrdered', 'totalCost', 'orderDate', 'productID'];
  dataSource: MatTableDataSource<GetOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<GetOrder>();
    this.fillTable();
    this.dataSource.sort = this.sort;

    this.orderService.redoGet.subscribe(() => {
      this.dataSource = new MatTableDataSource<GetOrder>();
      this.fillTable();
      this.dataSource.sort = this.sort;
    });
  }

  fillTable() {
    this.dataSource.paginator = this.paginator;
    this.orderService.getOrderList().subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export class OrderDataSource extends DataSource<any> {
  constructor(private orderService: OrderService) {
    super();
  }

  connect(): Observable<GetOrder[]> {
    return this.orderService.getOrderList();
  }

  disconnect() {}
}
