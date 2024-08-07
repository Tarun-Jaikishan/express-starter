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
app.use(
  expSession({ secret: envSessionKey, resave: true, saveUninitialized: true })
);
app.use(helmet());
app.use(morgan("short"));

// Routes

// Basic GET API
app.get(
  "/",
  expAsync(async (_, res) => {
    res.status(200).json({ message: "Hello --Typescript-- World" });
  })
);

// Invalid Route
//
const InvalidRoute = expAsync(async (_, res) => {
  res.status(404).json({ error: "Invalid API Route" });
});

app
  .route("*")
  .get(InvalidRoute)
  .post(InvalidRoute)
  .put(InvalidRoute)
  .patch(InvalidRoute)
  .delete(InvalidRoute);
//

// Error Logger
app.use(errorLogger);

// Listener
const port = envPort || 8080;

app.listen(port, async () => {
  console.log(envNodeEnv.toUpperCase() + " Server running on PORT: " + port);
});
