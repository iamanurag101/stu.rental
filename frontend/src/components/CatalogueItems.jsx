import React from 'react';
import CatalogueItem from './CatalogueItem';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CatalogueItems = ({ isHome = false }) => {
    const itemsToDisplay = isHome ? 3 : 9;

    return (
        <section className="px-4 py-6 rounded-xl">
            <div className="container-xl lg:container m-auto">
                <div className='flex justify-between items-baseline'>
                    <h2 className="text-3xl md:text-5xl font-body font-medium text-sr-black mb-6 px-4">
                        {isHome ? 'Popular Accommodation' : 'Catalogue Items'}
                    </h2>
                    {isHome && (
                        <Link to='/Catalogue' className='text-links flex items-center'>
                            <span className='mr-2 font-body font-semibold hidden md:inline-block'>View All Listings</span>
                            <FaArrowRight className="-rotate-45" />
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {Array.from({ length: itemsToDisplay }, (_, index) => (
                        <CatalogueItem key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalogueItems;
