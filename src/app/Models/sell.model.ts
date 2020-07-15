export interface GetSell {
  sellID: number;
  quantity: number;
  totalCost: number;
  containerReturned: string;
  paid: number;
  sellDate: Date;
  product: {
    productID: number;
  };
}
