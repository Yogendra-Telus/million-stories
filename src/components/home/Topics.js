import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreator from '../../store/actions/TopicsActions';
import PlusIcon from '../common/Icons/Subscribe';
import AddedIcon from '../common/Icons/Added';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import RESPONSE_CODE from '../../config/ResponseCodes';

const Topics = props => {
  const { featuredTopics, userSubscriptions } = props.topics;
  let topicsTobeFeatured;
  if (isMobile && featuredTopics) {
    topicsTobeFeatured = featuredTopics.slice(0, 3);
  } else {
    topicsTobeFeatured = featuredTopics;
  }

  if (!featuredTopics) {
    props.getFeaturedTopics();
  }
  const { isAuth } = props.account;
  const userId = getUserId();

  const toggleSubscribeTopics = topicId => {
    if (isAuth) {
      if (!userSubscriptions.includes(topicId)) {
        props
          .subscribeTopic(userId, topicId)
          .then(() => {
            message.success(`${Constants.subscribedCaption}${Constants.ITEM_TYPE.TOPIC}`);
            return props.getUserSubscriptions(userId);
          })
          .catch(error => {
            if (error && error.response && error.response.data) {
              message.error(`${error.response.data.detail}`);
            } else {
              message.error(`${Constants.errorCaption}`);
            }
          });
      } else {
        props
          .unsubscribeTopic(userId, topicId)
          .then(() => {
            message.success(`${Constants.unsubscribedCaption}${Constants.ITEM_TYPE.TOPIC}`);
            return props.getUserSubscriptions(userId);
          })
          .catch(error => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.status === RESPONSE_CODE.NOTFOUND
            ) {
              message.error('Subscription Not Found');
            } else {
              message.error(`${Constants.errorCaption}`);
            }
          });
      }
    } else {
      props.openLoginModal();
    }
    MixPanel.track(MixPanelEvents.SUBSCRIBE_REGISTRATION_REQUEST, {
      topicId,
    });
  };

  useEffect(() => {
    isAuth && props.getUserSubscriptions(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="topics-section">
      <div className="topics-wrapper">
        {topicsTobeFeatured &&
          topicsTobeFeatured.length > 0 &&
          topicsTobeFeatured.map(topic => {
            const isTopicSubscribed = userSubscriptions && userSubscriptions.includes(topic.id);
            return (
              <div className="wrap" key={topic.id}>
                <div className="topic-container">
                  <h3>{topic.topicName}</h3>
                  <div style={{ backgroundImage: `url(${topic.topicThumbnail})` }} className="image-wrapper">
                    <Link
                      style={{ width: '100%', height: '100%', display: 'block' }}
                      to={`/topics/${topic.seoUrl}/${topic.id}`}
                    />
                  </div>
                  <div className="video-actions-container">
                    <Link className="videos-count" to={`/topics/${topic.seoUrl}/${topic.id}`}>
                      {!topic.videoCount && `No Episode`}
                      {topic.videoCount > 1 && `${topic.videoCount} Episodes`}
                      {topic.videoCount === 1 && `${topic.videoCount} Episode`}
                    </Link>
                    <button
                      className={isTopicSubscribed ? 'subscribe-topic subscribed' : 'subscribe-topic'}
                      onClick={() => toggleSubscribeTopics(topic.id)}
                    >
                      {!isTopicSubscribed && <PlusIcon iconfill="#10a2dd" iconHeight="22" iconWidth="22" />}
                      {isTopicSubscribed && <AddedIcon iconfill="#10a1de" iconHeight="18" iconWidth="18" />}
                      {isTopicSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="text-center xs-margin-bottom">
        <button
          className="btn green-btn transparent-btn"
          onClick={() => props.setMenuState(true, Constants.MENU_TYPE.TOPICS)}
        >
          {`${Constants.seeMoreCaption} ${Constants.MENU_TYPE.TOPICS}`}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  topics: state.topics,
  account: state.account,
});

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreator, dispatch))(Topics);
