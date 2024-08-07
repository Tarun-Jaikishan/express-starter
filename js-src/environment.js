require("dotenv").config();

const envPort = process.env.PORT;
const envNodeEnv = process.env.NODE_ENV;
const envSessionKey = process.env.SESSION_KEY;

module.exports = { envPort, envNodeEnv, envSessionKey };
