import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Welcome to E-lib");
});

export default app;
