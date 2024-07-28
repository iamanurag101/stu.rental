import React from 'react';
import HeroImage from '../assets/images/HeroImage.jpg';

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center bg-transparent">
          <h1 className="text-5xl font-body font-bold bg-transparent text-white">Find your perfect place</h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;