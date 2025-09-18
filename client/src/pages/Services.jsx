import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Services = () => {
  const { backendUrl } = useContext(AppContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/services/all`);
        if (data.success) setServices(data.services || []);
      } catch (e) {}
    };
    fetchServices();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white pt-24 pb-16">
      {/* Glowing Backgrounds */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10"></div>
      <div className="absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20"></div>

      <div className="w-full px-6 md:px-10 xl:px-16 z-10 flex justify-center items-center flex-col">
        <h1 className="text-5xl font-bruno tracking-wider bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent">
          Services
        </h1>
        <p className="text-gray-400 mt-3 mb-10 text-lg max-w-3xl bg-transparent">
          Explore doctors who offer services and book consultations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div key={svc._id} className="p-7 md:p-8 rounded-3xl bg-gray-900/70 backdrop-blur-md border border-white/15 shadow-xl hover:shadow-2xl hover:translate-y-[-3px] transition-all">
              <h3 className="text-3xl font-michroma">{svc.name}</h3>
              <p className="text-gray-200 text-base mt-2">₹{svc.fee}</p>
              {svc.description && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{svc.description}</p>}
              <div className="mt-5 text-sm text-gray-400">
                <p>Doctor: <span className="text-gray-200">{svc.doctor?.userId?.name || 'Doctor'}</span></p>
                <p>Specialization: {svc.doctor?.specialization || '—'}</p>
                <p>Experience: {svc.doctor?.experience || 0} yrs</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Link to={`/services/doctor/${svc.doctor?._id}`} className="inline-block bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm">View Doctor</Link>
                <Link to={`/services/doctor/${svc.doctor?._id}`} className="inline-block bg-green-600 hover:bg-green-500 px-5 py-3 rounded-xl text-sm">Book Consult</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
