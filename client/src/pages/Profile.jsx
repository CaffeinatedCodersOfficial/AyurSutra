import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, userData } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null)
  const [status, setStatus] = useState({ completed: false, percent: 0 })
  const [doctorForm, setDoctorForm] = useState({ specialization: '', experience: 0, consultationFee: 0, languages: [], contact: { email: '', phone: '' } })
  const [patientForm, setPatientForm] = useState({ dob: '', gender: '', contact: { phone: '', email: '' } })

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/profile/me`)
        if (data.success) {
          setRole(data.role)
          setStatus(data.status)
          if (data.role === 'Doctor') {
            setDoctorForm({
              specialization: data.profile.specialization || '',
              experience: data.profile.experience || 0,
              consultationFee: data.profile.consultationFee || 0,
              languages: data.profile.languages || [],
              contact: { email: data.profile?.contact?.email || userData?.email || '', phone: data.profile?.contact?.phone || '' }
            })
          } else if (data.role === 'Patient') {
            const isoDob = data.profile?.dob ? new Date(data.profile.dob).toISOString().slice(0,10) : ''
            setPatientForm({
              dob: isoDob,
              gender: data.profile.gender || '',
              contact: { phone: data.profile?.contact?.phone || '', email: data.profile?.contact?.email || userData?.email || '' }
            })
          }
        }
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const saveDoctor = async () => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/profile/doctor`, doctorForm)
      if (data.success) { toast.success('Profile updated'); setStatus(data.status) }
      else toast.error(data.message || 'Failed')
    } catch { toast.error('Failed') }
  }

  const savePatient = async () => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/profile/patient`, patientForm)
      if (data.success) { toast.success('Profile updated'); setStatus(data.status) }
      else toast.error(data.message || 'Failed')
    } catch { toast.error('Failed') }
  }

  if (loading) return <div className='pt-24 text-white px-6'>Loading...</div>

  return (
    <div className='relative w-full min-h-screen bg-black text-white pt-24 pb-16'>
      <div className='absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10'></div>
      <div className='absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20'></div>

      <div className='w-full px-6 md:px-10 xl:px-16 z-10'>
        <h1 className='text-4xl font-bruno bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent'>Complete Profile</h1>
        <p className='text-gray-400 mt-2 mb-6'>Status: {status.completed ? 'Completed' : 'Pending'} • {status.percent}%</p>

        {role === 'Doctor' && (
          <div className='p-6 rounded-2xl bg-gray-900/60 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm text-gray-300'>Specialization</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={doctorForm.specialization} onChange={e=>setDoctorForm(f=>({...f,specialization:e.target.value}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Experience (years)</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={doctorForm.experience} onChange={e=>setDoctorForm(f=>({...f,experience:Number(e.target.value)||0}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Consultation Fee</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={doctorForm.consultationFee} onChange={e=>setDoctorForm(f=>({...f,consultationFee:Number(e.target.value)||0}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Contact Email</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={doctorForm.contact.email} onChange={e=>setDoctorForm(f=>({...f,contact:{...f.contact,email:e.target.value}}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Contact Phone</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={doctorForm.contact.phone} onChange={e=>setDoctorForm(f=>({...f,contact:{...f.contact,phone:e.target.value}}))} />
            </div>
            <div className='md:col-span-2 flex justify-end'>
              <button onClick={saveDoctor} className='bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl'>Save</button>
            </div>
          </div>
        )}

        {role === 'Patient' && (
          <div className='p-6 rounded-2xl bg-gray-900/60 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm text-gray-300'>Date of Birth</label>
              <input type='date' className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={patientForm.dob} onChange={e=>setPatientForm(f=>({...f,dob:e.target.value}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Gender</label>
              <select className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={patientForm.gender} onChange={e=>setPatientForm(f=>({...f,gender:e.target.value}))} >
                <option value=''>Select</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div>
              <label className='text-sm text-gray-300'>Contact Email</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={patientForm.contact.email} onChange={e=>setPatientForm(f=>({...f,contact:{...f.contact,email:e.target.value}}))} />
            </div>
            <div>
              <label className='text-sm text-gray-300'>Contact Phone</label>
              <input className='w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none' value={patientForm.contact.phone} onChange={e=>setPatientForm(f=>({...f,contact:{...f.contact,phone:e.target.value}}))} />
            </div>
            <div className='md:col-span-2 flex justify-end'>
              <button onClick={savePatient} className='bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl'>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile


