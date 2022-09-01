/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import actionCreator from '../../store/actions/AccountActions';
import EditAccountInfoModal from '../modal/EditAccountInfoModal';
import MyPlaylists from './MyPlaylists';
import MyFavorites from './MyFavorites';
import MySubscriptions from './MySubscriptions';
import MyWatchHistory from './MyWatchHistory';
import AddIcon from '../common/Icons/PlaylistNew';
import LikeIcon from '../common/Icons/LikeNew';
import accountPlus from '../common/Icons/accountPlus.png';
import accountPlusDark from '../common/Icons/accountPlusDark.png';
import watchHistoryDark from '../common/Icons/watchHistoryDark.png';
import watchHistory from '../common/Icons/watchHistory.png';
import * as AuthService from '../../utility/AuthService';
import * as Constants from '../../config/Constants';

const AccountTab = props => {
  props.setTheme('dark');
  props.setTitle('My Account');
  props.setDisplay(' my-account');
  const [activeTab, setActiveTab] = useState('playlists');
  useEffect(() => {
    switch (props.location.hash) {
      default:
        setActiveTab(props.location.hash.slice(1));
        break;
    }
  }, [props.location.hash]);
  if (!props.loggedIn) {
    props.history.push('/');
  }
  const { userInfo } = props;
  if (AuthService.isAuthenticated()) {
    const userId = AuthService.getUserId();

    if (!userInfo || !userInfo.firstName) {
      props.getUserInfo(userId);
    }

    const toggle = tab => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };

    const handleEditAccountInfo = submitValues => {
      const { firstName, lastName, email } = submitValues;
      const { id, userTypeId, phone } = userInfo;
      if (id) {
        const newUserInfo = { id, userTypeId, phone, firstName, lastName, email };
        props.editUserInfo(newUserInfo).then(() => {
          message.success(Constants.accountUpdatedCaption);
        });
      }
    };

    const handleChangePassword = submitValues => {
      const { id } = userInfo;
      if (id) {
        const { oldPassword, newPassword } = submitValues;
        props.changePassword({ oldPassword, newPassword }).then(
          () => {
            message.success(Constants.passwordChangedCaption);
            toggle(activeTab);
          },
          () => message.error(`${Constants.errorCaption}`)
        );
      }
    };
    return (
      <div>
        <section className="my_account_wrapper">
          <div className="account-container">
            <div className="row">
              <div className="col-md-3 account_detail">
                <h5>My Account</h5>
                <div className="account-info-container">
                  <div>
                    {userInfo && (
                      <>
                        <h3>
                          {userInfo.firstName} {userInfo.lastName}
                        </h3>
                        <p>{userInfo.email}</p>
                      </>
                    )}
                  </div>
                  <EditAccountInfoModal
                    {...userInfo}
                    handleEditAccountInfo={handleEditAccountInfo}
                    handleChangePassword={handleChangePassword}
                  >
                    Edit Info
                  </EditAccountInfoModal>
                </div>
              </div>
              <div className="col-md-9 account_content">
                <div className="account_tab">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 'playlists' })}
                        onClick={() => {
                          toggle('playlists');
                          props.history.replace('#playlists');
                        }}
                      >
                        <span className="first_span">
                          <AddIcon iconfill="#9f9f9f" iconWidth="24" iconHeight="24" />
                          My Playlists
                        </span>
                        <span className="inactive-icon">
                          <AddIcon iconfill="#303030" iconWidth="24" iconHeight="24" />
                        </span>
                        <span>My Playlists</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 'favorites' })}
                        onClick={() => {
                          toggle('favorites');
                          props.history.replace('#favorites');
                        }}
                      >
                        <span className="first_span">
                          <LikeIcon iconfill="#9f9f9f" iconWidth="24" iconHeight="24" />
                          My Favorites
                        </span>
                        <span className="inactive-icon">
                          <LikeIcon iconfill="#303030" iconWidth="24" iconHeight="24" />
                        </span>
                        <span>My Favorites</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 'subscriptions' })}
                        onClick={() => {
                          toggle('subscriptions');
                          props.history.replace('#subscriptions');
                        }}
                      >
                        <span className="first_span">
                          <img alt="My Subscriptions" title="My Subscriptions" src={accountPlus} />
                          My Subscriptions
                        </span>
                        <span className="inactive-icon">
                          <img alt="My Subscriptions" title="My Subscriptions" src={accountPlusDark} />
                        </span>
                        <span>My Subscriptions</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 'history' })}
                        onClick={() => {
                          toggle('history');
                          props.history.replace('#history');
                        }}
                      >
                        <span className="first_span">
                          <img alt="Watch History" title="Watch History" src={watchHistory} />
                          Watch History
                        </span>
                        <span className="inactive-icon">
                          <img alt="Watch History" title="Watch History" src={watchHistoryDark} />
                        </span>
                        <span>Watch History</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div className="scrollable-container">
                    <TabContent activeTab={activeTab} className="scrollable">
                      <TabPane tabId="playlists">
                        <div className="card-body">
                          <h3 className="heading_tab">My Playlists</h3>
                          <MyPlaylists userId={userId} />
                        </div>
                      </TabPane>
                      <TabPane tabId="favorites">
                        <div className="card-body">
                          <h3 className="heading_tab">My Favorites</h3>
                          <MyFavorites userId={userId} />
                        </div>
                      </TabPane>
                      <TabPane tabId="subscriptions">
                        <div className="card-body">
                          <MySubscriptions />
                        </div>
                      </TabPane>
                      <TabPane tabId="history">
                        <div className="card-body">
                          <h3 className="heading_tab">Watch History</h3>
                          <MyWatchHistory />
                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return null;
};
export default withRouter(
  connect(
    state => state.account,
    dispatch => bindActionCreators(actionCreator, dispatch)
  )(AccountTab)
);
