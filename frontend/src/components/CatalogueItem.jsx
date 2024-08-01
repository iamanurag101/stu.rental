import React from 'react';
import { Link } from 'react-router-dom';
import tempImg from '../assets/images/Temp1.jpg'
import { FaMapPin, FaCheck, FaDoorOpen, FaStairs, FaExpand } from "react-icons/fa6";

const CatalogueItem = () => {
  return (
    <div className='bg-transparent rounded-xl relative'>
      <div className='p-4'>
        <img src={tempImg} alt="Room Image" className='rounded-lg mb-2' />
        <div className="flex items-baseline mb-1">
          <span className="text-3xl font-body font-semibold">&#8377;4200</span>
          <span className="text-base ml-1 font-body font-light">month</span>
        </div>
        <div className='flex items-baseline gap-2 mb-2'>
          <FaMapPin />
          <span className='text-xl font-body font-semibold'>14, LB Block</span>
        </div>
        <div className='mb-2'>
          <div className='inline-flex items-center px-3 py-1 rounded-full gap-1 align-top bg-sr-green'>
            <FaCheck style={{color: "#4ec869",}} />
            <span className='font-body font-medium text-sr-text-green'>Available</span>
          </div>
        </div>
        <div className="flex space-x-4 font-body text-sr-bright-gray mb-2">
          <div className="flex items-center space-x-1">
            <FaDoorOpen />
            <span>3 rooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaStairs />
            <span>G+7</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaExpand />
            <span>81 ft<sup>2</sup></span>
          </div>
        </div>
        <Link to="/Catalogue" className='nav-links w-full font-body font-medium py-2 px-5 border border-sr-black rounded-full text-sr-black text-center'>
            See Details
        </Link>
      </div>
    </div>
  )
}

export default CatalogueItem

