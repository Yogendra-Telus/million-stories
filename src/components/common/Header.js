/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deviceType } from 'react-device-detect';
import { bindActionCreators } from 'redux';
import menuActions from '../../store/actions/MenuActions';
import seriesActions from '../../store/actions/SeriesActions';
import LoginModal from '../modal/LoginModal';
import FullLogo from '../common/Icons/MS-Logo';
import UserIcon from '../common/Icons/UserNew';
import AppConfig from '../../config/AppConfig';
import * as CookieService from '../../utility/CookieService';
import SignupModal from '../modal/SignupModal';
import { HeaderContext } from '../../providers/HeaderProvider/HeaderProvider';

const actionCreator = { ...menuActions, ...seriesActions };

const Header = props => {
  const { hideHeader } = useContext(HeaderContext);

  const renderLogo = () => {
    if (deviceType === 'mobile') {
      return (
        <h1 className="app-logo-mobile">
          {props.title ? (
            <span>
              {props.theme ? (
                <a href="/">
                  <FullLogo className="text-logo" iconfill="#000000" iconWidth="165" iconHeight="34" />
                  <span className="logo-container dark-theme">{props.title}</span>
                </a>
              ) : (
                <a href="/">
                  <FullLogo className="text-logo" iconfill="#ffffff" iconWidth="165" iconHeight="34" />
                  <span className="logo-container">{props.title}</span>
                </a>
              )}
            </span>
          ) : (
            <a href="/">
              <FullLogo className="text-logo" iconfill="#ffffff" iconWidth="165" iconHeight="34" />
            </a>
          )}
        </h1>
      );
    }

    return (
      <h1 className="app-logo-desktop">
        {props.title !== '' ? (
          <span className="logo-container-wrapper">
            {props.theme ? (
              <Fragment>
                <a href="/" className="logo-container dark-theme">
                  <FullLogo
                    iconfill="#333333"
                    iconWidth="236"
                    iconHeight="49"
                    className="full-logo"
                    alt="Singleton Logo"
                  />
                </a>
                <span className="dark-theme">{props.title}</span>
              </Fragment>
            ) : (
              <Fragment>
                <a href="/" className="logo-container">
                  <FullLogo
                    iconfill="#ffffff"
                    iconWidth="236"
                    iconHeight="49"
                    className="full-logo"
                    alt="Singleton Logo"
                  />
                </a>
                <span>{props.title}</span>
              </Fragment>
            )}
          </span>
        ) : (
          <a href="/">
            <FullLogo iconfill="#ffffff" iconWidth="236" iconHeight="49" className="full-logo" alt="Singleton Logo" />
          </a>
        )}
      </h1>
    );
  };

  return (
    <div
      style={{ backgroundColor: window.location.pathname.indexOf('media') !== -1 ? 'transparent' : '' }}
      className={`${props.displayMenu ? 'app-header opened' : 'app-header'} ${props.display}
          ${window.location.pathname.indexOf('media') !== -1 && hideHeader ? 'header-hidden' : ''}`}
    >
      {renderLogo()}
      <span className="app-right-menu">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="feedback-menu"
          href="https://www.surveymonkey.com/r/MillionStoriesBetaTesters"
        >
          Give Feedback
        </a>
        <LoginModal
          isLoggedIn={props.loggedIn}
          defaultOpen={props.loginModal}
          theme={props.theme}
          loginUser={props.loginUser}
          toggleUser={props.toggleUser}
          rememberMe={CookieService.getItem(AppConfig.RememberMeCookieLoggedOut) === 'true'}
          currentContext={props.currentContext}
        />
        <SignupModal
          isLoggedIn={props.loggedIn}
          theme={props.theme}
          source="HEADER"
          toggleSignUp={props.toggleUser}
          loginUser={props.loginUser}
          isOpen={props.signUpModal}
          toggleSignUpModal={props.toggleSignUp}
        />
        {props.loggedIn && (
          <Link to="/myaccount#playlists" className="user-icon">
            {props.theme ? (
              <UserIcon iconfill="#1A1A1A" iconWidth="30" />
            ) : (
              <UserIcon iconfill="#ffffff" iconWidth="30" />
            )}
          </Link>
        )}
        <span
          onClick={() => {
            props.setMenuState(!props.displayMenu, undefined);
          }}
        >
          {props.theme ? (
            <div id="hamburger" className={props.displayMenu ? 'opened dark' : 'dark'}>
              <span />
              <span />
              <span />
              <span />
            </div>
          ) : (
            <div id="hamburger" className={props.displayMenu ? 'light opened' : 'light'}>
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
        </span>
      </span>
    </div>
  );
};

export default connect(
  state => state.menu,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(Header);
