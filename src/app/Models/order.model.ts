export interface GetOrder {
  orderID: number;
  totalCost: number;
  quantityOrdered: number;
  orderDate: Date;
  product: {
    productID: number;
  };
}
