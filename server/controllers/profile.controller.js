import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

const computeDoctorCompletion = (doc) => {
  const required = [
    Boolean(doc?.specialization),
    typeof doc?.experience === 'number' && doc.experience >= 0,
    typeof doc?.consultationFee === 'number' && doc.consultationFee >= 0,
    Boolean(doc?.contact?.email)
  ];
  const completedCount = required.filter(Boolean).length;
  return {
    completed: completedCount === required.length,
    percent: Math.round((completedCount / required.length) * 100),
  };
};

const computePatientCompletion = (pat) => {
  const required = [
    Boolean(pat?.gender),
    Boolean(pat?.dob),
    Boolean(pat?.contact?.phone) || Boolean(pat?.contact?.email),
  ];
  const completedCount = required.filter(Boolean).length;
  return {
    completed: completedCount === required.length,
    percent: Math.round((completedCount / required.length) * 100),
  };
};

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const user = await User.findById(userId).select('role userData name email');
    if (!user) return res.json({ success: false, message: 'User not found' });

    if (user.role === 'Doctor') {
      const doc = await Doctor.findOne({ userId: user._id });
      if (!doc) return res.json({ success: false, message: 'Doctor profile not found' });
      const status = computeDoctorCompletion(doc);
      return res.json({ success: true, role: 'Doctor', profile: doc, status });
    }

    if (user.role === 'Patient') {
      const pat = await Patient.findOne({ userId: user._id });
      if (!pat) return res.json({ success: false, message: 'Patient profile not found' });
      const status = computePatientCompletion(pat);
      return res.json({ success: true, role: 'Patient', profile: pat, status });
    }

    return res.json({ success: false, message: 'Unsupported role' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const updates = (({ specialization, experience, languages, consultationFee, availability, contact }) => ({ specialization, experience, languages, consultationFee, availability, contact }))(req.body);
    const doc = await Doctor.findOneAndUpdate({ userId }, { $set: updates }, { new: true });
    if (!doc) return res.json({ success: false, message: 'Doctor profile not found' });
    const status = computeDoctorCompletion(doc);
    res.json({ success: true, profile: doc, status });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const updates = (({ dob, gender, bloodGroup, allergies, contact, emergencyContact, address }) => ({ dob, gender, bloodGroup, allergies, contact, emergencyContact, address }))(req.body);
    const pat = await Patient.findOneAndUpdate({ userId }, { $set: updates }, { new: true });
    if (!pat) return res.json({ success: false, message: 'Patient profile not found' });
    const status = computePatientCompletion(pat);
    res.json({ success: true, profile: pat, status });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


