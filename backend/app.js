import express from "express";
import morgan from "morgan";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users/userRoute.js";

const app = express();

const loadMiddleware = () => {
  app.use(express.json());

  app.use(morgan("dev"));
  app.use("/", indexRouter);
  app.use("/user", userRouter);
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
  res.status(500).json({ error: errorMsg });
});

export default app;
