require("dotenv").config();

let db = process.env.DB;
let user = process.env.DB_USER;
let port = process.env.DB_PORT;
let host = process.env.DB_HOST;
let _name = process.env.DB_NAME;
let passowrd = process.env.DB_PASSWORD;

let dbPath = `${db}://${user}:${passowrd}@${host}:${port}/${_name}`;
let dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true // Solved: (node:31872) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
}

export { dbPath, dbOptions, _name as dbName };
