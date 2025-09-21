import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/mongodb.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import serviceRouter from "./routes/service.routes.js";
import profileRouter from "./routes/profile.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import prescriptionRouter from "./routes/prescription.routes.js";
import aiRouter from "./routes/ai.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://ayur-sutra-theta.vercel.app"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", uploadRouter);
app.use("/api", serviceRouter);
app.use("/api", profileRouter);
app.use("/api", appointmentRouter);
app.use("/api", prescriptionRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
