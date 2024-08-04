import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const ClientErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 overflow-hidden bg-sr-white text-sr-black font-body">
      <div>
        <h1 className="text-xl md:text-2xl font-light mb-2">Error 404</h1>
        <h2 className="text-3xl md:text-6xl font-semibold mb-8">Unable to Find Your Perfect Place :&#40;</h2>
        <p className="max-w-lg mb-6">
          <span className='mr-2'>Travel far enough, you meet yourself.</span> &#126; David Mitchell 
        </p>
        <Link to="/" className="text-links text-lg font-medium inline-flex items-center">
          <span className='mr-2'>Return to homepage</span>
          <FaArrowRight className="-rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default ClientErrorPage;
