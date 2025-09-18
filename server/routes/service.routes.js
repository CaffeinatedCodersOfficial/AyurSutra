import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { createService, updateService, listMyServices, listDoctorsWithServices, listServicesByDoctor, listAllServices } from "../controllers/service.controller.js";

const serviceRouter = express.Router();

// Doctor-owned service management
serviceRouter.post("/services", isAuth, createService);
serviceRouter.put("/services/:serviceId", isAuth, updateService);
serviceRouter.get("/services/me", isAuth, listMyServices);

// Public listing
serviceRouter.get("/services/doctors", listDoctorsWithServices);
serviceRouter.get("/services/doctor/:doctorId", listServicesByDoctor);
serviceRouter.get("/services/all", listAllServices);

export default serviceRouter;


