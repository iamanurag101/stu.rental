import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { FaBars, FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const[open,setOpen] = useState(false);

  const {currentUser} = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <a href='/'>
          <img src="/src/logo/stu.rental.svg"></img>
        </a>
        <div className='links'>
          <a href='/' className='text-links'>Home</a>
          <a href='/list' className='text-links'>Catalogue</a>
          <a href='/about' className='text-links'>About Us</a>
        </div>   
      </div>
      <div className="right">
        {currentUser ? 
        (<div className='user'>
          <img src={currentUser.avatar || './avatar.jpg'} />
          <span>{currentUser.username}</span>
          <Link to="/profile" className='nav-links'>Profile</Link>
        </div>) : 
        (<>
          <a href='/login' className='text-links'>Sign In</a>
          <a href='/register' className='nav-links'>Sign Up</a>
        </>)}
        <div className="menu-icon" onClick={() => setOpen((prev) => !prev)}>
          {open ? <FaX style={{color: "#f8f9f0",}}/> : <FaBars/>}
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href='/'>Home</a>
          <a href='/list'>Catalogue</a>
          <a href='/about'>About Us</a>
          <a href='/login'>Sign In</a>
          <a href='/register'>Sign Up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar