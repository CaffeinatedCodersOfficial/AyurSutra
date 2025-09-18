import React, { useContext } from 'react'
import {Routes, Route, useLocation} from "react-router-dom"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import PatientDashboard from './pages/PatientDashboard';
import { AppContext } from './context/AppContext';
import DoctorDashboard from './pages/DoctorDashboard';
import Services from './pages/Services';
import DoctorServices from './pages/DoctorServices';
import Profile from './pages/Profile';
import PrescriptionDetail from './pages/PrescriptionDetail';

const App = () => {
  const location = useLocation();
  const {userData} = useContext(AppContext);
  
  const hideNavbarRoutes = ["/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer className="bg-transparent" />
     {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={userData?.role==="Patient" ? <PatientDashboard/> : <DoctorDashboard/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/services/doctor/:doctorId' element={<DoctorServices/>}/>
        <Route path='/prescription/:id' element={<PrescriptionDetail/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App
