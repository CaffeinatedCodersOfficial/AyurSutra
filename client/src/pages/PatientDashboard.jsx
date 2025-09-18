import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaFilePrescription } from "react-icons/fa";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const PatientDashboard = () => {
  const { backendUrl } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/appointments/me`);
        if (data.success) setAppointments(data.appointments || []);
      } catch {}
    };
    load();
  }, []);

  const upcoming = useMemo(
    () => appointments.filter((a) => new Date(a.appointmentDate) > new Date()),
    [appointments]
  );
  const past = useMemo(
    () => appointments.filter((a) => new Date(a.appointmentDate) <= new Date()),
    [appointments]
  );

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 py-10">
      {/* Glowing Backgrounds */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10"></div>
      <div className="absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20"></div>

      {/* Dashboard Title */}
      <h1 className="text-5xl font-bruno tracking-wider bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent z-10">
        Patient Dashboard
      </h1>
      <p className="text-gray-400 mt-3 mb-10 text-lg text-center max-w-2xl bg-transparent">
        Manage your health journey — book consultations, view records, track prescriptions,
        and stay updated with your doctors and healthcare services in one place.
      </p>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-10 z-10 bg-transparent">
        {/* Profile Status */}
        <div className="md:col-span-3 p-5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="bg-transparent">
            <p className="text-gray-300 bg-transparent">Profile Status</p>
            <p className="text-sm text-gray-400 bg-transparent">Complete your profile to enable faster bookings and better care.</p>
          </div>
          <Link to="/profile" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm">Complete Profile</Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-michroma bg-transparent">Upcoming Appointments</h3>
            <FaCalendarCheck className="text-blue-400 text-3xl bg-transparent" />
          </div>
          <ul className="space-y-3">
            {upcoming.slice(0,5).map((a)=> (
              <li key={a._id} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between">
                <span className="bg-transparent">{new Date(a.appointmentDate).toLocaleString()}</span>
                <span className="text-gray-300 text-sm bg-transparent">{a.doctorId?.userId?.name || 'Doctor'}</span>
              </li>
            ))}
            {upcoming.length===0 && <li className="text-gray-400 text-sm">No upcoming appointments</li>}
          </ul>
        </div>

        {/* Past Appointments */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-michroma bg-transparent">Past Appointments</h3>
            <FaCalendarCheck className="text-green-400 text-3xl bg-transparent" />
          </div>
          <ul className="space-y-3">
            {past.slice(0,5).map((a)=> (
              <li key={a._id} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between">
                <span className="bg-transparent">{new Date(a.appointmentDate).toLocaleString()}</span>
                <span className="text-gray-300 text-sm bg-transparent">{a.doctorId?.userId?.name || 'Doctor'}</span>
              </li>
            ))}
            {past.length===0 && <li className="text-gray-400 text-sm">No past appointments</li>}
          </ul>
        </div>

        {/* Prescriptions CTA */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-michroma bg-transparent">Prescriptions</h3>
            <FaFilePrescription className="text-yellow-400 text-3xl bg-transparent" />
          </div>
          <p className="text-gray-400 text-sm mb-3">View your prescriptions from completed consultations.</p>
          <Link to="/services" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm">Go to Services</Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
