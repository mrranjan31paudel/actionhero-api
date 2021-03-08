import { Initializer, api } from 'actionhero';
const mongoose = require('mongoose');

import { dbPath, dbOptions, dbName } from '../config/mongoDB';
import {
  UserSchema,
  ProductSchema
} from '../models/schemas';

class DbInitializer extends Initializer {
  constructor() {
    super();

    this.name = 'mongoInitializer';
  }

  async initialize() {
    api.mongoDb = new mongoose.Mongoose();
  }

  async start() {
    api.mongoDb.connect(dbPath, dbOptions);
    api.colls = {
      users: api.mongoDb.connection.model('User', UserSchema),
      products: api.mongoDb.connection.model('Product', ProductSchema)
    }
    api.mongoDb.connection
      .on(
        'error',
        console.error.bind(console, 'MongoDB Error:')
      );
    api.mongoDb.connection
      .once('open', function () {
        console.log(`Connected to "${dbName}" database`);
      });
    api.mongoDb.connection
      .once('close', function () {
        console.log(`Connection to "${dbName}" database closed!`);
      });
  }

  async stop() {
    api.mongoDb.connection.close();
  }
}

export default DbInitializer;
