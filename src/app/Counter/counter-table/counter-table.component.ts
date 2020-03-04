import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface CounterProducts {
  productNo: number;
  brand: string;
  flavour: string;
  container: string;
  quantity: number,
  price: number;
}

/** Constants used to fill up our data base. */
const EXAMPLE_DATA: CounterProducts[] = [
  { productNo: 1 ,brand: "Damm", flavour: 'Vull-Damm', container: 'Bottle', quantity:5,  price: 0.65 },
  { productNo: 2 ,brand: "Heineken", flavour: '0,0', container: 'Can', quantity:6,  price: 0.85 },
  { productNo: 3 ,brand: "Budweiser", flavour: 'Normal', container: 'Keg', quantity:1,  price: 12.55 },
  { productNo: 4 ,brand: "Budweiser", flavour: 'Normal', container: 'Bottle', quantity:6,  price: 0.55 },
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-counter-table',
  templateUrl: './counter-table.component.html',
  styleUrls: ['./counter-table.component.css'] 
})
export class CounterTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'productNo', 'brand', 'flavour', 'container', 'quantity', 'price'];
  dataSource = new MatTableDataSource(EXAMPLE_DATA);
  selection = new SelectionModel<CounterProducts>(true, []);

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CounterProducts): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.productNo + 1}`;
  }

  // /** Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }
}
