import { Action } from "actionhero"

import * as productServices from "../services/product"

export class ReadAllProductsAction extends Action {
  constructor() {
    super();

    this.name = 'readAllProductsAction';
    this.description = 'Read all products';
  }

  async run(request) {
    const products = await productServices.readAllProducts();

    return { products };
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
        validator: this.productIdValidator
      }
    };
  }

  productIdValidator(code) {
    if (isNaN(code)) {
      throw new Error(`'code' of the product in question should be a numerical value!`);
    }
  }

  async run(request) {
    const product = await productServices.readProduct(Number(request.params.code));

    return { product };
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
        validator: this.codeValidator
      },
      name: {
        required: true
      },
      vendor: {
        required: true
      },
      qty_in_store: {
        required: true,
        validator: this.quantityValidator
      },
      rate: {
        required: true,
        validator: this.rateValidator
      },
      unit: {
        required: true,
        validator: this.unitValidator
      }
    }
  }

  codeValidator(qty) {
    if (isNaN(qty)) {
      throw new Error(`'code' of the product should be a numerical value!`);
    }
  }

  quantityValidator(qty) {
    if (isNaN(qty)) {
      throw new Error(`'quantity' of the product should be a numerical value!`);
    }
  }

  rateValidator(rate) {
    if (isNaN(rate)) {
      throw new Error(`'rate' of the product should be a numerical value!`);
    }
  }

  unitValidator(unit) {
    if (typeof unit !== 'string') {
      throw new Error(`'unit' should be of 'string' type!`);
    }

    if (!['KG', 'LTR', 'PACK'].includes(unit)) {
      throw new Error(`'unit' should be one of: ${['KG', 'LTR'].join(', ')}!`);
    }
  }

  async run(request) {
    const result = await productServices.createProduct(request.params);

    return { result };
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
        validator: this.codeValidator
      },
      name: {},
      vendor: {},
      qty_in_store: {
        validator: this.quantityValidator
      },
      rate: {
        validator: this.rateValidator
      },
      unit: {
        validator: this.unitValidator
      }
    }
  }

  codeValidator(code) {
    if (isNaN(code)) {
      throw new Error(`'code' of the product should be a numerical value!`);
    }
  }

  quantityValidator(qty) {
    if (isNaN(qty)) {
      throw new Error(`'quantity' of the product should be a numerical value!`);
    }
  }

  rateValidator(rate) {
    if (isNaN(rate)) {
      throw new Error(`'rate' of the product should be a numerical value!`);
    }
  }

  unitValidator(unit) {
    if (typeof unit !== 'string') {
      throw new Error(`'unit' should be of 'string' type!`);
    }

    if (!['KG', 'LTR', 'PACK'].includes(unit)) {
      throw new Error(`'unit' should be one of: ${['KG', 'LTR'].join(', ')}!`);
    }
  }

  async run(request) {
    const result = await productServices.updateProduct(request.params);

    return { result };
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
        validator: this.codeValidator
      }
    }
  }

  codeValidator(code) {
    if (isNaN(code)) {
      throw new Error(`'code' of the product should be a numerical value!`);
    }
  }

  async run(request) {
    const result = await productServices.deleteProduct(request.params.code);

    return { result };
  }
}
