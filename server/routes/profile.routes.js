import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { getMyProfile, updateDoctorProfile, updatePatientProfile } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get('/profile/me', isAuth, getMyProfile);
profileRouter.put('/profile/doctor', isAuth, updateDoctorProfile);
profileRouter.put('/profile/patient', isAuth, updatePatientProfile);

export default profileRouter;


