import React, { useState } from 'react';
import dnaimage from "../../public/dnaimage.png";
import axios from "axios";

const Hero = () => {
  const [problem, setProblem] = useState("");
  const [sufferingSince, setSufferingSince] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowCard(true);
    setResponseData(null);

    try {
      const res = await axios.post("http://localhost:4000/api/ai/ask", {
        problem,
        sufferingSince
      });

      if (res.data.reply) {
        setResponseData(res.data.reply); // structured object
      } else {
        setResponseData({
          expectedCauses: [],
          importantThingsToDo: [],
          disclaimer: "Unable to fetch data"
        });
      }
    } catch (err) {
      console.error(err);
      setResponseData({
        expectedCauses: [],
        importantThingsToDo: [],
        disclaimer: "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[200dvh] pt-24 overflow-hidden flex flex-col justify-start items-center bg-black text-white">

      {/* Top Hero Section */}
      <div className="border-b-2 border-b-white/10 w-full h-[100dvh] rounded-b-full scale-110 flex flex-col justify-start items-center pt-10 md:pt-20 relative bg-gradient-to-b from-black via-gray-900 to-black">

        {/* 🔵 Blue gradients */}
        <div className="rounded-full w-64 h-64 bg-blue-500 blur-3xl opacity-40 absolute top-10 z-0"></div>
        <div className="rounded-full w-64 h-64 bg-blue-500 blur-3xl opacity-30 absolute top-20 left-20 z-0"></div>
        <div className="rounded-full w-72 h-72 bg-blue-400 blur-3xl opacity-20 absolute bottom-20 right-40 z-0"></div>

        {/* 🔴 Red gradients */}
        <div className="rounded-full w-56 h-56 bg-red-500 blur-3xl opacity-30 absolute top-32 right-32 z-0"></div>
        <div className="rounded-full w-80 h-80 bg-pink-500 blur-3xl opacity-20 absolute bottom-32 left-32 z-0"></div>

        {/* Tagline */}
        <h3 className="text-[8px] md:text-base bg-transparent backdrop-blur-md border-2 border-white/20 rounded-full px-5 py-3 font-bruno mb-12 md:mb-16 relative z-10 text-gray-200">
          India&apos;s Most Adopted Healthcare Ecosystem
        </h3>

        {/* Hero Text */}
        <div className="flex flex-col text-3xl md:text-7xl gap-3 z-50 relative justify-center items-center mb-16">
          <h1 className="font-bruno bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent tracking-wider">
            Revolutionizing
          </h1>
          <h1 className="font-bruno">
            <span className="bg-gradient-to-r from-white via-[#048a08] to-white bg-clip-text text-transparent font-bruno">
              AyurVeda
            </span>{" "}
            With
          </h1>
          <h1 className="tracking-wider font-bruno bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Technology
          </h1>
        </div>

        {/* Input form */}
        <div className="flex justify-center items-center rounded-full">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center rounded-full border-2 border-white/20 py-10 md:py-1 px-10 md:px-1 bg-gray-900/50 backdrop-blur-md">
            <input
              type="text"
              placeholder="Describe your problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="outline-none pl-3 pr-3 bg-transparent text-white placeholder-gray-400 border-2 border-white/25 md:border-none px-2 py-3 rounded-full text-xs md:text-base mb-4 md:mb-0"
              required
            />
            <div className="w-[1.5px] h-6 bg-white/20 hidden md:flex"></div>
            <input
              type="text"
              placeholder="Suffering since"
              value={sufferingSince}
              onChange={(e) => setSufferingSince(e.target.value)}
              className="outline-none bg-transparent text-white placeholder-gray-400 border-2 border-white/25 md:border-none px-2 py-3 rounded-full text-xs md:text-base mb-4 md:mb-0"
              required
            />
            <button className="bg-blue-600 text-white rounded-full px-4 py-2 md:px-3 md:py-3 hover:bg-blue-500 transition-all text-xs md:text-base">
              Send to AI
            </button>
          </form>
        </div>
      </div>

      {/* Lower Section */}
      <div className="w-full min-h-[80dvh] flex flex-col md:flex-row justify-center items-center relative mt-10 md:mt-0 bg-transparent">

        {/* Glows */}
        <div className="rounded-full w-40 md:w-64 h-40 md:h-64 bg-blue-500 blur-3xl opacity-30 absolute top-10 left-10 md:left-20 z-0"></div>
        <div className="rounded-full w-48 md:w-72 h-48 md:h-72 bg-blue-400 blur-3xl opacity-20 absolute bottom-5 right-10 md:right-20 z-0"></div>
        <div className="rounded-full w-40 md:w-56 h-40 md:h-56 bg-red-500 blur-3xl opacity-30 absolute top-24 right-10 md:right-[500px] z-0"></div>
        <div className="rounded-full w-52 md:w-80 h-52 md:h-80 bg-pink-500 blur-3xl opacity-20 absolute bottom-20 left-10 md:left-[400px] z-0"></div>

        <div className="w-full md:w-1/2 h-[45vh] md:h-full pt-16 md:pt-20 relative">
          <img src={dnaimage} alt="DNA" className="w-full h-full object-cover" />
          <p className="absolute top-16 md:top-40 right-10 md:right-20 text-xl md:text-2xl font-michroma text-gray-300">
            Timely Care With <br /> Virtual Consultation
          </p>
        </div>

        <div className="w-full md:w-1/2 h-auto pt-8 md:pt-20 text-left px-6 md:px-14">
          <h3 className="text-lg md:text-3xl font-michrome mt-5 md:mt-20 mb-2 text-white">
            Live Well, Be Well
          </h3>
          <p className="pr-0 md:pr-20 text-gray-400 text-sm md:text-base leading-relaxed">
            Our medical website provides trusted healthcare services with easy online
            consultations, appointment booking, and access to expert doctors. Patients
            can securely manage health records, receive prescriptions, and track
            treatment progress. With a user-friendly design and reliable support, we
            aim to make quality healthcare accessible anytime, anywhere.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col md:flex-row gap-8 md:gap-20">
            <div>
              <h3 className="text-3xl md:text-5xl text-white">100+</h3>
              <p className="text-gray-400">Hospitals</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-5xl text-white">1000+</h3>
              <p className="text-gray-400">Doctors</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-5xl text-white">10000+</h3>
              <p className="text-gray-400">Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Card for AI Response */}
{showCard && (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
    {/* Background overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm"></div>

    {/* Card */}
    <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border-2 border-white/20 backdrop-blur-xl rounded-3xl p-8 w-11/12 md:w-2/3 text-white shadow-2xl z-10 max-h-[80vh] overflow-y-auto">
      
      {loading ? (
        <p className="text-center animate-pulse text-gray-300 text-lg">⏳ Analyzing your symptoms...</p>
      ) : (
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bruno mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-500 to-white">
            🩺 AI Diagnosis Result
          </h3>

          <p className="text-gray-200">
            <span className="font-semibold">Problem:</span> {problem}
          </p>
          <p className="text-gray-200">
            <span className="font-semibold">Suffering Since:</span> {sufferingSince}
          </p>

          {responseData?.expectedCauses?.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold text-blue-400 text-lg">Expected Causes:</p>
              <ul className="list-disc ml-5 text-gray-200">
                {responseData.expectedCauses.map((cause, i) => (
                  <li key={i}>{cause}</li>
                ))}
              </ul>
            </div>
          )}

          {responseData?.importantThingsToDo?.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold text-green-400 text-lg">Important Things To Do:</p>
              <ul className="list-disc ml-5 text-gray-200">
                {responseData.importantThingsToDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {responseData?.disclaimer && (
            <p className="mt-3 text-red-400 font-michroma">{responseData.disclaimer}</p>
          )}

          {/* Close Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowCard(false)}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-2 font-bruno text-sm md:text-base transition-all shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}


    </div>
  )
}

export default Hero;
