const mongoose = require("mongoose");
const db = require('../config/mongoDB');

export interface ProductType {
  code?: number,
  name?: string,
  vendor?: string,
  qty_in_store?: number,
  rate?: number,
  unit?: string
}

const ProductSchema = mongoose.Schema({
  code: {
    type: Number,
    unique: true
  },
  name: String,
  vendor: String,
  qty_in_store: Number,
  rate: Number,
  unit: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', ProductSchema);

function findAllProducts() {
  return Product.find();
}

function findProductByCode(code: number) {
  return Product.findOne({ code: code });
}

function createNewProduct(product: ProductType) {
  const newProduct = new Product(product);

  return newProduct.save();
}

function updateProductByCode(code: number, product: ProductType) {
  return Product.updateOne({ code: code }, product);
}

function deleteProductByCode(code: number) {
  return Product.deleteOne({ code: code });
}

export default {
  findAllProducts,
  createNewProduct,
  findProductByCode,
  updateProductByCode,
  deleteProductByCode
};
