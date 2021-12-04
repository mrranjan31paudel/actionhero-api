require("dotenv").config();

export const db = {
  server: process.env.DB,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  passowrd: process.env.DB_PASSWORD,
};

export const auth = {
  passwordSaltRounds: parseInt(process.env.PASSWORD_SALT_ROUNDS, 10),
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    accessTokenLife: parseInt(process.env.JWT_ACCESS_TOKEN_LIFE, 10),
    refreshTokenLife: parseInt(process.env.JWT_REFRESH_TOKEN_LIFE, 10),
  },
};
