import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const DoctorServices = () => {
  const { backendUrl } = useContext(AppContext);
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [services, setServices] = useState([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, svcRes] = await Promise.all([
          axios.get(`${backendUrl}/api/services/doctors`),
          axios.get(`${backendUrl}/api/services/doctor/${doctorId}`),
        ]);
        if (docRes.data?.success) {
          const found = (docRes.data.doctors || []).find((d) => d._id === doctorId);
          setDoctor(found || null);
        }
        if (svcRes.data?.success) setServices(svcRes.data.services || []);
      } catch (e) {}
    };
    fetchData();
  }, [doctorId]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white pt-24 pb-16">
      <div className="absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10"></div>
      <div className="absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20"></div>

      <div className="w-full px-6 md:px-10 xl:px-16 z-10">
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bruno tracking-wider bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent">
          {doctor?.userId?.name || "Doctor"}
        </h1>
        <p className="text-gray-400 mt-2 mb-8 text-base bg-transparent">
          {doctor?.specialization} • {doctor?.experience} yrs experience
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s._id} className="p-7 md:p-8 rounded-3xl bg-gray-900/70 backdrop-blur-md border border-white/15 shadow-xl hover:shadow-2xl hover:translate-y-[-3px] transition-all">
              <h3 className="text-3xl font-michroma">{s.name}</h3>
              <p className="text-gray-200 text-base mt-2">₹{s.fee}</p>
              {s.description && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{s.description}</p>}
              <div className="mt-5 text-sm text-gray-400">
                <p>Doctor: <span className="text-gray-200">{doctor?.userId?.name || 'Doctor'}</span></p>
                <p>Specialization: {doctor?.specialization || '—'}</p>
                <p>Experience: {doctor?.experience || 0} yrs</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button onClick={()=>{setSelectedService(s); setBookingOpen(true);}} className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-xl text-sm">Book Consultation</button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-gray-400">No services available.</p>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setBookingOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-gray-950/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6">
            <h3 className="text-2xl font-michroma mb-4">Book Consultation</h3>
            <p className="text-gray-300 text-sm">{selectedService?.name} • ₹{selectedService?.fee}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div>
                <label className="text-sm text-gray-300">Date</label>
                <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none" value={bookingDate} onChange={(e)=>setBookingDate(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-300">Time</label>
                <input type="time" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none" value={bookingTime} onChange={(e)=>setBookingTime(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={()=>setBookingOpen(false)} className="px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={async ()=>{
                try {
                  if(!bookingDate||!bookingTime) return;
                  const iso = new Date(`${bookingDate}T${bookingTime}:00`);
                  await axios.post(`${backendUrl}/api/appointments`, { doctorId, appointmentDate: iso.toISOString(), mode: 'Online' });
                  setBookingOpen(false);
                } catch {}
              }} className="px-4 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorServices;


