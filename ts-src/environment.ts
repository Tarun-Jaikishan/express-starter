import dotenv from "dotenv";

dotenv.config();

export const envPort = process.env.PORT as string;
export const envNodeEnv = process.env.NODE_ENV as string;
export const envSessionKey = process.env.SESSION_KEY as string;
