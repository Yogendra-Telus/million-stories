import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'; // do not delete
import './assets/scss/app-styles.scss';
import Home from './components/home/Home';
import Series from './components/Series';
import Topics from './components/Topics';
import SearchResults from './components/searchResult/SearchResults';
import Media from './components/media/Media';
import Policy from './components/policy/Policy';
import BecomePartner from './components/partners/BecomePartner';
import Partners from './components/partners/Partners';
import MediaContent from './components/media/MediaContent';
import AccountTab from './components/myAccount/AccountTab';
import actionCreator from './store/actions/AccountActions';
import MixPanel from './components/common/MixPanel/MixPanel';
import * as CookieService from './utility/CookieService';
import AppConfig from './config/AppConfig';
import MixPanelEvents from './components/common/MixPanel/MixPanelEvents';
import MasterComponent from './components/master/Master';
import { getUserId } from './utility/AuthService';
import SharedPlaylist from './components/home/SharedPlaylist';
import AuthProvider from './providers';
import HeaderProvider from './providers/HeaderProvider/HeaderProvider';
import About from './components/about/About';

const App = ({ ...props }) => {
  let loggedIn = false;
  const userCookie = CookieService.getItem(AppConfig.RememberMeCookie);
  const userId = getUserId();
  if (userId) {
    loggedIn = true;
  } else if (userCookie) {
    if (!CookieService.getItem(AppConfig.RememberMeCookieLoggedOut)) {
      loggedIn = true;
    }
  }
  MixPanel.register({
    loginState: loggedIn,
  });
  useEffect(() => {
    userId && props.getUserInfo(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomRoute = ({ path, Component }) => (
    <Route
      exact
      path={path}
      render={renderProps => {
        MixPanel.track(MixPanelEvents.PAGE_LOADED, {
          url: window.location.href,
          userId: userId || undefined,
        });
        return <MasterComponent Component={Component} renderProps={renderProps} />;
      }}
    />
  );

  return (
    <Router>
      <HeaderProvider>
        <AuthProvider>
          <CustomRoute exact path="/" Component={Home} />
          <CustomRoute path="/series/:seriesName/:seriesId" Component={Series} />
          <CustomRoute exact path="/Topics/:topicName/:topicId" Component={Topics} />
          <CustomRoute exact path="/Media/:mediaName" Component={Media} />
          <CustomRoute exact path="/About" Component={About} />
          <CustomRoute exact path="/Policy" Component={Policy} />
          <CustomRoute exact path="/Partner" Component={BecomePartner} />
          <CustomRoute exact path="/partners" Component={Partners} />
          <CustomRoute exact path="/mediaContent/:contentName" Component={MediaContent} />
          <CustomRoute exact path="/MyAccount" Component={AccountTab} />
          <CustomRoute exact path="/search" Component={SearchResults} />
          <CustomRoute exact path="/resetPassword" Component={Home} />
          <CustomRoute exact path="/setPassword" Component={Home} />
          <CustomRoute exact path="/SharedPlaylist/:sharedPlaylistId" Component={SharedPlaylist} />
        </AuthProvider>
      </HeaderProvider>
    </Router>
  );
};

export default connect(
  state => state.menu,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(App);
