import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OrderTableItem {
  brand: string;
  flavour: string;
  type: string;
  stock: number;
  price: number;
  orderDate: String;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: OrderTableItem[] = [
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "20/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "25/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "29/11/2019"},
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "29/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "23/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "22/11/2019"},
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "20/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "21/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "19/11/2019"},
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "03/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "07/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "16/11/2019"},
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "24/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "30/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "27/11/2019"},
  {brand: "Damm", flavour: 'Normal', type: 'Bottle', stock: 25, price: 0.25, orderDate: "27/10/2020"},
  {brand: "Heineken", flavour: 'Larger', type: 'Can', stock: 13, price: 0.75, orderDate: "24/11/2019"},
  {brand: "Budweiser", flavour: 'Normal', type: 'Keg', stock: 5, price: 13.00, orderDate: "26/11/2019"},
];

/**
 * Data source for the OrderTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderTableDataSource extends DataSource<OrderTableItem> {
  data: OrderTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrderTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrderTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrderTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'orderDate': return compare(+a.orderDate, +b.orderDate, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'stock': return compare(+a.stock, +b.stock, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'flavour': return compare(a.flavour, b.flavour, isAsc);
        case 'brand': return compare(a.brand, b.brand, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
