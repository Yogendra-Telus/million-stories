import React, { Fragment } from 'react';

export default ({
  onAddToFavorite,
  toggleAddPlaylistModal,
  toggleShareModal,
  isFavorite,
  likeClass,
  onRemoveFromFavourite,
  isSharingAllowed,
}) => (
  <Fragment>
    <span className="jw-button-color">
      <i
        key={likeClass}
        className={likeClass}
        onClick={() => (isFavorite ? onRemoveFromFavourite() : onAddToFavorite())}
        onKeyDown={() => (isFavorite ? onRemoveFromFavourite() : onAddToFavorite())}
        role="button"
        tabIndex="0"
      />
    </span>
    {isSharingAllowed && (
      <span
        className={isSharingAllowed ? 'jw-button-color' : 'stop-sharing jw-button-color'}
        onClick={isSharingAllowed && toggleShareModal}
        role="button"
        tabIndex="0"
        onKeyDown={isSharingAllowed && toggleShareModal}
      >
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50.62 51"
          width={30}
          height={30}
        >
          <path
            // fill="#fff"
            d="M44.44,6.12,33,40.68,25.56,25.83,25,24.69l-1.13-.59L10.25,17,44.44,6.12M50.62,0,0,16.1,22,27.61,33.79,51,50.62,0Z"
          />
          <rect
            // fill="#fff"
            x="19.77"
            y="13.02"
            width="30.53"
            height="3.96"
            transform="translate(-0.69 28.28) rotate(-43.56)"
          />
        </svg>
        <span className="icon-text">share</span>
      </span>
    )}
    <span
      className="jw-button-color"
      onClick={toggleAddPlaylistModal}
      role="button"
      tabIndex="0"
      onKeyDown={toggleAddPlaylistModal}
    >
      {/* <Add iconWidth="15" iconHeight="15" iconfill="#ffffff" /> */}
      <i className="fa fa-plus" />
      <span className="icon-text">Add to playlist</span>
    </span>
  </Fragment>
);
