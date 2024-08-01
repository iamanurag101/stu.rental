import React from 'react';
import CatalogueItem from './CatalogueItem';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CatalogueItems = ({ isHome = false }) => {
    return (
        <section className="px-4 py-6 rounded-xl">
            <div className="container-xl lg:container m-auto">
                <div className='flex justify-between items-baseline'>
                    <h2 className="text-5xl font-body font-medium text-sr-black mb-6 px-4">
                        {isHome ? 'Popular Accommodation' : 'Catalogue Items'}
                    </h2>
                    <Link to='/Catalogue' className='text-links flex items-center'>
                        {isHome ? <span className='mr-2 font-body font-semibold hidden md:inline-block'>View All Listings</span> : ""}
                        {isHome ? <FaArrowRight className="-rotate-45" /> : ""}
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                    <CatalogueItem />
                </div>
            </div>
        </section>
    )
}

export default CatalogueItems;
