import ProductModel from "../models/Product";

import { AlreadyExistsError, NotFoundError } from "../utils/errors";

export async function readAllProducts() {
  const data = await ProductModel.findAllProducts();

  return data;
}

export async function readProduct(code: number) {
  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new NotFoundError("Product not found!");
  }

  return product;
}

export async function createProduct(params: any) {
  const { code, name, vendor, qty_in_store, rate, unit } = params;

  const product = await ProductModel.findProductByCode(code);

  if (product) {
    throw new AlreadyExistsError(`Product with code ${code} already exists!`);
  }

  const data = await ProductModel.createNewProduct({
    code,
    name,
    vendor,
    qty_in_store,
    rate,
    unit,
  });

  return `New product created: ID = ${data._id}`;
}

export async function updateProduct(params: any) {
  const { code, name, vendor, qty_in_store, rate, unit } = params;

  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new NotFoundError(`Product with code ${code} does not exist!`);
  }

  let updateDoc = {};

  if (name) {
    updateDoc["name"] = name;
  }

  if (vendor) {
    updateDoc["vendor"] = vendor;
  }

  if (qty_in_store) {
    updateDoc["qty_in_store"] = qty_in_store;
  }

  if (rate) {
    updateDoc["rate"] = rate;
  }

  if (unit) {
    updateDoc["unit"] = unit;
  }

  await ProductModel.updateProductByCode(code, updateDoc);

  return `Product ${code} updated!`;
}

export async function deleteProduct(code: number) {
  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new NotFoundError(`Product does not exist!`);
  }

  await ProductModel.deleteProductByCode(code);

  return `Product ${code} deleted.`;
}
