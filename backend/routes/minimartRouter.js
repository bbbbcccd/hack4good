import express from "express";

import * as MinimartController from "../controllers/minimartController.js";

const minimartRouter = express.Router();

minimartRouter.get("/", MinimartController.getItems);

minimartRouter.get("/:id", MinimartController.getItem);

minimartRouter.post("/", MinimartController.addItem);

minimartRouter.patch("/:id", MinimartController.updateItem);

minimartRouter.delete("/:id", MinimartController.deleteItem);

minimartRouter.post("/purchase", MinimartController.purchaseItem);

export default minimartRouter;
