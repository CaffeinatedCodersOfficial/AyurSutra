import express from "express";
import { askAi } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/ask", askAi);

export default aiRouter;
