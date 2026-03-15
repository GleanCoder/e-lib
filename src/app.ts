import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import userRouter from "./users/users.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to E-lib");
});

app.use("/api/users", userRouter);
// Global error handler
app.use(globalErrorHandler);

export default app;
