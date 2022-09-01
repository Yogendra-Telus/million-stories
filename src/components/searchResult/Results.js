import React from 'react';
import ProductItem from '../ModelComponents/ProductItem';
import { URLGenerator } from '../../utility/Helpers';
import { MEDIA_TYPE, EMBEDDED_MEDIA_TYPE_ID } from '../../config/Constants';

const Results = ({
  addToFavorites,
  addToPlaylist,
  searchData,
  searchTerm,
  totalCount,
  openLoginModal,
  userFavorites,
  isAuth,
  playlists,
  onAddPlaylist,
}) => (
  <div className="result">
    <>
      <h3 className="search-heading">
        <div>{`${totalCount} results for "${searchTerm}"`}</div>
      </h3>
      <div className="row card-container">
        {searchData.map(item => (
          <ProductItem
            key={item.id}
            item={item}
            playlists={playlists}
            onAddToPlaylist={addToPlaylist}
            onAddPlaylist={onAddPlaylist}
            onAddToFavorites={addToFavorites}
            openLoginModal={openLoginModal}
            isAuth={isAuth}
            isFavorite={userFavorites && userFavorites.find(fav => Number(fav.mediaId) === Number(item.id))}
            href={URLGenerator(
              item.mediaTypeId === EMBEDDED_MEDIA_TYPE_ID ? MEDIA_TYPE.EMBEDDED_MEDIA : MEDIA_TYPE.VIDEO,
              item.id,
              item.seoUrl
            )}
            isSharingAllowed={item.isSharingAllowed}
            upcomingVideos={searchData}
          />
        ))}
      </div>
    </>
  </div>
);

export default Results;
