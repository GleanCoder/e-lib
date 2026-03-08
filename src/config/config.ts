import { config as conf } from "dotenv";
conf();

interface configTypes {
  port: number;
  dbUrl: string;
}

const _config: configTypes = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.MONGO_CONNECTION_STRING as string,
};

export const config = Object.freeze(_config);
