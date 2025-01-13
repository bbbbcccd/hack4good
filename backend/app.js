import express from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import indexRouter from "./routes/index.js";

const app = express();

const loadMiddleware = () => {
  app.use(express.json());

  app.use(morgan("dev"));
  app.use("/", indexRouter);
  app.get("/keep-alive", (req, res) => {
    res.status(204).send();
  });
};

loadMiddleware();

app.use((req, res, next) => {
  next(createHttpError(404, "Missing endpoint."));
});

// error handler
app.use((error, req, res, next) => {
  let errorMsg = "Unknown error occured!";
  let status = 500;
  if (isHttpError(error)) {
    errorMsg = error.message;
    status = error.status;
  }
  res.status(status).json({ error: errorMsg });
});

export default app;
