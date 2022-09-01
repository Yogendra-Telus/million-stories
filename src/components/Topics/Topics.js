import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { bindActionCreators } from 'redux';
// import { isMobile } from 'react-device-detect';
import TopicsHeader from './TopicsHeader';
import TopicsContent from './TopicsContent';
import actionCreatorTopics from '../../store/actions/TopicsActions';
import actionCreatorAccount from '../../store/actions/AccountActions';
import actionCreatorMedia from '../../store/actions/MediaAction';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import AppConfig from '../../config/AppConfig';
import RESPONSE_CODE from '../../config/ResponseCodes';
// import BottomArrow from '../common/Icons/ScrollDown';

const Topics = props => {
  const [page, setPage] = useState(AppConfig.DefaultPage);
  const { topicId } = props.match.params;
  const { currentTopic, userSubscriptions } = props.topics;
  const { isAuth } = props.account;
  const { favorites } = props.media;
  const userId = getUserId();

  useEffect(() => {
    props.getTopicMediaDetails(topicId, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    isAuth && props.getUserSubscriptions(userId);
    isAuth && props.getTopicPlaylists(userId);
    isAuth && props.getFavorites(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleSubscribeTopics = () => {
    if (!isAuth) {
      props.openLoginModal();
      MixPanel.track(MixPanelEvents.SUBSCRIBE_REQUEST, {
        topicName: currentTopic.title,
      });
      return;
    }
    if (!props.topics.userSubscriptions.includes(Number(topicId))) {
      props
        .subscribeTopic(userId, Number(topicId))
        .then(() => message.success(`${Constants.subscribedCaption} topic`))
        .catch(error => {
          if (error && error.response && error.response.data) {
            message.error(`${error.response.data.detail}`);
          } else {
            message.error(`${Constants.errorCaption}`);
          }
        });
    } else {
      props
        .unsubscribeTopic(userId, Number(topicId))
        .then(() => message.success(`${Constants.unsubscribedCaption} topic`))
        .catch(error => {
          if (error && error.response && error.response.data && error.response.data.status === RESPONSE_CODE.NOTFOUND) {
            message.error('Subscription Not Found');
          } else {
            message.error(`${Constants.errorCaption}`);
          }
        });
    }
  };

  const toggleAddPlaylist = (name, mediaId) => {
    const { playlists } = props.topics;
    if (!isAuth) {
      props.openLoginModal();
      return;
    }
    const playlistItem = playlists.find(elem => elem.name === name);
    if (playlistItem) {
      message.info(Constants.alreadyPlaylistExistCaption);
      return;
    }
    props
      .createTopicsPlaylist(userId, name)
      .then(res => {
        message.success(Constants.playlistCreated);
        toggleAddToPlaylist(res.response.data.id, mediaId);
      })
      .catch(error => {
        if (error && error.response && error.response.data.detail) {
          message.error(`Error, ${error.response.data.detail}s`);
        } else {
          message.error(`${Constants.errorCaption}`);
        }
      });
  };

  const toggleAddToPlaylist = (playlistId, mediaId) => {
    const { playlists } = props.topics;
    if (!isAuth) {
      props.openLoginModal();
      return;
    }

    const playlist = playlists.find(elem => elem.playlistId === playlistId);
    if (
      !playlist ||
      (playlist && !playlist.mediaIds) ||
      (playlist && playlist.mediaIds && !playlist.mediaIds.filter(elem => elem.id === mediaId).length)
    ) {
      props
        .addMediaToTopicsPlaylist(playlistId, mediaId)
        .then(() => message.success(Constants.addedToPlaylistCaption))
        .catch(error => {
          if (error && error.response && error.response.data.detail) {
            message.error(`Error, ${error.response.data.detail}`);
          } else {
            message.error(`${Constants.errorCaption}`);
          }
        });
    } else {
      message.info(Constants.alreadyAddedToPlaylistCaption);
    }
  };

  const toggleAddToFavorites = (mediaId, mediaName) => {
    MixPanel.track(MixPanelEvents.ADD_TO_FAVORITES, {
      name: mediaName,
    });
    if (!isAuth) {
      props.openLoginModal();
      return;
    }
    if (favorites && !favorites.filter(elem => elem.mediaId === mediaId).length) {
      props
        .postAddToFavourite({ userId: Number(userId), mediaId })
        .then(
          () => message.success(Constants.addedToFavoritesCaption),
          () => message.error(`${Constants.errorCaption}`)
        );
    } else {
      props
        .postRemoveFromFavourite({ userId: Number(userId), mediaId })
        .then(
          () => message.success(Constants.removedFromFavoritesCaption),
          () => message.error(`${Constants.errorCaption}`)
        );
    }
  };

  return (
    <>
      <div className="topic-page">
        <TopicsHeader
          topicId={topicId}
          topicTitle={currentTopic && currentTopic.title}
          isUserSubscribed={userSubscriptions && userSubscriptions.includes(Number(topicId))}
          desc={(currentTopic && currentTopic.description) || ''}
          featuredImage={currentTopic && currentTopic.logo}
          onSubscribeTopics={toggleSubscribeTopics}
        />
        {/* {isMobile && (
          <div className="scroll-icon">
            <BottomArrow iconfill="#F1F1F1" iconWidth="40" />
          </div>
        )} */}
        <TopicsContent
          loadMore={loadMore}
          isLoadMore={currentTopic && currentTopic.videoCount > page * currentTopic.videos.length}
          videos={currentTopic && currentTopic.videos}
          playlists={props.topics.playlists}
          onAddToPlaylist={toggleAddToPlaylist}
          onAddPlaylist={toggleAddPlaylist}
          onAddToFavorites={toggleAddToFavorites}
          favorites={favorites}
          openLoginModal={props.openLoginModal}
          isAuth={isAuth}
          topicId={topicId}
        />
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    topics: state.topics,
    account: state.account,
    media: state.media,
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({ ...actionCreatorTopics, ...actionCreatorAccount, ...actionCreatorMedia }, dispatch)
)(Topics);
