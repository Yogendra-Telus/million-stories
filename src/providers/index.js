import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import AuthContext from './AuthProvider';
import MixPanel from '../components/common/MixPanel/MixPanel';
import * as CookieService from '../utility/CookieService';
import AppConfig from '../config/AppConfig';
import * as Constants from '../config/Constants';
import * as AuthService from '../utility/AuthService';
import menuActions from '../store/actions/MenuActions';
import seriesActions from '../store/actions/SeriesActions';

const actionCreator = { ...menuActions, ...seriesActions };

const AuthProvider = props => {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLogin] = useState(AuthService.isAuthenticated());

  const toggleUser = () => {
    const userId = AuthService.getUserId();
    if (!userId) {
      return false;
    }

    MixPanel.register({
      loginState: false,
    });
    MixPanel.cookie.clear();
    setLogin(false);
    if (CookieService.getItem(AppConfig.RememberMeCookie) !== undefined) {
      CookieService.setItem(AppConfig.RememberMeCookieLoggedOut, true, AppConfig.RememberMeExpiry);
    }
    props.resetUserData();
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
    message.success(Constants.logoutSuccessfulCaption);
    return true;
  };

  return <AuthContext.Provider value={toggleUser}>{props.children}</AuthContext.Provider>;
};

export default connect(
  state => state.menu,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(AuthProvider);
