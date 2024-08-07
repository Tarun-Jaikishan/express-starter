import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import expSession from "express-session";

import { envNodeEnv, envPort, envSessionKey } from "./environment";

import { errorLogger } from "./middlewares/error.middleware";

import { expAsync } from "./common";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: "*", credentials: true }));
app.use(expSession({ secret: envSessionKey }));
app.use(helmet());
app.use(morgan("short"));

// Routes

// Basic GET API
app.get(
  "/",
  expAsync(async (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello --Typescript-- World" });
  })
);

app.use(errorLogger);

// Listener
const port = envPort || 8080;

app.listen(port, async () => {
  console.log(envNodeEnv.toUpperCase() + " Server running on PORT: " + port);
});
