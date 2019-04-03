require("dotenv").config();

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  "mongodb://localhost/droned-db";
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/droned-test-db";
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

export default {
  DATABASE_URL,
  TEST_DATABASE_URL,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY
};
