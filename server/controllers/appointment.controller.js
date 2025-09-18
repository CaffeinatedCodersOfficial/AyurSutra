import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";

export const createAppointment = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { doctorId, appointmentDate, mode } = req.body;
    if (!doctorId || !appointmentDate) return res.json({ success: false, message: 'doctorId and appointmentDate are required' })

    const patient = await Patient.findOne({ userId });
    if (!patient) return res.json({ success: false, message: 'Patient profile not found' })

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.json({ success: false, message: 'Doctor not found' })

    const appt = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      appointmentDate: new Date(appointmentDate),
      mode: mode || 'Online'
    })

    res.json({ success: true, message: 'Appointment created', appointment: appt })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const listMyAppointments = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const patient = await Patient.findOne({ userId });
    if (!patient) return res.json({ success: false, message: 'Patient profile not found' })

    const appts = await Appointment.find({ patientId: patient._id })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
      .sort({ appointmentDate: -1 })

    res.json({ success: true, appointments: appts })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


