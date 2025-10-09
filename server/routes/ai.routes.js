import express from "express";
import { askAi } from "../controllers/ai.controller.js";
import { getAvailableModels } from "../controllers/availableModel.controller.js";

const aiRouter = express.Router();

aiRouter.post("/ask", askAi);
aiRouter.get("/available", getAvailableModels);

export default aiRouter;
