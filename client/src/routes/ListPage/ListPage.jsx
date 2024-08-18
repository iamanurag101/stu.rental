import React from 'react';
import './ListPage.scss';
import { listData } from '../../lib/dummyData';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

const ListPage = () => {

  const data = listData;
  return (
    <div className='listPage'>
        <div className="listContainer">
          <div className="wrapper">
            <div className="breadcrumbs">
              <Link to="/" className='text-links'>Home</Link>
              <FaAngleRight />
              <span className='current-page'>Catalogue</span>
            </div>        
            <Filter/>
            {data.map(item=>(
              <Card key={item.id} item={item}/>
            ))}
          </div>
        </div>
        <div className="mapContainer"></div>
    </div>
  )
}

export default ListPage