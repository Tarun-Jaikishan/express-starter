import { NextFunction, Request, Response } from "express";

import { isProduction } from "../constants";

export const errorLogger = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
