import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import StuRentalLogo from '../assets/logo/stu.rental.svg';
import { FaBars, FaX } from 'react-icons/fa6';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) => {
    const baseStyle = `nav-links font-body font-medium py-2 px-5 border rounded-full text-center my-2 ${isOpen ? 'w-[80%]' : ''}`;
    const activeStyle = 'border-sr-black bg-sr-black text-sr-white';
    const inactiveStyle = 'border-sr-black text-sr-black bg-transparent';
  
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };  

  return (
    <nav className='w-full flex items-center justify-between px-6 lg:px-8 py-4 bg-sr-white relative z-10'>
      <div className='flex items-center justify-between w-full lg:w-auto'>
        <img src={StuRentalLogo} alt="Stu.Rental" aria-label='Stu.Rental Logo' className='h-14' />
        <button className='lg:hidden text-sr-black' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaX className='h-5 w-5'/> : <FaBars className='h-5 w-5'/>}
        </button>
      </div>
      <div
        className={`lg:flex items-center gap-x-2 lg:gap-x-4 ${
          isOpen ? 'fixed inset-0 bg-sr-white flex flex-col items-center justify-center z-20' : 'hidden'
        }`}
      >
        {isOpen && (
          <button className='fixed top-6 right-4 text-sr-black lg:hidden' onClick={() => setIsOpen(false)}>
            <FaX className='h-5 w-5' />
          </button>
        )}
        <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/Catalogue" className={linkClass} onClick={() => setIsOpen(false)}>
          Catalogue
        </NavLink>
        <NavLink to="/User" className={linkClass} onClick={() => setIsOpen(false)}>
          User
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
