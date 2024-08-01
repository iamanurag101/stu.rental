import React from 'react';
import Hero from '../components/Hero.jsx';
import CatalogueItems from '../components/CatalogueItems.jsx';

const HomePage = () => {
  return (
    <>
        <Hero />
        <CatalogueItems isHome={true}/>
    </>
  )
}

export default HomePage