import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import './Layout.scss';
import { AuthContext } from '../../Context/AuthContext';

const Layout = () => {
  return (
    <div className='layout'>
        <Navbar/>
        <div className='content'>
            <Outlet/>
        </div>
    </div>
  )
}

const RequireAuth = () => {

  const {currentUser} = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login"/>
  ) : (
    currentUser && <div className='layout'>
        <Navbar/>
        <div className='content'>
            <Outlet/>
        </div>
    </div>
  )
}

export { Layout, RequireAuth };