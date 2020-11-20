interface SaleType {
  _id: number,
  user_id: number,
  product_id: number,
  qty: number,
  ts: Date
};

export class Sale {
  constructor() {

  }

  static readAllSales = () => {

  }

  static readSale = (_id: number) => {

  }

  static createSale = (newSale: SaleType) => {

  }

  static deleteSale = (_id: number) => {

  }
}
