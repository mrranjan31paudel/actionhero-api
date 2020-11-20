import ProductModel from '../models/Product'

export async function readAllProducts() {
  const data = await ProductModel.findAllProducts();

  const formattedData = data.map(doc => {
    const newDoc = { ...doc._doc };
    delete newDoc.__v;

    return newDoc;
  });

  return formattedData;
}

export async function readProduct(code: number) {
  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new Error('Product not found!');
  }

  const trimmedProduct = { ...product._doc };
  delete trimmedProduct.__v;

  return trimmedProduct;
}

export async function createProduct(params: any) {
  const { code, name, vendor, qty_in_store, rate, unit } = params;

  const product = await ProductModel.findProductByCode(code);

  if (product) {
    throw new Error(`Code: ${code} is already assigned for '${product.name}' from vendor '${product.vendor}'.`);
  }

  const data = await ProductModel.createNewProduct({
    code, name, vendor, qty_in_store, rate, unit
  });

  return `New product created: ID = ${data._id}`;
}

export async function updateProduct(params: any) {
  const { code, name, vendor, qty_in_store, rate, unit } = params;

  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new Error(`Product with code ${code} does not exist!`);
  }

  const updateDoc = {
    name: name !== undefined ? name : product.name,
    vendor: vendor !== undefined ? vendor : product.vendor,
    qty_in_store: qty_in_store !== undefined ? qty_in_store : product.qty_in_store,
    rate: rate !== undefined ? rate : product.rate,
    unit: unit !== undefined ? unit : product.unit
  };

  console.log(updateDoc);

  const data = await ProductModel.updateProductByCode(
    code,
    updateDoc
  );

  console.log(data);

  return `Product ${code} updated!`;
}

export async function deleteProduct(code: number) {
  const product = await ProductModel.findProductByCode(code);

  if (!product) {
    throw new Error(`Product ${code} does not exist!`);
  }

  const data = await ProductModel.deleteProductByCode(code);

  console.log(data);

  return `Product ${code} deleted.`;
}
