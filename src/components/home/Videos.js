/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, Fragment } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import actionCreator from '../../store/actions/VideosActions';
import { URLGenerator } from '../../utility/Helpers';
import PlayIcon from '../common/Icons/Play2';
import BottomArrow from '../common/Icons/ScrollDown';
import AddToPlaylistModal from '../modal/AddToPlaylistModal';
import * as actionCreatorMedia from '../../store/actions/MediaAction';
import CreatePlaylistModal from '../modal/CreatePlaylistModal';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import trackEventAsync from '../../api/MixPanelApi';

const Videos = props => {
  const [selectedVideo, setSelectedVideo] = useState(undefined);
  const [openAddToPlaylistModal, setOpenAddToPlaylistModal] = useState(false);
  const [openCreatePlaylistModal, setOpenCreatelistModal] = useState(false);
  const { videos } = props.videos;
  const { account, playlists } = props;
  const userId = getUserId();
  useEffect(() => {
    props.account.isAuth && props.getFavorites(userId);
    props.account.isAuth && props.getPlaylists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.isAuth]);

  const toggleAddToPlaylistModal = () => {
    if (!props.account.isAuth) {
      props.openLoginModal();
      return;
    }
    setOpenAddToPlaylistModal(!openAddToPlaylistModal);
  };

  const toggleCreatePlaylistModal = () => {
    setOpenAddToPlaylistModal(!openAddToPlaylistModal);
    setOpenCreatelistModal(!openCreatePlaylistModal);
  };

  const onAddPlaylist = playlist => {
    const playlistItem = props.playlists.find(elem => elem.name === playlist);
    if (playlistItem) return message.info(Constants.alreadyPlaylistExistCaption);
    return props.postAddPlaylist({ userId, name: playlist }, selectedVideo.id).then(
      () => {
        MixPanel.track(MixPanelEvents.PLAYLIST_REGISTRATION_REQUEST, {
          videoName: selectedVideo.videoTitle,
        });
        message.success(`Playlist created and ${Constants.addedToPlaylistCaption}`);
      },
      () => message.error(Constants.errorCaption)
    );
  };

  const onAddToPlaylist = playlistId => {
    const playlist = props.playlists.filter(elem => elem.playlistId === playlistId);
    if (
      playlist[0] &&
      playlist[0].mediaIds &&
      Boolean(playlist[0].mediaIds.filter(elem => elem.id === selectedVideo.id).length)
    ) {
      message.info(Constants.alreadyAddedToPlaylistCaption);
    } else
      props.postAddToPlaylist({ playlistId, mediaId: selectedVideo.id }).then(
        () => {
          message.success(Constants.addedToPlaylistCaption);
        },
        () => message.error(Constants.errorCaption)
      );
  };

  if (!videos) {
    props.getFeaturedVideos();
  }
  if (videos && videos.length && !selectedVideo) {
    setSelectedVideo(videos[0]);
  }

  const winWidth = window.innerWidth;
  if ((isMobile || winWidth <= 768) && videos) {
    return (
      <div>
        <div className="scroll-icon-wrapper">
          <button
            className="scroll-icon"
            onClick={e => {
              props.handleScroll(e);
            }}
          >
            <BottomArrow iconfill="#F1F1F1" iconWidth="47" iconHeight="27" />
          </button>
        </div>

        <div className="video-wrapper">
          {videos.length > 0 && (
            <Carousel showArrows useKeyboardArrows showIndicators={true} showStatus={false} showThumbs={false}>
              {videos.map(video => (
                <div key={video.id} className="video-info-container">
                  <div
                    className="video-info"
                    style={{
                      backgroundImage: `url(${video.featuredImage ? video.featuredImage : video.thumbnail})`,
                    }}
                  >
                    <div className="slide-gradient" />
                    {[Constants.BANNER_MEDIA_TYPE_ID].includes(video.mediaTypeId) ? (
                      <Fragment>
                        {(video.series || video.topics) && video.series ? (
                          <p className="video-series-name">{video.series}</p>
                        ) : (
                            <p className="video-series-name">{video.topic}</p>
                          )}
                        <a href={video.url} target="_blank">
                          <h3>
                            {video.title}
                            <PlayIcon iconfill="#ffffff" iconWidth="22" iconHeight="22" />
                          </h3>
                        </a>
                        {video.description && <p>{video.description}</p>}
                      </Fragment>
                    ) : (
                        <Fragment>
                          {(video.series || video.topics) && video.series ? (
                            <p className="video-series-name">{video.series}</p>
                          ) : (
                              <p className="video-series-name">{video.topic}</p>
                            )}
                          <h3
                            onClick={() => {
                              MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
                                id: video.id,
                                title: video.title,
                              });
                              trackEventAsync(Constants.EVENT_TYPE.VIDEO_WATCH, video.id);
                              localStorage.setItem('redirectedFromPage', props.history.location.pathname);

                              props.history.push(URLGenerator(Constants.MEDIA_TYPE.VIDEO, video.id, video.seoUrl));
                            }}
                          >
                            {video.title}
                            <PlayIcon iconfill="#ffffff" iconWidth="22" iconHeight="22" />
                          </h3>
                          {video.description && <p>{video.description}</p>}
                        </Fragment>
                      )}
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <AddToPlaylistModal
          toggleAddPlaylistModal={toggleAddToPlaylistModal}
          addToPlaylistModal={openAddToPlaylistModal}
          toggleCreatePlaylistModal={toggleCreatePlaylistModal}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
        />
        <CreatePlaylistModal
          createPlaylistModal={openCreatePlaylistModal}
          toggleCreatePlaylistModal={toggleCreatePlaylistModal}
          onAddPlaylist={onAddPlaylist}
        />
      </div>
    );
  }
  return (
    <div
      className="video-section"
      style={{
        backgroundImage: `url(${
          selectedVideo && selectedVideo.featuredImage
            ? selectedVideo.featuredImage
            : selectedVideo && selectedVideo.thumbnail
          })`,
      }}
      onClick={() => {
        if (selectedVideo.mediaTypeId !== Constants.BANNER_MEDIA_TYPE_ID) {
          props.history.push(URLGenerator(Constants.MEDIA_TYPE.VIDEO, selectedVideo.id, selectedVideo.seoUrl));
        }
      }}
    >
      <button
        className="scroll-icon"
        onClick={e => {
          props.handleScroll(e);
        }}
      >
        <BottomArrow iconfill="#F1F1F1" iconWidth="47" iconHeight="27" />
      </button>
      <div className="video-wrapper">
        <div className="inner-video-wrapper">
          {videos &&
            videos.length > 0 &&
            videos.map(video => (
              <div
                className={
                  selectedVideo && video.id === selectedVideo.id
                    ? 'video-info-container active'
                    : 'video-info-container'
                }
                key={video.id}
                onMouseOver={() => {
                  setSelectedVideo(video);
                }}
                onFocus={() => {
                  setSelectedVideo(video);
                }}
              >
                <div className="video-info">
                  {(video.series || video.topics) && video.series ? (
                    <p className="video-series-name">{video.series}</p>
                  ) : (
                      <p className="video-series-name">{video.topic}</p>
                    )}

                  {video.mediaTypeId === Constants.BANNER_MEDIA_TYPE_ID ? (
                    <a href={video.url} target="_blank">
                      <h3>
                        {video.title}
                        <PlayIcon iconfill="#F1F1F1" iconWidth="22" iconHeight="22" />
                      </h3>
                      {video.description && <p>{video.description}</p>}
                    </a>
                  ) : (
                      <Fragment>
                        <h3
                          onClick={() => {
                            MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
                              id: selectedVideo.id,
                              title: selectedVideo.title,
                            });
                            trackEventAsync(Constants.EVENT_TYPE.VIDEO_WATCH, selectedVideo.id);
                            localStorage.setItem('redirectedFromPage', props.history.location.pathname);
                            props.history.push(
                              URLGenerator(Constants.MEDIA_TYPE.VIDEO, selectedVideo.id, selectedVideo.seoUrl)
                            );
                          }}
                        >
                          {video.title}
                          <PlayIcon iconfill="#F1F1F1" iconWidth="22" iconHeight="22" />
                        </h3>
                        {video.description && <p>{video.description}</p>}
                      </Fragment>
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <AddToPlaylistModal
        toggleAddPlaylistModal={toggleAddToPlaylistModal}
        addToPlaylistModal={openAddToPlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
        playlists={props.playlists}
        onAddToPlaylist={onAddToPlaylist}
      />
      <CreatePlaylistModal
        createPlaylistModal={openCreatePlaylistModal}
        toggleCreatePlaylistModal={toggleCreatePlaylistModal}
        onAddPlaylist={onAddPlaylist}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  videos: state.videos,
  account: state.account,
  playlists: state.media.playlists,
  favorites: state.media.favorites,
  type: state.media.type,
});

export default connect(mapStateToProps, dispatch =>
  bindActionCreators({ ...actionCreator, ...actionCreatorMedia }, dispatch)
)(withRouter(Videos));
