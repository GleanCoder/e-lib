import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import createHttpError from "http-errors";

const app = express();

app.get("/", (req, res) => {
  const err = createHttpError(400, "Something Went Wrong!");
  throw err;
  res.send("Welcome to E-lib");
});

// Global error handler
app.use(globalErrorHandler);

export default app;
