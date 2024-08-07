const { envNodeEnv } = require("./environment.js");

const isProduction = envNodeEnv === "production";

module.exports = { isProduction };
