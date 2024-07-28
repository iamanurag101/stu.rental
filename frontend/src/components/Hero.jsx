import React from 'react';
import HeroImage from '../assets/images/HeroImage.jpg';

const Hero = () => {
  return (
    <div className="px-6 py-4 lg:px-8">
      <section
        className="relative w-full h-36 lg:h-[500px] bg-cover bg-center rounded-md lg:rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center bg-transparent">
            <h1 className="text-5xl font-body font-bold text-white bg-inherit">Find your perfect place</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
