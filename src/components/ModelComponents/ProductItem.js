/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, Fragment } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import AddToPlaylistModal from '../modal/AddToPlaylistModal';
import CreatePlaylistModal from '../modal/CreatePlaylistModal';
import ShareModal from '../modal/ShareModal';
import PlayIcon from '../common/Icons/Play2';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import AddIcon from '../common/Icons/PlaylistNew';
import LikeIcon from '../common/Icons/LikeNew';
import ShareIcon from '../common/Icons/ShareNew';
import * as Constants from '../../config/Constants';
import trackEventAsync from '../../api/MixPanelApi';
import TruncatedLabel from '../common/TruncatedLabel';
import AppConfig from '../../config/AppConfig';

const ProductItem = ({
  isFavorite,
  item,
  playlists,
  onAddToPlaylist,
  onAddPlaylist,
  onAddToFavorites,
  openLoginModal,
  isAddToPlayList,
  isAuth,
  href,
  isSharingAllowed,
  ...props
}) => {
  const [addToPlaylistModal, setAddToPlaylistModal] = useState(false);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const [mediaShared, setMediaShared] = useState(false);
  const toggleCreatePlaylistModal = () => {
    setAddToPlaylistModal(!addToPlaylistModal);
    setCreatePlaylistModal(!createPlaylistModal);
  };
  const toggleAddPlaylistModal = () => {
    if (!isAuth) {
      openLoginModal();
      return;
    }
    setAddToPlaylistModal(!addToPlaylistModal);
  };

  const playVideo = () => {
    localStorage.setItem('redirectedFromPage', props.history.location.pathname);
    const { upcomingVideos } = props;
    if (href && href.length && href[0] !== '/') {
      props.history.push(`/${href}`, {
        upcomingVideos,
      });
    } else {
      props.history.push(href, {
        upcomingVideos,
      });
    }
    MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
      id: item.id,
      title: item.title,
    });
    trackEventAsync(Constants.EVENT_TYPE.VIDEO_WATCH, item.id);
  };

  const toggleShareModal = () => {
    setShareModal(!shareModal);
  };
  return (
    <div className="col-md-4 card-wrapper ">
      <div className="card-item">
        <div
          style={{ display: 'block', backgroundImage: `url(${item.featuredImage || item.thumbnail})` }}
          className="video-image-wrapper"
          onClick={playVideo}
          onKeyDown={playVideo}
          role="button"
          tabIndex="0"
        >
          <PlayIcon iconfill="#F1F1F1" iconWidth="20" />
        </div>
        <h3 className="heading mt-10" onClick={playVideo}>
          {item.title || item.name}
        </h3>
        {item.description && <TruncatedLabel content={item.description} />}
        <div className="button-wrapper">
          {_.isNil(isAddToPlayList) && Constants.EMBEDDED_MEDIA_TYPE_ID !== item.mediaTypeId && (
            <button className="action-btn-icon add-icon icon-btn" onClick={toggleAddPlaylistModal}>
              {addedToPlaylist ? (
                <Fragment>
                  <AddIcon iconfill="#a7a7a7" iconWidth="25" iconHeight="25" />
                  <span className="add-playlist-icon icon-panel">Add to Playlist</span>
                </Fragment>
              ) : (
                <Fragment>
                  <AddIcon iconfill="#a7a7a7" iconWidth="25" iconHeight="25" />
                  <span className="add-playlist-icon icon-panel">Add to Playlist</span>
                </Fragment>
              )}
            </button>
          )}
          <button
            className=" action-btn-icon like-icon icon-btn"
            onClick={() => onAddToFavorites(item.id, item.title || item.name)}
            tabIndex="0"
          >
            {isFavorite ? (
              <Fragment>
                <LikeIcon iconfill="#ff3cff" iconWidth="23" iconHeight="23" />
                <span className="add-like-icon icon-panel">like</span>
              </Fragment>
            ) : (
              <Fragment>
                <LikeIcon iconfill="#a7a7a7" iconWidth="23" iconHeight="23" />
                <span className="add-like-icon icon-panel">like</span>
              </Fragment>
            )}
          </button>
          {isSharingAllowed && (
            <button className="action-btn-icon share-icon icon-btn" onClick={toggleShareModal} tabIndex="0">
              {mediaShared ? (
                <Fragment>
                  <ShareIcon iconfill="#a7a7a7" iconWidth="20" iconHeight="20" />
                </Fragment>
              ) : (
                <Fragment>
                  <ShareIcon iconfill="#a7a7a7" iconWidth="20" iconHeight="20" />
                  <span className="add-share-icon icon-panel">share</span>
                </Fragment>
              )}
            </button>
          )}
        </div>
      </div>

      <AddToPlaylistModal
        addToPlaylistModal={addToPlaylistModal}
        playlists={playlists}
        onAddToPlaylist={playlistId => {
          onAddToPlaylist(playlistId, item.id);
          setAddedToPlaylist(true);
        }}
        toggleAddPlaylistModal={toggleAddPlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
      />
      <CreatePlaylistModal
        createPlaylistModal={createPlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
        onAddPlaylist={playlist => {
          onAddPlaylist(playlist, item.id);
          setAddedToPlaylist(true);
        }}
      />
      <ShareModal
        mediaDetails={item}
        openShareModal={shareModal}
        toggleOpenShareModal={toggleShareModal}
        setMediaShared={setMediaShared}
        isMedia
        playLink={`${AppConfig.BaseUrl}${href}`}
      />
    </div>
  );
};

export default withRouter(ProductItem);
