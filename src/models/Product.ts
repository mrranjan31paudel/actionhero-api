import { api } from 'actionhero';

export interface ProductType {
  code?: number,
  name?: string,
  vendor?: string,
  qty_in_store?: number,
  rate?: number,
  unit?: string
}

function findAllProducts() {
  return api.colls.products.find();
}

function findProductByCode(code: number) {
  return api.colls.products.findOne({ code: code });
}

function createNewProduct(product: ProductType) {
  const newProduct = new api.colls.products(product);

  return newProduct.save();
}

function updateProductByCode(code: number, product: ProductType) {
  return api.colls.products.updateOne({ code: code }, product);
}

function deleteProductByCode(code: number) {
  return api.colls.products.deleteOne({ code: code });
}

export default {
  findAllProducts,
  createNewProduct,
  findProductByCode,
  updateProductByCode,
  deleteProductByCode
};
