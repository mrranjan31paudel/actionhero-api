import { Action } from "actionhero";

import validateNumberType from "../validators/number";
import validateUnit from "../validators/unit";

import * as productServices from "../services/product";
import { validateStringType } from "../validators/string";

export class GetAllProducts extends Action {
  constructor() {
    super();

    this.name = "getAllProductsAction";
    this.description = "Get all products";
    this.inputs = {
      sortBy: {
        required: false,
        validator: (val) => validateStringType(val, "sortBy"),
      },
      sortDir: {
        required: false,
        validator: (val) => validateStringType(val, "sortDir"),
      },
      code: {
        required: false,
        validator: (val) => validateNumberType(val, "code"),
      },
      name: {
        required: false,
        validator: (val) => validateStringType(val, "name"),
      },
      vendor: {
        required: false,
        validator: (val) => validateStringType(val, "vendor"),
      },
      qty_in_store: {
        required: false,
        validator: (val) => validateNumberType(val, "qty_in_store"),
      },
      rate: {
        required: false,
        validator: (val) => validateNumberType(val, "rate"),
      },
      unit: {
        required: false,
        validator: (val) => validateStringType(val, "unit"),
      },
    };
  }

  async run(data) {
    const products = await productServices.readAllProducts(data.params);

    return { data: products };
  }
}

export class ReadProduct extends Action {
  constructor() {
    super();

    this.name = "getProductAction";
    this.description = "Get a product details";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateNumberType(val, "code"),
      },
    };
  }

  async run(request) {
    const product = await productServices.readProduct(
      Number(request.params.code)
    );

    return { data: product };
  }
}

export class CreateProduct extends Action {
  constructor() {
    super();

    this.name = "createProductAction";
    this.description = "Add a new product";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateNumberType(val, "code"),
      },
      name: {
        required: true,
        validator: (val) => validateStringType(val, "name"),
      },
      vendor: {
        required: true,
        validator: (val) => validateStringType(val, "vendor"),
      },
      qty_in_store: {
        required: true,
        validator: (val) => validateNumberType(val, "qty_in_store"),
      },
      rate: {
        required: true,
        validator: (val) => validateNumberType(val, "rate"),
      },
      unit: {
        required: true,
        validator: validateUnit,
      },
    };
  }

  async run(request) {
    const result = await productServices.createProduct(request.params);

    return { data: result };
  }
}

export class UpdateProduct extends Action {
  constructor() {
    super();

    this.name = "updateProductAction";
    this.description = "Update an existing product";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateNumberType(val, "code"),
      },
      name: { required: false },
      vendor: { required: false },
      qty_in_store: {
        required: false,
        validator: (val) => validateNumberType(val, "qty_in_store"),
      },
      rate: {
        required: false,
        validator: (val) => validateNumberType(val, "rate"),
      },
      unit: {
        required: false,
        validator: validateUnit,
      },
    };
  }

  async run(request) {
    const result = await productServices.updateProduct(request.params);

    return { data: result };
  }
}

export class DeleteProduct extends Action {
  constructor() {
    super();

    this.name = "deleteProductAction";
    this.description = "Delete a product";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateNumberType(val, "code"),
      },
    };
  }

  async run(request) {
    const result = await productServices.deleteProduct(request.params.code);

    return { data: result };
  }
}
