import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { ProductService } from './../../../../Services/Product/product.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { GetPubProduct } from './../../../../Models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pub-product-table',
  templateUrl: './pub-product-table.component.html',
  styleUrls: ['./pub-product-table.component.css'],
})
export class PubProductTableComponent implements OnInit {
  displayColumns = ['brand', 'flavour', 'alcoholic', 'containerType', 'returnable', 'stockAmount', 'sellPrice', 'discount'];
  dataSource: MatTableDataSource<GetPubProduct>;
  selection = new SelectionModel<GetPubProduct>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<GetPubProduct>();
    this.fillTable();
    this.dataSource.sort = this.sort;

    this.productService.redoGet.subscribe(() => {
      this.dataSource = new MatTableDataSource<GetPubProduct>();
      this.fillTable();
      this.dataSource.sort = this.sort;
    });
  }

  fillTable() {
    this.dataSource.paginator = this.paginator;
    this.productService.getProductList().subscribe((products) => {
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
}

export class ProductDataSource extends DataSource<any> {
  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<GetPubProduct[]> {
    return this.productService.getProductList();
  }

  disconnect() {}
}
