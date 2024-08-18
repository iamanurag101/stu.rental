import React from 'react';
import './ListPage.scss';
import { listData } from '../../lib/dummyData';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';
import Map from '../../components/Map/Map';

const ListPage = ({ isHome }) => {
  const displayedData = isHome ? listData.slice(0, 3) : listData;

  return (
    <div className={`listPage ${isHome ? 'homePageStyle' : 'regularPageStyle'}`}>
      <div className="listContainer">
        <div className="wrapper">
          <div className="breadcrumbs">
            <Link to="/" className='text-links'>Home</Link>
            <FaAngleRight />
            <span className='current-page'>{isHome ? 'Home Catalogue' : 'Catalogue'}</span>
          </div>
          {!isHome && <Filter />}
          <div className={`cardsContainer ${isHome ? 'homeCardsContainer' : ''}`}>
            {displayedData.map(item => (
              <Card key={item.id} item={item} isHome={isHome} />
            ))}
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <Map items={listData}/>
      </div>
    </div>
  );
}

export default ListPage;
