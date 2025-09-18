import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { listMyPrescriptions, getPrescriptionById } from "../controllers/prescription.controller.js";

const prescriptionRouter = express.Router();

prescriptionRouter.get('/prescriptions/me', isAuth, listMyPrescriptions);
prescriptionRouter.get('/prescriptions/:id', isAuth, getPrescriptionById);

export default prescriptionRouter;



