require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const expSession = require("express-session");

const { envNodeEnv, envPort, envSessionKey } = require("./environment.js");

const { errorLogger } = require("./middlewares/error.middleware.js");

const { expAsync } = require("./common.js");

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
    res.status(200).json({ message: "Hello --Javascript-- World" });
  })
);

// Invalid Route

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

app.use(errorLogger);

// Listener
const port = envPort || 8080;

app.listen(port, async () => {
  console.log(envNodeEnv.toUpperCase() + " Server running on PORT: " + port);
});
