import { api } from "actionhero";

export interface ProductType {
  code?: number;
  name?: string;
  vendor?: string;
  qty_in_store?: number;
  rate?: number;
  unit?: string;
}

function findAllProducts(filter: any = {}, sort?: any) {
  let query = api.colls.products.find(filter);

  if (sort !== null) query.sort(sort);

  return query.lean().exec();
}

function findProductByCode(code: number) {
  return api.colls.products.findOne({ code: code }).lean().exec();
}

function createNewProduct(product: ProductType) {
  const newProduct = new api.colls.products(product);

  return newProduct.save();
}

function updateProductByCode(code: number, product: ProductType) {
  return api.colls.products.updateOne({ code: code }, product).lean().exec();
}

function deleteProductByCode(code: number) {
  return api.colls.products.deleteOne({ code: code }).lean().exec();
}

export default {
  findAllProducts,
  createNewProduct,
  findProductByCode,
  updateProductByCode,
  deleteProductByCode,
};
