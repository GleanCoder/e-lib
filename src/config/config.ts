import { config as conf } from "dotenv";
conf();

interface configTypes {
  port: number;
  dbUrl: string;
  env: string;
  jwtSecret: string;
  cloudinary_cloud: string;
  cloudinary_api_key: string;
  cloudinary_secret_key: string;
}

const _config: configTypes = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.MONGO_CONNECTION_STRING as string,
  env: process.env.NODE_ENV as string,
  jwtSecret: process.env.JWT_TOKEN as string,
  cloudinary_cloud: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_secret_key: process.env.CLOUDINARY_API_SECRET as string,
};

export const config = Object.freeze(_config);
