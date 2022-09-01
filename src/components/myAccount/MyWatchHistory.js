/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import CloseIcon from '../common/Icons/Close';
import actionCreatorAccount from '../../store/actions/AccountActions';
import { EVENT_TYPE, removerFromHistory } from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import trackEventAsync from '../../api/MixPanelApi';

const WatchListItem = ({ props, userId, media, url, removeWatchHistory }) => {
  const playMedia = () => {
    MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
      title: media && media.mediaName,
      id: media && media.mediaId,
    });
    trackEventAsync(EVENT_TYPE.VIDEO_WATCH, media.mediaId);
    localStorage.setItem('redirectedFromPage', props.history.location.pathname + props.history.location.hash);
    props.history.push(url);
  };

  return (
    <div className="main_content_row">
      <div className="image-column">
        <div className="image-wrapper" style={{ backgroundImage: `url(${media.thumbnail})` }} onClick={playMedia} />
      </div>
      <div className="info-column">
        <div className="content_wrapper_fav">
          <h4>{media.mediatitle}</h4>
          <span className="watchHistory_span" onClick={() => removeWatchHistory(userId, media.mediaid)}>
            <CloseIcon iconfill="#707070" iconWidth="15" iconHeight="15" />
          </span>
        </div>
      </div>
    </div>
  );
};

const MyWatchHistory = props => {
  const { userInfo, watchHistory } = props.account;
  const removeWatchHistory = (userId, mediaId) => {
    props.removeWatchHistory(mediaId).then(() => {
      message.success(removerFromHistory);
      return props.getWatchHistory(userId);
    });
  };

  useEffect(() => {
    props.getWatchHistory(userInfo.id || userInfo.userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (_.isEmpty(watchHistory) || (watchHistory.items && watchHistory.items.length === 0)) {
    return (
      <div className="subscription_tab">
        <p>You do not have any watch history.</p>
      </div>
    );
  }
  return (
    <div className="subscription_tab">
      {watchHistory &&
        watchHistory.length &&
        watchHistory.map(watchHistoryItem => (
          <WatchListItem
            props={props}
            userId={userInfo.id || userInfo.userid}
            media={watchHistoryItem}
            removeWatchHistory={removeWatchHistory}
            key={watchHistoryItem.id}
            url={`/media/${watchHistoryItem.seoUrl}?video=${watchHistoryItem.mediaid}`}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps, dispatch => bindActionCreators({ ...actionCreatorAccount }, dispatch))(
  withRouter(MyWatchHistory)
);
