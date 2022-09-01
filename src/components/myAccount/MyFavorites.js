/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreator from '../../store/actions/MediaAction';
import CloseIcon from '../common/Icons/Close';
import { POST_REMOVE_FROM_FAVORITES, GET_FAVORITES } from '../../store/actionTypes/MediaActionTypes';
import { EVENT_TYPE, removedFromFavoritesCaption } from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import trackEventAsync from '../../api/MixPanelApi';

const MyFavorites = props => {
  const { userId, type } = props;
  const [favorites, setFavorites] = useState(undefined);

  const removeFavorite = mediaId => {
    props.postRemoveFromFavourite({ userId: Number(userId), mediaId }).then(() => {
      message.success(removedFromFavoritesCaption);
    });
  };

  if (!favorites) {
    props.getFavorites(userId);
  }

  const playMedia = (url, media) => {
    MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
      title: media && media.mediaName,
      id: media && media.mediaId,
    });
    trackEventAsync(EVENT_TYPE.VIDEO_WATCH, media.mediaId);
    localStorage.setItem('redirectedFromPage', props.history.location.pathname + props.history.location.hash);
    props.history.push(url);
  };

  useEffect(() => {
    switch (type) {
      case POST_REMOVE_FROM_FAVORITES:
      case GET_FAVORITES:
        setFavorites(props.favorites);
        break;
      default:
        break;
    }
  }, [props.favorites, type]);

  return favorites && favorites.length
    ? favorites.map(media => {
        const linkToMedia = `/media/${media.seoUrl}?video=${media.mediaId}`;
        return (
          <div className="main_content_row" key={media.favoriteId}>
            <div className="image-column">
              <div
                className="image-wrapper"
                style={{ backgroundImage: `url(${media.thumbNail})` }}
                onClick={() => playMedia(linkToMedia, media)}
              />
            </div>
            <div className="info-column">
              <div className="content_wrapper_fav">
                <h4>{media.mediaName}</h4>
                <span
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => removeFavorite(media.mediaId)}
                  onClick={() => removeFavorite(media.mediaId)}
                >
                  <CloseIcon iconfill="#707070" iconWidth="15" iconHeight="15" />
                </span>
              </div>
            </div>
          </div>
        );
      })
    : `You do not have any favorites.`;
};

export default connect(
  state => state.media,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(withRouter(MyFavorites));
