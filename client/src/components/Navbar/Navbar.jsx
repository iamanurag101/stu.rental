import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { FaBars, FaX } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <a href='/'>
          <img src="/stu.rental.svg" alt="Logo" />
        </a>
        <div className='links'>
          <a href='/' className='text-links'>Home</a>
          <a href='/list' className='text-links'>Catalogue</a>
          <a href='/about' className='text-links'>About Us</a>
        </div>   
      </div>
      <div className="right">
        {currentUser ? (
          <div className='user'>
            <img src={currentUser.avatar || './avatar.jpg'} alt="User Avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className='nav-links'>Profile</Link>
          </div>
        ) : (
          <>
            <Link to='/login' className='text-links'>Sign In</Link>
            <Link to='/register' className='nav-links'>Sign Up</Link>
          </>
        )}
        <div className="menu-icon" onClick={() => setOpen(prev => !prev)}>
          {open ? <FaX style={{ color: "#f8f9f0" }} /> : <FaBars />}
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to='/' className='links' onClick={() => setOpen(prev => !prev)}>Home</Link>
          <Link to='/list' className='links' onClick={() => setOpen(prev => !prev)}>Catalogue</Link>
          <Link to='/about' className='links' onClick={() => setOpen(prev => !prev)}>About Us</Link>
          {currentUser ? (
            <>
              <Link to='/profile' className='links'>Profile</Link>
            </>
          ) : (
            <>
              <Link to='/login' className='links'>Sign In</Link>
              <Link to='/register' className='links'>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
