import React from 'react';
import HeroImage from '../assets/images/HeroImage.jpg';

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-body font-bold">Find your perfect place</h1>
      </div>
    </section>
  )
}

export default Hero;
