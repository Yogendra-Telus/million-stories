import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '../common/Icons/Close';
import actionCreatorAccount from '../../store/actions/AccountActions';
import * as Constants from '../../config/Constants';

const SubscriptionItem = ({ userId, item, unsubscribeSeries, unsubscribeTopic }) => (
  <div className="heading">
    <h5>
      {item.name} <span>{item.type.toUpperCase()}</span>
    </h5>
    <Button
      onClick={() =>
        item.type.toUpperCase() === 'TOPIC' ? unsubscribeTopic(userId, item.id) : unsubscribeSeries(userId, item.id)
      }
    >
      <CloseIcon iconfill="#707070" iconWidth="15" iconHeight="15" />
    </Button>
  </div>
);

const MySubscriptions = props => {
  const { userInfo, subscriptions } = props.account;
  const unsubscribeUserSeries = (userId, seriesId) => {
    props.removeSubscription(userId, Constants.ITEM_TYPE.SERIES, seriesId).then(() => {
      message.success(`${Constants.unsubscribedCaption} Series`);
      return props.getSubscriptions(userId);
    });
  };
  const unsubscribeUserTopic = (userId, topicId) => {
    props.removeSubscription(userId, Constants.ITEM_TYPE.TOPIC, topicId).then(() => {
      message.success(`${Constants.unsubscribedCaption} topic`);
      return props.getSubscriptions(userId);
    });
  };
  useEffect(() => {
    props.getSubscriptions(userInfo.id || userInfo.userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (subscriptions && subscriptions.items && subscriptions.items.length === 0) {
    return (
      <div className="subscription_tab">
        <p>You do not have any subscriptions.</p>
      </div>
    );
  }
  return (
    <div className="subscription_tab">
      <p>You are subscribed to the following Topics and Series. New videos will be sent to your email.</p>
      {subscriptions &&
        subscriptions.items &&
        subscriptions.items.length &&
        subscriptions.items.map(subscription => (
          <SubscriptionItem
            userId={userInfo.id || userInfo.userid}
            item={subscription}
            unsubscribeSeries={unsubscribeUserSeries}
            unsubscribeTopic={unsubscribeUserTopic}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreatorAccount, dispatch)
)(MySubscriptions);
