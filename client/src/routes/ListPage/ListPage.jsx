import React, { Suspense, useState, useEffect } from 'react';
import './ListPage.scss';
import { useLoaderData, Await } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

const ITEMS_PER_PAGE = 3;

function ListPage({ isHome }) {
  const data = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  if (!data || !data.postResponse) {
    return <p>Error: Data not found.</p>;
  }

  const paginate = (items, currentPage) => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

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
              {(postResponse) => {
                const posts = postResponse.data;

                useEffect(() => {
                  if (!isHome) {
                    setTotalPages(Math.ceil(posts.length / ITEMS_PER_PAGE));
                  }
                }, [posts]);

                const paginatedPosts = isHome
                  ? posts.slice(0, 3)
                  : paginate(posts, currentPage);

                return posts.length > 0 ? (
                  <>
                    <div className={`cardsContainer ${isHome ? 'homeCardsContainer' : ''}`}>
                      {paginatedPosts.map((item) => (
                        <Card key={item.id} item={item} isHome={isHome} />
                      ))}
                    </div>

                    {!isHome && totalPages > 1 && (
                      <div className="pagination">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p>No listings found matching your search criteria.</p>
                );
              }}
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
            {(postResponse) => {
              const posts = postResponse.data;
              const paginatedPosts = isHome
                ? posts.slice(0, 3)
                : paginate(posts, currentPage);

              return <Map items={paginatedPosts} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
