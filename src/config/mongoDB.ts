import { db } from "./env";

const { server, user, port, host, dbName, passowrd } = db;
const dbPath = `${server}://${user}:${passowrd}@${host}:${port}/${dbName}`;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Solved: (node:31872) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
};

export { dbPath, dbOptions, dbName };
