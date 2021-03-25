import SaleModel from "../models/Sale";
import UserModel from "../models/User";
import ProductModel from "../models/Product";

import { NotFoundError } from "../utils/errors";

export async function readAllSales() {
  const data = await SaleModel.findAllSales({});

  const formattedData = data.map((doc) => {
    const newDoc = { ...doc._doc };
    delete newDoc.__v;

    return newDoc;
  });

  return formattedData;
}

export async function readSaleById(id: string) {
  const sale = await SaleModel.findSaleById(id);

  if (!sale) {
    throw new NotFoundError("Sale record not found!");
  }

  const formattedData = { ...sale._doc };
  delete formattedData.__v;

  return formattedData;
}

export async function createSale(params: any) {
  const { user_code, product_code, qty, discount, total } = params;

  const user = await UserModel.findUserByCode(user_code);
  if (!user) {
    throw new NotFoundError("User does not exist!");
  }

  const product = await ProductModel.findProductByCode(product_code);
  if (!product) {
    throw new NotFoundError("Product does not exist!");
  }

  const newSale = {
    user: {
      code: user.code,
      name: user.name,
    },
    product: {
      code: product.code,
      name: product.name,
      vendor: product.vendor,
      rate: product.rate,
      unit: product.unit,
    },
    qty,
    discount,
    total,
  };

  await SaleModel.createNewSale(newSale);

  return `Saved sale record!`;
}

export async function deleteSale(id: string) {
  const sale = await SaleModel.findSaleById(id);

  if (!sale) {
    throw new NotFoundError(`Sale record does not exist!`);
  }

  await SaleModel.deleteSaleById(id);

  return "Sale record deleted!";
}
