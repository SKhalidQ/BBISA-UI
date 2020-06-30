export interface GetProduct {
  productID: number;
  brand: string;
  flavour: string;
  alcoholic: string;
  containerType: string;
  returnable: string;
  stockAmount: number;
  sellPrice: number;
  discount: number;
}

export interface GetPubProduct {
  brand: string;
  flavour: string;
  alcoholic: string;
  containerType: string;
  returnable: string;
  stockAmount: number;
  sellPrice: number;
  discount: number;
}
