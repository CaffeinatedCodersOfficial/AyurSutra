import { Prescription } from "../models/prescription.model.js";
import { Patient } from "../models/patient.model.js";

export const listMyPrescriptions = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const patient = await Patient.findOne({ userId }).select('_id');
    if (!patient) return res.json({ success: false, message: 'Patient profile not found' });

    const prescriptions = await Prescription.find({ patientId: patient._id })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
      .populate('medications')
      .sort({ createdAt: -1 });

    res.json({ success: true, prescriptions });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { id } = req.params;
    const patient = await Patient.findOne({ userId }).select('_id');
    if (!patient) return res.json({ success: false, message: 'Patient profile not found' });

    const prescription = await Prescription.findOne({ _id: id, patientId: patient._id })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } })
      .populate('medications')
      .populate('appointmentId');

    if (!prescription) return res.json({ success: false, message: 'Prescription not found' });
    res.json({ success: true, prescription });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



