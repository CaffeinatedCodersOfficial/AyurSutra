import { Service } from "../models/service.model.js";
import { Doctor } from "../models/doctor.model.js";
import { User } from "../models/user.model.js";

export const createService = async (req, res) => {
  try {
    const { name, fee, description, userId } = req.body;

    if (!name || fee === undefined) {
      return res.json({ success: false, message: "Name and fee are required" });
    }

    // Try finding doctor by linked userId or via User.userData reference
    let doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      const user = await User.findById(userId).select("role userData");
      if (user?.role === "Doctor" && user?.userData) {
        doctor = await Doctor.findById(user.userData);
      }
    }
    if (!doctor) return res.json({ success: false, message: "Doctor profile not found. Complete doctor onboarding." });

    const service = await Service.create({ doctor: doctor._id, name, fee, description });
    doctor.services = doctor.services || [];
    doctor.services.push(service._id);
    await doctor.save();

    res.json({ success: true, message: "Service created", service });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { serviceId } = req.params;
    const { name, fee, description, isActive } = req.body;

    // Try finding doctor by linked userId or via User.userData reference
    let doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      const user = await User.findById(userId).select("role userData");
      if (user?.role === "Doctor" && user?.userData) {
        doctor = await Doctor.findById(user.userData);
      }
    }
    if (!doctor) return res.json({ success: false, message: "Doctor profile not found. Complete doctor onboarding." });

    const service = await Service.findOne({ _id: serviceId, doctor: doctor._id });
    if (!service) return res.json({ success: false, message: "Service not found" });

    if (name !== undefined) service.name = name;
    if (fee !== undefined) service.fee = fee;
    if (description !== undefined) service.description = description;
    if (isActive !== undefined) service.isActive = isActive;

    await service.save();
    res.json({ success: true, message: "Service updated", service });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const listMyServices = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    let doctor = await Doctor.findOne({ userId }).populate("services");
    if (!doctor) {
      const user = await User.findById(userId).select("role userData");
      if (user?.role === "Doctor" && user?.userData) {
        doctor = await Doctor.findById(user.userData).populate("services");
      }
    }
    if (!doctor) return res.json({ success: false, message: "Doctor profile not found" });
    res.json({ success: true, services: doctor.services || [] });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const listDoctorsWithServices = async (req, res) => {
  try {
    const doctors = await Doctor.find({ services: { $exists: true, $ne: [] } })
      .populate({ path: "userId", select: "name email" })
      .select("services specialization experience consultationFee userId")
      .populate({ path: "services", model: "Service" });
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const listServicesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const services = await Service.find({ doctor: doctorId, isActive: true });
    res.json({ success: true, services });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const listAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .populate({ path: 'doctor', select: 'userId specialization experience consultationFee', populate: { path: 'userId', select: 'name email' } });
    res.json({ success: true, services });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


