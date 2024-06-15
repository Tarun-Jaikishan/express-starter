const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

execSync("npm init -y", { stdio: "inherit" });

execSync("npm install express cors dotenv morgan", { stdio: "inherit" });
execSync("npm install -D nodemon", {
  stdio: "inherit",
});

// Update package.json
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

packageJson.scripts = {
  dev: "nodemon ./src/index.js",
  start: "node ./src/index.js",
};

packageJson.main = "index.js";

fs.writeFileSync(
  "./package.json",
  JSON.stringify(packageJson, null, 2),
  (err) => {
    if (err) throw err;
    console.log("package.json has been updated!");
  }
);

// Create directories
const directories = "controllers routes models db utils config middlewares";
const srcDir = path.join(__dirname, "src");

if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);

directories.split(" ").forEach((dir) => {
  const dirPath = path.join(srcDir, dir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
});

const indexJsContent = `require("dotenv").config();

const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static("uploads"));

// Logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
  );

  app.use(morgan("short", { stream: accessLogStream }));
  app.use(morgan("short"));

  // Routes

  // Basic GET API
  app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
    });

    // Listener
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
    console.log("\n***************************************************\n");
    console.log("Server running on PORT: " + port);
    console.log("\n***************************************************\n");
});
`;

// Write index.js
fs.writeFileSync("./src/index.js", indexJsContent, (err) => {
  if (err) throw err;
  console.log("index.js has been created!");
});

// Write .env
fs.writeFileSync(".env", "PORT=8080", (err) => {
  if (err) throw err;
  console.log(".env has been created!");
});

fs.rmSync(".git", { recursive: true, force: true });
execSync("git init", { stdio: "inherit" });

console.log("Setup complete");

// Delete starter files

const otherFile = "./ts-express-starter.js";

if (fs.existsSync(otherFile)) fs.unlinkSync(otherFile);

// Delete the current file
const currentFilePath = process.argv[1];

fs.unlinkSync(currentFilePath);
