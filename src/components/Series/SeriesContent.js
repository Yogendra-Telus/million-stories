import React from 'react';
import { message } from 'antd';
import ProductItem from '../ModelComponents/ProductItem';
import AppConfig from '../../config/AppConfig';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { URLGenerator } from '../../utility/Helpers';

const SeriesContent = ({
  seriesId,
  videoCount,
  videos,
  userPlaylists,
  userFavorites,
  isAuth,
  addMediaToPlaylist,
  createPlaylist,
  removeMediaFromPlaylist,
  ...props
}) => {
  const userId = localStorage.getItem(Constants.UserIdCaption);
  const currentItemsOnPage = props.pageNumber * AppConfig.DefaultItemCount;

  const addToPlaylist = (playlistId, curMedia) => {
    if (!isAuth) {
      props.openLoginModal();
      return;
    }

    const playlist = userPlaylists.find(elem => elem.playlistId === playlistId);
    if (
      !playlist ||
      (playlist && !playlist.mediaIds) ||
      (playlist && playlist.mediaIds && !playlist.mediaIds.filter(elem => elem.id === curMedia).length)
    ) {
      addMediaToPlaylist(playlistId, curMedia).then(
        () => message.success(Constants.addedToPlaylistCaption),
        () => message.error(`${Constants.errorCaption}`)
      );
    } else {
      message.info(Constants.alreadyAddedToPlaylistCaption);
    }
  };

  const onAddPlaylist = (name, curMedia) => {
    if (!isAuth) {
      props.openLoginModal();
      return;
    }
    const playlistItem = userPlaylists.find(elem => elem.name === name);
    if (playlistItem) {
      message.info(Constants.alreadyPlaylistExistCaption);
      return;
    }
    createPlaylist(userId, name).then(
      res => {
        message.success(Constants.playlistCreated);
        return addToPlaylist(res.response.data.id, curMedia);
      },
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  const removeFromPlaylist = (playlistId, curMedia) => {
    if (!isAuth) {
      props.openLoginModal();
      return;
    }

    removeMediaFromPlaylist(playlistId, curMedia).then(
      () => message.success(Constants.removedFromPlaylistCaption),
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  const toggleMedia = (mediaId, mediaName) => {
    MixPanel.track(MixPanelEvents.ADD_TO_FAVORITES, {
      name: mediaName,
    });

    if (!isAuth) {
      props.openLoginModal();
      return;
    }

    if (userFavorites.filter(elem => elem.mediaId === mediaId).length) {
      props.removeFromFavorites(userId, mediaId).then(
        () => message.success(Constants.removedFromFavoritesCaption),
        () => message.error(`${Constants.errorCaption}`)
      );
    } else {
      props.addMediaToFavorites(userId, mediaId).then(
        () => message.success(Constants.addedToFavoritesCaption),
        () => message.error(`${Constants.errorCaption}`)
      );
    }
  };

  const loadMore = () => {
    props.setPage(props.pageNumber + 1);
  };

  const isFavorite = item => Boolean(userFavorites.filter(elem => elem.mediaId === item.id).length);
  return (
    videos && (
      <div className="series-content">
        <div className="series-video-wrapper card-container custom-card-container">
          {videos.map(video => (
            <ProductItem
              key={video.id}
              item={video}
              isFavorite={userFavorites && isFavorite(video)}
              onAddToFavorites={toggleMedia}
              playlists={userPlaylists}
              onAddToPlaylist={addToPlaylist}
              onRemoveFromPlaylist={removeFromPlaylist}
              onAddPlaylist={onAddPlaylist}
              openLoginModal={props.openLoginModal}
              isAuth={isAuth}
              href={`${URLGenerator(
                video.mediaTypeId === Constants.EMBEDDED_MEDIA_TYPE_ID
                  ? Constants.MEDIA_TYPE.EMBEDDED_MEDIA
                  : Constants.MEDIA_TYPE.VIDEO,
                video.id,
                video.seoUrl
              )}&serie=${seriesId}`}
              {...video}
            />
          ))}
        </div>
        {videoCount > currentItemsOnPage && (
          <div className="load-more-wrapper">
            <button className="btn dark-transparent-btn" onClick={loadMore}>
              <i className="fa fa-repeat" />
              {`${Constants.loadMoreCaption} ${Constants.MEDIA_TYPE.VIDEO}s`}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default SeriesContent;
