import { config as conf } from "dotenv";
conf();

interface configTypes {
  port: number;
  dbUrl: string;
  env: string;
  jwtSecret:string;
}

const _config: configTypes = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.MONGO_CONNECTION_STRING as string,
  env: process.env.NODE_ENV as string,
  jwtSecret:process.env.JWT_TOKEN as string
};

export const config = Object.freeze(_config);
