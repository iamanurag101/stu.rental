import React, { Suspense } from 'react';
import './ListPage.scss';
import { useLoaderData, Await } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

function ListPage({ isHome }) {
  const data = useLoaderData();

  if (!data || !data.postResponse) {
    return <p>Error: Data not found.</p>;
  }

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
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => (
                <div className={`cardsContainer ${isHome ? 'homeCardsContainer' : ''}`}>
                  {postResponse.data.slice(0, isHome ? 3 : postResponse.data.length).map(item => (
                    <Card key={item.id} item={item} isHome={isHome} />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading map data!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
