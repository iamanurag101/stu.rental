import React, { Suspense } from 'react';
import './ListPage.scss';
import { useLoaderData, Await, useLocation } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import Map from '../../components/Map/Map';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';

const ITEMS_PER_PAGE = 3;

function ListPage({ isHome }) {
  const data = useLoaderData();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  if (!data || !data.postResponse) {
    return <p>Error: Data not found.</p>;
  }

  // const paginate = (items, currentPage) => {
  //   const start = (currentPage - 1) * ITEMS_PER_PAGE;
  //   return items.slice(start, start + ITEMS_PER_PAGE);
  // };

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
                const paginatedPosts = postResponse.data.posts;
                const totalPosts = postResponse.data.totalPosts;
                const totalPages = Math.ceil(totalPosts / 3);

                // for the homepage, we still only want to show the first 3 items.
                // the backend sends 3, so we can just use the data directly.
                const postsToShow = isHome ? paginatedPosts.slice(0, 3) : paginatedPosts;

                return postsToShow.length > 0 ? (
                  <>
                    <div className={`cardsContainer ${isHome ? 'homeCardsContainer' : ''}`}>
                      {postsToShow.map((item) => (
                        <Card key={item.id} item={item} isHome={isHome} />
                      ))}
                    </div>

                    {!isHome && totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
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
              const postsForMap = postResponse.data.posts;
              return <Map items={postsForMap} />;
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages }){
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const createPageUrl = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageNumber);
    return `/list?${newParams.toString()}`;
  };

  return (
    <div className="pagination">
      <Link
        to={createPageUrl(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <button disabled={currentPage === 1}>Prev</button>
      </Link>
      <span>Page {currentPage} of {totalPages}</span>
      <Link
        to={createPageUrl(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        <button disabled={currentPage === totalPages}>Next</button>
      </Link>
    </div>
  );
}

export default ListPage;
