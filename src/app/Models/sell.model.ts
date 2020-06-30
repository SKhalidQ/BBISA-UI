export interface GetSell {
  sellID: number;
  quantity: number;
  totalCost: number;
  containerReturned: string;
  payed: number;
  sellDate: Date;
  product: {
    productID: number;
  };
}
