const mongoose = require("mongoose");

import { USER_ROLES } from "../constants/miscs";

export const UserSchema = mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    }, //format will be 'full_name_<count>'-> count = no. of user with same name.
    email: {
      type: String,
      unique: true,
    },
    name: String,
    address: String,
    dob: Date,
    role: {
      type: String,
      enum: USER_ROLES,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const ProductSchema = mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
    },
    name: String,
    vendor: String,
    qty_in_store: Number,
    rate: Number,
    unit: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const SaleSchema = mongoose.Schema(
  {
    user: {
      code: String,
      name: String,
    },
    product: {
      code: Number,
      name: String,
      vendor: String,
      rate: Number,
      unit: String,
    },
    qty: Number,
    discount: Number,
    total: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
);
