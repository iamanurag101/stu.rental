import React from 'react';
import StuRentalLogo from '../assets/logo/stu.rental.svg';

const Navbar = () => {
  return (
    <nav className='w-screen border-b-bright-gray border-b-2 flex items-center justify-between px-6 py-4'>
      <div>
        <img src={StuRentalLogo} alt="Stu.Rental" aria-label='Stu.Rental Logo' className='h-14'/>
      </div>
      <div className='flex items-center gap-x-2'>
        <div className='nav-links rounded-full'><a href='#' className='relative z-20 bg-transparent'>Home</a></div>
        <div className='nav-links rounded-full'><a href='#' className='relative z-20 bg-transparent'>Catalogue</a></div>
        <div className='nav-links rounded-full'><a href='#' className='relative z-20 bg-transparent'>User</a></div>
      </div>
    </nav>
  );
}

export default Navbar;
