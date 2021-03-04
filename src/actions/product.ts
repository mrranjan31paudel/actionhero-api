import { Action } from "actionhero"

import isNumber from '../validators/number';
import isValidUnit from '../validators/unit';

import * as productServices from "../services/product"

export class ReadAllProductsAction extends Action {
  constructor() {
    super();

    this.name = 'readAllProductsAction';
    this.description = 'Read all products';
  }

  async run() {
    const products = await productServices.readAllProducts();

    return { data: products };
  }
}

export class ReadProductAction extends Action {
  constructor() {
    super();

    this.name = 'readProductAction';
    this.description = 'To read a product details';
    this.inputs = {
      code: {
        required: true,
        validator: val => isNumber(val, 'code')
      }
    };
  }

  async run(request) {
    const product = await productServices.readProduct(Number(request.params.code));

    return { data: product };
  }
}

export class CreateProductAction extends Action {
  constructor() {
    super();

    this.name = 'createProductAction';
    this.description = 'Add a new product';
    this.inputs = {
      code: {
        required: true,
        validator: val => isNumber(val, 'code')
      },
      name: {
        required: true
      },
      vendor: {
        required: true
      },
      qty_in_store: {
        required: true,
        validator: val => isNumber(val, 'qty_in_store')
      },
      rate: {
        required: true,
        validator: val => isNumber(val, 'rate')
      },
      unit: {
        required: true,
        validator: isValidUnit
      }
    }
  }

  async run(request) {
    const result = await productServices.createProduct(request.params);

    return { data: result };
  }
}

export class UpdateProductAction extends Action {
  constructor() {
    super();

    this.name = 'updateProductAction';
    this.description = 'Update an existing product';
    this.inputs = {
      code: {
        required: true,
        validator: val => isNumber(val, 'code')
      },
      name: { required: false },
      vendor: { required: false },
      qty_in_store: {
        required: false,
        validator: val => isNumber(val, 'qty_in_store')
      },
      rate: {
        required: false,
        validator: val => isNumber(val, 'rate')
      },
      unit: {
        required: false,
        validator: isValidUnit
      }
    }
  }

  async run(request) {
    const result = await productServices.updateProduct(request.params);

    return { data: result };
  }
}

export class DeleteProductAction extends Action {
  constructor() {
    super();

    this.name = 'deleteProductAction';
    this.description = 'Delete a product';
    this.inputs = {
      code: {
        required: true,
        validator: val => isNumber(val, 'code')
      }
    }
  }

  async run(request) {
    const result = await productServices.deleteProduct(request.params.code);

    return { data: result };
  }
}
