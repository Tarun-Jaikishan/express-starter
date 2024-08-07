const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

fs.renameSync("js-src", "src");
fs.rmSync("ts-src", { recursive: true, force: true });

execSync("npm init -y", { stdio: "inherit" });

execSync(
  "npm install express cors dotenv morgan helmet express-async-handler express-session",
  { stdio: "inherit" }
);
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

fs.rmSync(".git", { recursive: true, force: true });

console.log("Setup complete");

// Delete starter files

const otherFile = "./ts-express-starter.script.js";
const readme = "./README.md";

if (fs.existsSync(otherFile)) fs.unlinkSync(otherFile);
if (fs.existsSync(readme)) fs.unlinkSync(readme);

// Delete the current file
const currentFilePath = process.argv[1];

fs.unlinkSync(currentFilePath);
