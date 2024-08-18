import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.scss';

const layout = () => {
  return (
    <div className='layout'>
        <Navbar/>
        <div className='content'>
            <Outlet/>
        </div>
    </div>
  )
}

export default layout