import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const PrescriptionDetail = () => {
  const { backendUrl } = useContext(AppContext)
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{
    const load = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/prescriptions/${id}`)
        if (data.success) setData(data.prescription)
      } catch {}
    }
    load()
  },[id])

  if(!data) return <div className='pt-24 text-white px-6'>Loading...</div>

  return (
    <div className='relative w-full min-h-screen bg-black text-white pt-24 pb-16'>
      <div className='absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10'></div>
      <div className='absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20'></div>

      <div className='w-full px-6 md:px-10 xl:px-16 z-10'>
        <h1 className='text-4xl font-bruno bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent'>Prescription</h1>
        <p className='text-gray-400 mt-2 mb-6'>Doctor: {data.doctorId?.userId?.name || 'Doctor'} • {new Date(data.createdAt).toLocaleString()}</p>

        <div className='p-6 rounded-2xl bg-gray-900/60 border border-white/10'>
          <h3 className='text-2xl font-michroma'>Summary</h3>
          {data.condition && <p className='text-gray-300 mt-2'>Condition: {data.condition}</p>}
          {data.notes && <p className='text-gray-300 mt-1'>Notes: {data.notes}</p>}
        </div>

        <div className='mt-6 p-6 rounded-2xl bg-gray-900/60 border border-white/10'>
          <h3 className='text-2xl font-michroma'>Medications</h3>
          <ul className='mt-3 space-y-2'>
            {(data.medications||[]).map(m => (
              <li key={m._id} className='p-4 bg-black/30 border border-white/10 rounded-xl'>
                <p className='font-semibold'>{m.medicationName}</p>
                {m.dosage && <p className='text-gray-400 text-sm'>Dosage: {m.dosage.amount} • {m.dosage.frequency} • {m.dosage.duration}</p>}
                {m.instructions && <p className='text-gray-400 text-sm'>Instructions: {m.instructions}</p>}
              </li>
            ))}
            {(data.medications||[]).length===0 && <li className='text-gray-400 text-sm'>No medications listed</li>}
          </ul>
        </div>

        {data.files && data.files.length>0 && (
          <div className='mt-6 p-6 rounded-2xl bg-gray-900/60 border border-white/10'>
            <h3 className='text-2xl font-michroma'>Files</h3>
            <ul className='mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {data.files.map((f, idx) => (
                <li key={idx} className='p-4 bg-black/30 border border-white/10 rounded-xl'>
                  <a href={f.url} target='_blank' rel='noreferrer' className='text-blue-400 underline'>Open {f.fileType}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='mt-8'>
          <Link to='/services' className='bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm'>Back to Services</Link>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionDetail



