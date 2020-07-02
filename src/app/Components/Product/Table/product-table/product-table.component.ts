import { ProgressBarService } from './../../../../Services/Progress Bar/progress-bar.service';
import { GetProduct } from './../../../../Models/product.model';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  displayColumns = ['productID', 'brand', 'flavour', 'alcoholic', 'containerType', 'returnable', 'stockAmount', 'sellPrice', 'discount'];
  dataSource: MatTableDataSource<GetProduct>;
  selection = new SelectionModel<GetProduct>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService, private ProgBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.fillTable();

    this.productService.redoGet.subscribe(() => {
      this.fillTable();
    });
  }

  fillTable() {
    this.dataSource = new MatTableDataSource<GetProduct>();
    this.dataSource.paginator = this.paginator;
    this.productService.getProductList().subscribe((products) => {
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
}

export class ProductDataSource extends DataSource<any> {
  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<GetProduct[]> {
    return this.productService.getProductList();
  }

  disconnect() {}
}
