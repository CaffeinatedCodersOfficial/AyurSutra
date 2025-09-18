import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { createAppointment, listMyAppointments } from "../controllers/appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.post('/appointments', isAuth, createAppointment);
appointmentRouter.get('/appointments/me', isAuth, listMyAppointments);

export default appointmentRouter;


