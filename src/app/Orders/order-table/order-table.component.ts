import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface OrderTableItem {
  orderNo: number;
  brand: string;
  flavour: string;
  type: string;
  stock: number;
  price: number;
  orderDate: String;
}

/** Constants used to fill up our data base. */
const EXAMPLE_DATA: OrderTableItem[] = [
  {orderNo: 6, brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 12, price: 14.05, orderDate: "07/01/2020"},
  {orderNo: 5, brand: "Budweiser", flavour: 'Normal', type: 'Can', stock: 23, price: 0.45, orderDate: "07/01/2020"},
  {orderNo: 4, brand: "Budweiser", flavour: 'Normal', type: 'Bottle', stock: 79, price: 0.65, orderDate: "07/01/2020"},
  {orderNo: 3, brand: "Damm", flavour: 'Voll-Damm', type: 'Bottle', stock: 25, price: 0.25, orderDate: "20/10/2020"},
  {orderNo: 2, brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "29/11/2019"},
  {orderNo: 1, brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "25/11/2019"},
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {


  displayedColumns = ['orderNo', 'brand', 'flavour', 'type', 'stock', 'price', 'orderDate'];
  dataSource = new MatTableDataSource(EXAMPLE_DATA);
  selection = new SelectionModel<OrderTableItem>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
