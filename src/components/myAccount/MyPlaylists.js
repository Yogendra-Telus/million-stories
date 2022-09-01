import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import EditPlaylistModal from '../modal/EditPlaylistModal';
import ShareModal from '../modal/ShareModal';
import {
  getPlaylists,
  deletePlaylist,
  getPlaylistMedia,
  editPlaylist,
  resetPlaylistMedia,
} from '../../store/actions/MediaAction';
import ShareIcon from '../common/Icons/Plane';
import EditIcon from '../common/Icons/edit';
import { GET_USER_PLAYLIST } from '../../store/actions/ActionTypes';
import AppConfig from '../../config/AppConfig';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import trackEventAsync from '../../api/MixPanelApi';
import { EVENT_TYPE, MEDIA_TYPE } from '../../config/Constants';
import PlayIcon from '../common/Icons/Play2';
import { URLGenerator } from '../../utility/Helpers';

const MyPlaylists = props => {
  const [shareModal, setShareModal] = useState(false);
  const [playLink, setPlayLink] = useState(undefined);
  const [playlists, setPlaylists] = useState(undefined);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [playlist, setPlaylist] = useState(undefined);
  const [playlistMedia, setPlaylistMedia] = useState(undefined);
  const userId = getUserId();

  useEffect(() => {
    switch (props.type) {
      case GET_USER_PLAYLIST:
        setPlaylists(props.playlists);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playlists]);

  const handleDeletePlaylist = playlistId => {
    const { confirm } = Modal;
    toggleEditModal();
    showConfirm(confirm, playlistId);
  };

  const showConfirm = (confirm, playlistId) => {
    confirm({
      title: 'Are you sure to delete the playlist?',
      okText: 'Ok',
      onOk() {
        props.deletePlaylist(userId, playlistId);
        toggleEditModal();
      },
      onCancel() {
        toggleEditModal();
      },
    });
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const showEditModal = playlistItem => {
    setPlaylist(playlistItem);
    props.getPlaylistMedia(playlistItem.playlistId);
    setPlaylistMedia(props.playlistMedia);
    setEditModalVisible(true);
  };

  const playVideo = (url, media) => {
    MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
      title: media && media.title,
      id: media && media.id,
    });
    trackEventAsync(EVENT_TYPE.VIDEO_WATCH, media.id);
    props.resetMediaPlaylist();
    localStorage.setItem('redirectedFromPage', props.history.location.pathname + props.history.location.hash);
    props.history.push(url);
  };

  useEffect(() => {
    userId && props.getPlaylists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpenShareModal = () => {
    setPlayLink(undefined);
    setShareModal(!shareModal);
  };

  return (
    <Fragment>
      {playlists && playlists.length > 0
        ? playlists.map(playlistItem => {
            const linkToPlaylist = playlistItem.mediaIds[0]
              ? `${URLGenerator(
                  MEDIA_TYPE.VIDEO,
                  playlistItem.mediaIds[0].id,
                  playlistItem.mediaIds[0].seoUrl
                )}&playlist=${playlistItem.playlistId}`
              : '/Media?video=1';
            return (
              <div className="main_content_row" key={playlistItem.playlistId}>
                <div className="image-column playlist-img">
                  <div
                    className="image-wrapper"
                    role="button"
                    tabIndex="0"
                    style={{ backgroundImage: `url(${playlistItem.mediaThumbnail})` }}
                  >
                    <span>{playlistItem.mediaIds ? playlistItem.mediaIds.length : 0} Videos</span>
                    <button
                      className="btn dark-transparent-btn playall"
                      onClick={() => playVideo(linkToPlaylist, playlistItem && playlistItem.mediaIds[0])}
                      onKeyDown={() => playVideo(linkToPlaylist, playlistItem && playlistItem.mediaIds[0])}
                    >
                      {' '}
                      Play all
                      <PlayIcon iconWidth="20" iconHeight="16" iconfill="#F1F1F1" />
                    </button>
                  </div>
                </div>
                <div className="info-column playlist">
                  <div className="content_wrapper_fav">
                    <div
                      onClick={() => playVideo(linkToPlaylist, playlistItem && playlistItem.mediaIds[0])}
                      onKeyDown={() => playVideo(linkToPlaylist, playlistItem && playlistItem.mediaIds[0])}
                      role="button"
                      tabIndex="0"
                    >
                      <h4>{playlistItem.name}</h4>
                    </div>
                    <div>
                      <button
                        className="no-border-btn mr-20"
                        onClick={() => {
                          setPlayLink(`${AppConfig.WebUrl}${linkToPlaylist}`);
                          setPlaylist(playlistItem);
                          setShareModal(!shareModal);
                        }}
                      >
                        <ShareIcon iconfill="#fff" borderfill="#9f9f9f" iconWidth="28" />
                        Share
                      </button>
                      <button
                        className="no-border-btn"
                        onClick={() => {
                          showEditModal(playlistItem);
                        }}
                      >
                        <EditIcon iconfill="#9f9f9f" iconWidth="20" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : `No Playlists Found`}
      {isEditModalVisible && (
        <EditPlaylistModal
          playlist={playlist}
          playlistMedia={playlistMedia}
          handleDeletePlaylist={handleDeletePlaylist}
          handleEditPlaylist={props.editPlaylist}
          isEditModalVisible={isEditModalVisible}
          toggleEditModal={toggleEditModal}
          userId={userId}
          {...props}
        />
      )}
      {shareModal && (
        <ShareModal
          openShareModal={shareModal}
          toggleOpenShareModal={toggleOpenShareModal}
          playLink={playLink}
          playlist={playlist}
        />
      )}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    media: state.media.media,
    playlists: state.media.playlists,
    playlistMedia: state.media.playlistMedia,
    type: state.media.type,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaylists: userId => dispatch(getPlaylists(userId)),
    getPlaylistMedia: playlistId => dispatch(getPlaylistMedia(playlistId)),
    deletePlaylist: (userId, playlistId) => {
      dispatch(deletePlaylist(playlistId, userId));
    },
    editPlaylist: (userId, playlistId, playlistMediaData) => {
      dispatch(editPlaylist(userId, playlistId, playlistMediaData));
    },
    resetMediaPlaylist: () => dispatch(resetPlaylistMedia()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyPlaylists));
