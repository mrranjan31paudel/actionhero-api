import ProductModel from "../models/Product";

import { AlreadyExistsError, NotFoundError } from "../utils/errors";
import { DEFAULT_PAGE_NUM, DEFAULT_RECORDS_PER_PAGE } from "../constants/miscs";

export async function readAllProducts(params: any) {
  const {
    sortBy = "",
    sortDir = "",
    code = "",
    name = "",
    vendor = "",
    qty_in_store = "",
    rate = "",
    unit = "",
    pageNum = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_RECORDS_PER_PAGE,
  } = params;
  let sort = null;
  let filter = {};
  let requestedPageNum = parseInt(pageNum, 10);
  let recordsPerPage = parseInt(pageSize, 10);

  if (!!sortBy && !!sortDir && ["asc", "desc"].includes(sortDir))
    sort = { [sortBy]: sortDir };
  if (!!code && !isNaN(code)) filter["code"] = parseInt(code, 10);
  if (!!qty_in_store && !isNaN(qty_in_store))
    filter["qty_in_store"] = parseInt(qty_in_store, 10);
  if (!!rate && !isNaN(rate)) filter["rate"] = parseInt(rate, 10);
  if (!!name) filter["name"] = new RegExp(name, "i");
  if (!!vendor) filter["vendor"] = new RegExp(vendor, "i");
  if (!!unit) filter["unit"] = new RegExp(unit, "i");
  if (requestedPageNum < 0) requestedPageNum = DEFAULT_PAGE_NUM;
  if (recordsPerPage < 0) recordsPerPage = DEFAULT_RECORDS_PER_PAGE;

  const offset = requestedPageNum * recordsPerPage;
  const count = await ProductModel.countAllProducts(filter);
  const records = await ProductModel.findAllProducts(
    filter,
    offset,
    recordsPerPage,
    sort
  );
  const pagination = {
    totalRecords: count,
    currentPageNum: requestedPageNum,
    recordsPerPage: recordsPerPage,
  };

  return { records, pagination };
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
