import express from "express";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("Got a GET request");
});

export default indexRouter;
