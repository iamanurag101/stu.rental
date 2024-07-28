import React from 'react';
import StuRentalLogo from '../assets/logo/stu.rental.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const linkClass = ({ isActive }) =>
    isActive ? 'font-body font-medium py-2 px-5 border border-sr-black rounded-full text-sr-white bg-sr-black' : 'nav-links font-body font-medium py-2 px-5 border border-sr-black rounded-full text-sr-black';

  return (
    <nav className='w-screen border-b-sr-black border-b flex items-center justify-between px-6 py-4'>
      <div><img src={StuRentalLogo} alt="Stu.Rental" aria-label='Stu.Rental Logo' className='h-14'/></div>
      <div className='flex items-center gap-x-2'>
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/Catalogue" className={linkClass}>Catalogue</NavLink>
        <NavLink to="/User" className={linkClass}>User</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
