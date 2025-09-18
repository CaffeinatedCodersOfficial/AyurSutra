import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    fee: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true, maxlength: 500 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);

