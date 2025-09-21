import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FaUserInjured, FaFilePrescription, FaCheckCircle, FaClock, FaPlus, FaRupeeSign, FaStar, FaNotesMedical } from 'react-icons/fa'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const DoctorDashboard = () => {
  const { backendUrl } = useContext(AppContext)
  const [services, setServices] = useState([])

  const pendingPrescriptions = useMemo(
    () => [
      { id: 'p-101', patient: 'Aarav Sharma', appointmentAt: '2025-09-17 10:00', notes: 'Post-lab review' },
      { id: 'p-102', patient: 'Isha Verma', appointmentAt: '2025-09-17 11:30', notes: 'Back pain regimen' },
      { id: 'p-103', patient: 'Rohan Gupta', appointmentAt: '2025-09-17 15:00', notes: 'Diet adjustments' },
    ],
    []
  )

  const history = useMemo(
    () => [
      { id: 'h-1', patient: 'Meera Nair', date: '2025-09-15', service: 'General Consultation', status: 'Completed' },
      { id: 'h-2', patient: 'Kunal Singh', date: '2025-09-14', service: 'Ayurvedic Therapy Session', status: 'Completed' },
      { id: 'h-3', patient: 'Priya Patel', date: '2025-09-13', service: 'Follow-up Visit', status: 'Completed' },
    ],
    []
  )

  const feedbacks = useMemo(
    () => [
      { id: 'f-1', patient: 'Kunal Singh', rating: 5, comment: 'Very attentive and helpful guidance.' },
      { id: 'f-2', patient: 'Priya Patel', rating: 4, comment: 'Clear explanation of treatment plan.' },
      { id: 'f-3', patient: 'Meera Nair', rating: 5, comment: 'Felt much better after the session.' },
    ],
    []
  )

  const stats = useMemo(
    () => ({
      totalPatients: 126,
      pendingPrescriptions: pendingPrescriptions.length,
      completedAppointments: history.length,
    }),
    [pendingPrescriptions.length, history.length]
  )

  const [newService, setNewService] = useState({ name: '', fee: '' })
  const [editingServiceId, setEditingServiceId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', fee: '' })

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/services/me`)
      if (data.success) {
        setServices(data.services || [])
      }
    } catch (e) {}
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const addService = async () => {
    if (!newService.name || !newService.fee) return
    const feeNum = Number(newService.fee)
    if (Number.isNaN(feeNum) || feeNum < 0) return
    try {
      const { data } = await axios.post(`${backendUrl}/api/services`, {
        name: newService.name,
        fee: feeNum,
      })
      if (data.success) {
        toast.success('Service added')
        setNewService({ name: '', fee: '' })
        fetchServices()
      } else {
        toast.error(data.message || 'Failed to add service')
      }
    } catch (e) {
      toast.error('Failed to add service')
    }
  }

  const openEdit = (service) => {
    setEditingServiceId(service._id)
    setEditForm({ name: service.name, fee: String(service.fee) })
  }

  const submitEdit = async () => {
    if (!editForm.name || !editForm.fee) return
    const feeNum = Number(editForm.fee)
    if (Number.isNaN(feeNum) || feeNum < 0) return
    try {
      const { data } = await axios.put(`${backendUrl}/api/services/${editingServiceId}`, {
        name: editForm.name,
        fee: feeNum,
      })
      if (data.success) {
        toast.success('Service updated')
        setEditingServiceId(null)
        setEditForm({ name: '', fee: '' })
        fetchServices()
      } else {
        toast.error(data.message || 'Failed to update')
      }
    } catch (e) {
      toast.error('Failed to update')
    }
  }

  const cancelEdit = () => {
    setEditingServiceId(null)
    setEditForm({ name: '', fee: '' })
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col items-stretch justify-start pt-24 pb-16">
      {/* Glowing Backgrounds to match Patient theme */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-500 blur-3xl opacity-20 top-32 left-10"></div>
      <div className="absolute w-80 h-80 rounded-full bg-red-500 blur-3xl opacity-20 bottom-20 right-20"></div>

      {/* Title */}
      <div className="w-full px-6 md:px-10 xl:px-16 z-10 flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-5xl text-center font-bruno tracking-wider bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text text-transparent">
          Doctor Dashboard
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-10 text-base md:text-lg max-w-4xl bg-transparent">
          Overview of your patients, pending prescriptions, services, and recent history.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-6 md:px-10 xl:px-16 z-10">
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-4 hover:translate-y-[-2px] transition-transform">
          <FaUserInjured className="text-blue-400 text-4xl" />
          <div className="bg-transparent">
            <p className="text-gray-400 text-sm">Total Patients</p>
            <h3 className="text-3xl font-michroma">{stats.totalPatients}</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-4 hover:translate-y-[-2px] transition-transform">
          <FaFilePrescription className="text-yellow-400 text-4xl" />
          <div className="bg-transparent">
            <p className="text-gray-400 text-sm">Pending Prescriptions</p>
            <h3 className="text-3xl font-michroma">{stats.pendingPrescriptions}</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-4 hover:translate-y-[-2px] transition-transform">
          <FaCheckCircle className="text-green-400 text-4xl" />
          <div className="bg-transparent">
            <p className="text-gray-400 text-sm">Completed Appointments</p>
            <h3 className="text-3xl font-michroma">{stats.completedAppointments}</h3>
          </div>
        </div>
        {/* Profile Status */}
        <div className="md:col-span-3 p-5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="bg-transparent">
            <p className="text-gray-300 bg-transparent">Profile Status</p>
            <p className="text-sm text-gray-400 bg-transparent">Complete your profile to appear in services and enable bookings.</p>
          </div>
          <Link to="/profile" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm">Complete Profile</Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full px-6 md:px-10 xl:px-16 mt-10 z-10">
        {/* Pending Prescriptions */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-michroma">Pending Prescriptions</h3>
            <FaClock className="text-yellow-400 text-2xl" />
          </div>
          <ul className="space-y-3">
            {pendingPrescriptions.map(item => (
              <li key={item.id} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="bg-transparent">
                  <p className="font-semibold bg-transparent">{item.patient}</p>
                  <p className="text-gray-400 text-sm bg-transparent">{item.notes}</p>
                </div>
                <span className="text-gray-300 text-sm bg-transparent">{item.appointmentAt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services & Charges */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-michroma">Services & Charges</h3>
            <FaNotesMedical className="text-blue-400 text-2xl" />
          </div>

          <div className="flex gap-3 mb-4">
            <input
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
              placeholder="Service name"
              value={newService.name}
              onChange={(e) => setNewService(s => ({ ...s, name: e.target.value }))}
            />
            <input
              className="w-36 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
              placeholder="Fee"
              inputMode="numeric"
              value={newService.fee}
              onChange={(e) => setNewService(s => ({ ...s, fee: e.target.value }))}
            />
            <button
              onClick={addService}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <FaPlus className="bg-transparent" />
              <span className="bg-transparent">Add</span>
            </button>
          </div>

          <ul className="space-y-3">
            {services.map(svc => (
              <li key={svc._id} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="bg-transparent flex flex-col">
                  <span className="bg-transparent font-medium">{svc.name}</span>
                  <span className="bg-transparent text-gray-400 text-sm flex items-center gap-1"><FaRupeeSign className="text-green-400" /> {svc.fee}</span>
                </div>
                <div className="bg-transparent flex items-center gap-2">
                  <button
                    onClick={() => openEdit(svc)}
                    className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* History */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-michroma">Recent History</h3>
            <FaCheckCircle className="text-green-400 text-2xl" />
          </div>
          <ul className="space-y-3">
            {history.map(h => (
              <li key={h.id} className="p-4 rounded-xl bg-black/30 border border-white/10 grid grid-cols-3 gap-4 text-sm hover:bg-white/5 transition-colors">
                <span className="bg-transparent">{h.patient}</span>
                <span className="bg-transparent">{h.service}</span>
                <span className="bg-transparent text-right text-gray-300">{h.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feedback */}
        <div className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-michroma">Patient Feedback</h3>
            <FaStar className="text-yellow-400 text-2xl" />
          </div>
          <ul className="space-y-3">
            {feedbacks.map(f => (
              <li key={f.id} className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors">
                <div className="bg-transparent">
                  <p className="font-semibold bg-transparent">{f.patient}</p>
                  <p className="text-gray-300 text-sm bg-transparent">{f.comment}</p>
                </div>
                <div className="flex items-center gap-1 bg-transparent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < f.rating ? 'text-yellow-400' : 'text-gray-600'} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Service Modal */}
      {editingServiceId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60" onClick={cancelEdit}></div>
          <div className="relative w-full max-w-lg bg-gray-950/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6">
            <h3 className="text-2xl font-michroma mb-4">Edit Service</h3>
            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-300">Service name</label>
              <input
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
                value={editForm.name}
                onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Service name"
              />
              <label className="text-sm text-gray-300 mt-2">Fee</label>
              <input
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
                value={editForm.fee}
                inputMode="numeric"
                onChange={(e) => setEditForm(f => ({ ...f, fee: e.target.value }))}
                placeholder="Fee"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={cancelEdit} className="px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={submitEdit} className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard