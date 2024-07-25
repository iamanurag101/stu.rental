import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Navbar from '../components/navbar';


const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayout