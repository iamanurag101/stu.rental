import React, { useState } from 'react';
import './Navbar.scss';
import { FaBars, FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[open,setOpen] = useState(false);

  const user = true;

  return (
    <nav>
      <div className="left">
        <a href='/'>
          <img src="/src/logo/stu.rental.svg"></img>
        </a>
        <div className='links'>
          <a href='/' className='text-links'>Home</a>
          <a href='/' className='text-links'>About</a>
          <a href='/' className='text-links'>Contact</a>
          <a href='/' className='text-links'>Agents</a>
        </div>   
      </div>
      <div className="right">
        {user ? 
        (<div className='user'>
          <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <span>John Doe</span>
          <Link to="/profile" className='nav-links'>Profile</Link>
        </div>) : 
        (<>
          <a href='/' className='text-links'>Sign In</a>
          <a href='/' className='nav-links'>Sign Up</a>
        </>)}
        <div className="menu-icon" onClick={() => setOpen((prev) => !prev)}>
          {open ? <FaX style={{color: "#f8f9f0",}}/> : <FaBars/>}
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
          <a href='/'>Agents</a>
          <a href='/'>Sign In</a>
          <a href='/'>Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar