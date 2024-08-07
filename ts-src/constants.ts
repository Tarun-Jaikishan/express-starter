import { envNodeEnv } from "./environment";

export const isProduction = envNodeEnv === "production";
