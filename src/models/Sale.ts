import { api } from "actionhero";

export interface SaleType {
  user?: {
    code?: string;
    name?: string;
  };
  product?: {
    code?: number;
    name?: string;
    vendor?: string;
    rate?: number;
    unit?: string;
  };
  qty?: number;
  discount?: number;
  total?: number;
}

function findAllSales(filters: any) {
  return api.colls.sales.find(filters).lean().exec();
}

function findSaleById(id: string) {
  return api.colls.sales.findOne({ _id: id }).lean().exec();
}

function createNewSale(sale: SaleType) {
  const newSale = new api.colls.sales(sale);

  return newSale.save();
}

function deleteSaleById(id: string) {
  return api.colls.sales.deleteOne({ _id: id }).lean().exec();
}

export default {
  findAllSales,
  createNewSale,
  findSaleById,
  deleteSaleById,
};
