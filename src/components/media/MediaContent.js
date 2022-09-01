/* eslint-disable react/no-danger */
import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import queryString from 'query-string';
import actionCreatorMedia from '../../store/actions/MediaAction';
import DiveDeeper from './DiveDeeper';
import * as Constants from '../../config/Constants';
import ShareModal from '../modal/ShareModal';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import ShareIcon from '../common/Icons/Share';
import LikeIcon from '../common/Icons/Like';
import BorderHeart from '../common/Icons/borderheart';
import SearchIcon from '../common/Icons/Search';
import trackEventAsync from '../../api/MixPanelApi';

const MediaContent = props => {
  props.setDisplay(' media-content-page');
  const getQueryParams = () => queryString.parse(props.location.search);
  const { video } = getQueryParams();
  const { currentPlayingMedia, favorites } = props.media;
  const [shareModal, setShareModal] = useState(false);
  const userId = localStorage.getItem(Constants.UserIdCaption);
  const { isAuth } = props.account;

  const toggleShareModal = () => {
    setShareModal(!shareModal);
  };

  const rawMarkupFun = data => {
    const rawMarkup = data;
    return { __html: rawMarkup };
  };

  const isFavorite = item => Boolean(favorites.filter(elem => elem.mediaId === item.id).length);

  const onAddToFavourite = () => {
    if (!isAuth) {
      props.openLoginModal();
      return;
    }

    if (!isFavorite(currentPlayingMedia)) {
      props.postAddToFavourite({ userId, mediaId: video }).then(
        () => message.success(Constants.addedToFavoritesCaption),
        () => message.error(`${Constants.errorCaption}`)
      );
    } else {
      props.postRemoveFromFavourite({ userId, mediaId: video }).then(
        () => message.success(Constants.removedFromFavoritesCaption),
        () => message.error(`${Constants.errorCaption}`)
      );
    }
  };

  useEffect(() => {
    props.getCurrentPlayingMedia(video).then(res => {
      if (
        res.mediaItem.mediaType === Constants.MEDIA_TYPE.VIDEO ||
        res.mediaItem.mediaType === Constants.MEDIA_TYPE.PODCAST_AUDIO
      ) {
        MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
          videoName: currentPlayingMedia.name,
        });
        trackEventAsync(Constants.EVENT_TYPE.VIDEO_WATCH, currentPlayingMedia.id);
        props.history.push(`/Media?video=${currentPlayingMedia.id}`);
      }
    });
    if (userId) props.getFavorites(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.account.isAuth && props.getFavorites(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, props, userId]);

  return (
    <div className="media-content-wrapper">
      {currentPlayingMedia && currentPlayingMedia.name && (
        <Fragment>
          <div className="media-content-banner">
            <h2>{currentPlayingMedia.name}</h2>
            <div className="button-container">
              {currentPlayingMedia.isSharingAllowed && (
                <button className="btn light-transparent-btn" onClick={toggleShareModal}>
                  <ShareIcon iconWidth="25" iconHeight="25" iconfill="#F1F1F1" />
                  Share
                </button>
              )}
              <button className="btn light-transparent-btn" onClick={onAddToFavourite}>
                {isFavorite(currentPlayingMedia) ? <BorderHeart iconfill="#fff" /> : <LikeIcon iconfill="#fff" />}
              </button>
            </div>
          </div>
          <section id="mediacontent">
            <div className="content-wrapper">
              {currentPlayingMedia.mediaType === Constants.MEDIA_TYPE.EMBEDDED_MEDIA ? (
                <div
                  className="image-container"
                  dangerouslySetInnerHTML={rawMarkupFun(currentPlayingMedia.embeddedCode)}
                />
              ) : (
                <img src={currentPlayingMedia && currentPlayingMedia.thumbnail} alt="" />
              )}
              <div className="media-discrption-wrapper">
                <h4>Description</h4>
                {currentPlayingMedia.description && (
                  <p className="media-discrption-sec">{currentPlayingMedia.description}</p>
                )}

                {currentPlayingMedia.tool && (
                  <Fragment>
                    <h4 className="dive-deep">
                      <SearchIcon iconWidth="28" iconHeight="28" iconfill="#ffffff" />
                      Dive Deeper
                    </h4>
                    <DiveDeeper
                      videoId={currentPlayingMedia.id}
                      currMediaTitle={currentPlayingMedia.name}
                      {...currentPlayingMedia}
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
      <ShareModal
        openShareModal={shareModal}
        toggleOpenShareModal={toggleShareModal}
        playLink={window.location.href}
        isMedia
        mediaDetails={{ id: video }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    media: state.media,
    account: state.account,
  };
}

export default connect(mapStateToProps, dispatch => bindActionCreators({ ...actionCreatorMedia }, dispatch))(
  withRouter(MediaContent)
);
