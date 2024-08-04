import React from 'react';
import CatalogueItems from '../components/CatalogueItems';
import { FaAngleRight } from 'react-icons/fa6';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CataloguePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='flex gap-2 items-center px-6'>
        <Link to="/" className='font-body hover:font-semibold'>Home</Link>
        <FaAngleRight />
        <span className='font-body font-semibold'>Catalogue</span>
      </div>
      <CatalogueItems />
    </>
  )
}

export default CataloguePage