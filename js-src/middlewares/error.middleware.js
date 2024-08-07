const { NextFunction, Request, Response } = require("express");

const { isProduction } = require("../constants.js");

const errorLogger = async (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    headers: req.headers,
  };

  console.log(err);
  if (isProduction)
    return res.status(500).json({ error: "Internal Server Error" });
  else
    return res
      .status(500)
      .json({ error: "Internal Server Error", err: errorDetails });
};

module.exports = { errorLogger };
