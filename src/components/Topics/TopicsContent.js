import React from 'react';
import ProductItem from '../ModelComponents/ProductItem';
import { URLGenerator } from '../../utility/Helpers';
import { MEDIA_TYPE, EMBEDDED_MEDIA_TYPE_ID } from '../../config/Constants';

const TopicsContent = ({
  loadMore,
  isLoadMore,
  videos,
  playlists = [],
  onAddToPlaylist,
  onAddPlaylist,
  onAddToFavorites,
  openLoginModal,
  topicId,
  favorites,
  isAuth,
}) => (
  <div className="topics-content">
    <div className="topics-wrapper card-container custom-card-container">
      {videos &&
        videos.map(item => (
          <ProductItem
            item={item}
            key={item.id}
            onAddToPlaylist={onAddToPlaylist}
            onAddPlaylist={onAddPlaylist}
            onAddToFavorites={onAddToFavorites}
            playlists={playlists}
            isFavorite={favorites && favorites.filter(elem => elem.mediaId === item.id).length}
            openLoginModal={openLoginModal}
            isAuth={isAuth}
            href={`${URLGenerator(
              item.mediaTypeId === EMBEDDED_MEDIA_TYPE_ID ? MEDIA_TYPE.EMBEDDED_MEDIA : MEDIA_TYPE.VIDEO,
              item.id,
              item.seoUrl
            )}&topic=${topicId}`}
            {...item}
          />
        ))}
    </div>
    {isLoadMore && (
      <div className="load-more-wrapper">
        <button className="load-more-btn btn dark-transparent-btn small-btn" onClick={loadMore}>
          <i className="fa fa-repeat" />
          Load more videos
        </button>
      </div>
    )}
  </div>
);

export default TopicsContent;
