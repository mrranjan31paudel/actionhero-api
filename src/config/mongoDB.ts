require("dotenv").config();
const mongoose = require("mongoose");

let dbClient = process.env.DB_CLIENT;
let dbPort = process.env.DB_PORT;
let dbHost = process.env.DB_HOST;
let dbName = process.env.DB_NAME;
let dbPassword = process.env.DB_PASSWORD;
let dbPath = `mongodb://${dbHost}:${dbPort}/${dbName}`

mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'MongoDB Error:')
);
db.once('open', function () {
  console.log('Connected to', dbPath);
});

module.exports = db;
