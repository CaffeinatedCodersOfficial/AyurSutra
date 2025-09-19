import React from 'react'
import dnaimage from "../../public/dnaimage.png"
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="w-full min-h-[200dvh] pt-24 overflow-hidden flex flex-col justify-start items-center bg-black text-white">

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
          <form className="flex flex-col md:flex-row justify-center items-center rounded-full border-2 border-white/20 py-10 md:py-1 px-10 md:px-1 bg-gray-900/50 backdrop-blur-md">
            <input
              type="text"
              placeholder="Describe your problem"
              className="outline-none pl-3 pr-3 bg-transparent text-white placeholder-gray-400 border-2 border-white/25 md:border-none px-2 py-3 rounded-full text-xs md:text-base mb-4 md:mb-0"
            />
            <div className="w-[1.5px] h-6 bg-white/20 hidden md:flex"></div>
            <input
              type="text"
              placeholder="Suffering since"
              className="outline-none bg-transparent text-white placeholder-gray-400 border-2 border-white/25 md:border-none px-2 py-3 rounded-full text-xs md:text-base mb-4 md:mb-0"
            />
            <button className="bg-blue-600 text-white rounded-full px-4 py-2 md:px-3 md:py-3 hover:bg-blue-500 transition-all text-xs md:text-base">
              Send to AI
            </button>
          </form>
        </div>
      </div>

      {/* 🔽 Lower Section */}
      <div className="w-full min-h-[80dvh] flex flex-col md:flex-row justify-center items-center relative mt-10 md:mt-0 bg-transparent">

        {/* Glows */}
        <div className="rounded-full w-40 md:w-64 h-40 md:h-64 bg-blue-500 blur-3xl opacity-30 absolute top-10 left-10 md:left-20 z-0"></div>
        <div className="rounded-full w-48 md:w-72 h-48 md:h-72 bg-blue-400 blur-3xl opacity-20 absolute bottom-5 right-10 md:right-20 z-0"></div>
        <div className="rounded-full w-40 md:w-56 h-40 md:h-56 bg-red-500 blur-3xl opacity-30 absolute top-24 right-10 md:right-[500px] z-0"></div>
        <div className="rounded-full w-52 md:w-80 h-52 md:h-80 bg-pink-500 blur-3xl opacity-20 absolute bottom-20 left-10 md:left-[400px] z-0"></div>

        {/* Left Image with text */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-full pt-16 md:pt-20 relative">
          <img src={dnaimage} alt="DNA" className="w-full h-full object-cover" />
          <p className="absolute top-16 md:top-40 right-10 md:right-20 text-xl md:text-2xl font-michroma text-gray-300">
            Timely Care With <br /> Virtual Consultation
          </p>
        </div>

        {/* Right content */}
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

          {/* Stats */}
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
    </div>
  )
}

export default Hero
