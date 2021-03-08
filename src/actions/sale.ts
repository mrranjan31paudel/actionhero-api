import { Action } from 'actionhero';

import {
  validateStringType
} from '../validators/string';
import validateNumberType from '../validators/number';

import * as saleService from '../services/sale';

export class ReadAllSales extends Action {
  constructor() {
    super();

    this.name = 'getAllSalesAction';
    this.description = 'Get all sales.'
  }

  async run() {
    const sales = await saleService.readAllSales();

    return { data: sales };
  }
}

export class ReadSale extends Action {
  constructor() {
    super();

    this.name = 'getSaleAction';
    this.description = 'Get single sale.';
    this.inputs = {
      id: {
        required: true,
        validator: val => validateStringType(val, 'id')
      }
    }
  }

  async run(request) {
    const sale = await saleService.readSaleById(`${request.params.id}`);

    return { data: sale };
  }
}

export class CreateSale extends Action {
  constructor() {
    super();

    this.name = 'createSaleAction';
    this.description = 'Creates new sale.';
    this.inputs = {
      user_code: {
        required: true,
        validator: val => validateStringType(val, 'user_code')
      },
      product_code: {
        required: true,
        validator: val => validateNumberType(val, 'product_code')
      },
      qty: {
        required: true,
        validator: val => validateNumberType(val, 'qty')
      },
      discount: {
        required: true,
        validator: val => validateNumberType(val, 'discount')
      },
      total: {
        required: true,
        validator: val => validateNumberType(val, 'total')
      }
    }
  }

  async run(request) {
    const result = await saleService.createSale(request.params);

    return { data: result };
  }
}

export class DeleteSale extends Action {
  constructor() {
    super();

    this.name = "deleteSaleAction";
    this.inputs = {
      id: {
        required: true,
        validator: val => validateStringType(val, 'code')
      }
    }
    this.description = "Deletes specified sale!";
  }

  async run(request) {
    const result = await saleService.deleteSale(request.params.id);

    return { data: result };
  }
}
