export interface GETOrder {
    orderID: number;
    totalCost: number;
    quantityOrdered: number;
    orderDate: Date;
    product: {
        productID: number;
    }
}