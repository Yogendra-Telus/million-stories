import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import ShareModal from '../../modal/ShareModal';
import AddToPlaylistModal from '../../modal/AddToPlaylistModal';
import CreatePlaylistModal from '../../modal/CreatePlaylistModal';
import {
  getPlaylists,
  postAddToPlaylist,
  postAddPlaylist,
  getFavorites,
  postAddToFavourite,
  postRemoveFromFavourite,
} from '../../../store/actions/MediaAction';
import CustomControlButtons from './CustomControlButtons';
import actionCreator from '../../../store/actions/AccountActions';
import * as Constants from '../../../config/Constants';

function CustomControls({ activeVideo, goToLogin, isAuth, ...props }) {
  const [shareModal, setShareModal] = useState(false);
  const [addToPlaylistModal, setAddToPlaylistModal] = useState(false);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const playerEl = useRef(null);
  const userId = localStorage.getItem(Constants.UserIdCaption);

  const findJWPlayer = mutations => {
    mutations.forEach(mutation => {
      const element = document.getElementsByClassName('jwplayer')[0];
      if (mutation) playerEl.current = element;
    });
  };

  const jwPlayerObserver = new MutationObserver(findJWPlayer);

  useEffect(() => {
    jwPlayerObserver.observe(document.getElementsByClassName('jwplayer')[0], {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVideo]);

  const toggleAddPlaylistModal = () => {
    if (!isAuth) {
      goToLogin(playerEl.current);
      return;
    }
    setAddToPlaylistModal(!addToPlaylistModal);
  };

  const toggleCreatePlaylistModal = () => {
    setAddToPlaylistModal(!addToPlaylistModal);
    setCreatePlaylistModal(!createPlaylistModal);
  };

  const toggleShareModal = () => {
    setShareModal(!shareModal);
  };

  const onAddPlaylist = playlist => {
    const playlistItem = props.playlists.find(elem => elem.name === playlist);
    if (playlistItem) return message.info(Constants.alreadyPlaylistExistCaption);
    return props.postAddPlaylist({ userId, name: playlist }, activeVideo.id).then(
      () => message.success(`${Constants.playlistCreated} and ${Constants.addedToPlaylistCaption}`),
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  const onAddToPlaylist = playlistId => {
    const playlist = props.playlists.filter(elem => elem.playlistId === playlistId);
    if (
      playlist[0] &&
      playlist[0].mediaIds &&
      Boolean(playlist[0].mediaIds.filter(elem => elem.id === activeVideo.id).length)
    ) {
      message.info(Constants.alreadyAddedToPlaylistCaption);
    } else
      props.postAddToPlaylist({ playlistId, mediaId: activeVideo.id }).then(
        () => message.success(Constants.addedToPlaylistCaption),
        () => message.error(Constants.errorCaption)
      );
  };

  const onAddToFavorite = () => {
    if (!isAuth) {
      goToLogin(playerEl.current);
      return;
    }
    props.postAddToFavourite({ userId: Number(userId), mediaId: activeVideo.id }).then(
      () => message.success(Constants.addedToFavoritesCaption),
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  const onRemoveFromFavourite = () => {
    if (!isAuth) {
      goToLogin(playerEl.current);
      return;
    }
    props.postRemoveFromFavourite({ userId: Number(userId), mediaId: activeVideo.id }).then(
      () => message.success(Constants.removedFromFavoritesCaption),
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  useEffect(() => {
    if (isAuth) {
      props.getFavorites(userId);
      props.getPlaylists(userId);
      props.getWatchHistory(userId);
      props.postWatchHistory(activeVideo.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userInfo]);

  const isFavorite = Boolean(props.favorites && props.favorites.find(elem => elem.mediaId === activeVideo.id));
  return (
    <div className="icons">
      <CustomControlButtons
        onAddToFavorite={onAddToFavorite}
        onRemoveFromFavourite={onRemoveFromFavourite}
        toggleAddPlaylistModal={toggleAddPlaylistModal}
        toggleShareModal={toggleShareModal}
        isFavorite={isFavorite}
        likeClass={isFavorite ? 'fa fa-heart blue' : 'fa fa-heart'}
        isSharingAllowed={props.isSharingAllowed}
      />
      <ShareModal
        playLink={window.location.href}
        openShareModal={shareModal}
        toggleOpenShareModal={toggleShareModal}
        getContainer={() => playerEl.current}
        isMedia
        mediaDetails={activeVideo}
        {...props}
      />
      <AddToPlaylistModal
        addToPlaylistModal={addToPlaylistModal}
        playlists={props.playlists}
        onAddToPlaylist={onAddToPlaylist}
        getContainer={() => playerEl.current}
        toggleAddPlaylistModal={toggleAddPlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
      />
      <CreatePlaylistModal
        createPlaylistModal={createPlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
        getContainer={() => playerEl.current}
        onAddPlaylist={onAddPlaylist}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  playlists: state.media.playlists,
  userInfo: state.account.userInfo,
  isAuth: state.account.isAuth,
  watchHistory: state.account.watchHistory,
  favorites: state.media.favorites,
});

const mapDispatchToProps = dispatch => ({
  getPlaylists: userId => dispatch(getPlaylists(userId)),
  postAddToPlaylist: data => dispatch(postAddToPlaylist(data)),
  postAddPlaylist: (id, playlist) => dispatch(postAddPlaylist(id, playlist)),
  postAddToFavourite: data => dispatch(postAddToFavourite(data)),
  postRemoveFromFavourite: data => dispatch(postRemoveFromFavourite(data)),
  getFavorites: userId => dispatch(getFavorites(userId)),
  getWatchHistory: userId => dispatch(actionCreator.getWatchHistory(userId)),
  postWatchHistory: mediaId => dispatch(actionCreator.postWatchHistory(mediaId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomControls);
