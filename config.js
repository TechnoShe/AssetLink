import dotenv from "dotenv";
dotenv.config();

export const configs = {
  NEXT_GLACIER_API_KEY: process.env.NEXT_GLACIER_API_KEY,
  NEXT_PINATA_JWT: process.env.NEXT_PINATA_JWT,
  NEXT_PINATA_GATEWAY_URL: process.env.NEXT_PINATA_GATEWAY_URL,
};
