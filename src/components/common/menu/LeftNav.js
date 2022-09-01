/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { withRouter } from 'react-router';
import { deviceType } from 'react-device-detect';
import { connect } from 'react-redux';
import { Collapse, Input } from 'antd';
import MenuActions from '../../../store/actions/MenuActions';
import FullLogo from '../Icons/MS-Logo';
// eslint-disable-next-line no-unused-vars
import Facebook from '../Icons/Facebook';
import Twitter from '../Icons/Twitter';
import Insta from '../Icons/Insta';
import ListViewMobile from './ListViewMobile';
import * as Constants from '../../../config/Constants';
import AppConfig from '../../../config/AppConfig';
import { isAuthenticated } from '../../../utility/AuthService';
import Close from '../Icons/Close';

const { Panel } = Collapse;
const { Search } = Input;

const LeftNav = ({ handleMouseOver, displayType, searchMedia, topicMap, toggleUser, toggleSignUp, ...props }) => {
  const menuRef = React.createRef();
  return (
    <>
      <div className="menu-menu">
        <div className="menu-logo-container">
          <div className="logo-container">
            <a href="/">
              <FullLogo iconfill="#ffffff" iconWidth="236" iconHeight="49" className="full-logo" alt="Singleton Logo" />
            </a>
          </div>
          <div className="mobile-header-btns-container">
            {/* <button className="header-signup-btn no-border">Login</button>
            <button className="header-signup-btn flyout-btn">Sign up</button> */}
            <span
              onClick={() => {
                props.setMenuState(!props.displayMenu, undefined);
              }}
              className="closeicon"
            >
              {' '}
              <Close iconWidth="20" iconfill="#fff" />
            </span>
          </div>
        </div>
        {deviceType === 'mobile' ? (
          <div ref={menuRef} className="tttt">
            <Collapse
              defaultActiveKey={[displayType]}
              destroyInactivePanel
              onChange={() => {
                // const nextElement = key[key.length - 1];
                // props.setMenuState(true, nextElement);
                // menuRef.current.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Panel header="Series" key={Constants.MENU_TYPE.SERIES}>
                <ListViewMobile displayType={Constants.MENU_TYPE.SERIES} {...props} />
              </Panel>
              <Panel header="Topics" key={Constants.MENU_TYPE.TOPICS}>
                <ListViewMobile topicMap={topicMap} {...props} displayType={Constants.MENU_TYPE.TOPICS} />
              </Panel>
              <Panel header="Resources" key={Constants.MENU_TYPE.TOOLS}>
                <ListViewMobile displayType={Constants.MENU_TYPE.TOOLS} />
              </Panel>
            </Collapse>
          </div>
        ) : (
          <div className="tttt">
            <div
              className={displayType === Constants.MENU_TYPE.SERIES ? 'main-link selected' : 'main-link '}
              onMouseOver={() => handleMouseOver(Constants.MENU_TYPE.SERIES)}
              onFocus={() => handleMouseOver(Constants.MENU_TYPE.SERIES)}
            >
              <span>Series</span>
            </div>
            <div
              className={displayType === Constants.MENU_TYPE.TOPICS ? 'main-link selected' : 'main-link '}
              onMouseOver={() => handleMouseOver(Constants.MENU_TYPE.TOPICS)}
              onFocus={() => handleMouseOver(Constants.MENU_TYPE.TOPICS)}
            >
              <span>Topics</span>
            </div>
            <div
              className={
                displayType === Constants.MENU_TYPE.TOOLS ? 'main-link selected resources' : 'main-link resources '
              }
              onMouseOver={() => handleMouseOver(Constants.MENU_TYPE.TOOLS)}
              onFocus={() => handleMouseOver(Constants.MENU_TYPE.TOOLS)}
            >
              <span>Resources</span>
            </div>
          </div>
        )}

        <div className="input-group desktop">
          <Search
            placeholder="SEARCH"
            enterButton="GO"
            size="large"
            onSearch={value => {
              if (value) {
                if (props.displayMenu === true) {
                  props.setMenuState(!props.displayMenu, undefined);
                }
                searchMedia(value, AppConfig.DefaultPage).then(() => {
                  props.history.push({
                    pathname: '/search',
                    state: { searchTerm: value },
                  });
                });
              }
            }}
          />
        </div>

        <div className="flyout-footer-links">
          {!isAuthenticated() ? (
            <>
              <span className="hide-desktop sublinks" onClick={toggleUser}>
                Login
              </span>
              <span className="hide-desktop sublinks" onClick={toggleSignUp}>
                SignUp
              </span>
              <span className="sublinks" onClick={toggleUser}>
                My Playlists
              </span>
              <span className="sublinks" onClick={toggleUser}>
                Watch History
              </span>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span className="hide-desktop sublinks" onClick={toggleUser}>
                Logout
              </span>
              <span
                className="sublinks"
                onClick={() => {
                  props.setMenuState(false, undefined);
                  props.history.push('/myaccount#playlists');
                }}
              >
                My Playlists
              </span>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className="sublinks"
                onClick={() => {
                  props.setMenuState(false, undefined);
                  props.history.push('/myaccount#history');
                }}
              >
                Watch History
              </span>
            </>
          )}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            className="sublinks"
            onClick={() => {
              props.setMenuState(false, undefined);
              props.history.push('/Partners');
            }}
          >
            Partners Showcase
          </span>
        </div>

        <div className="input-group mobile">
          <Search
            placeholder="SEARCH"
            enterButton="GO"
            size="large"
            onSearch={value => {
              if (value) {
                if (props.displayMenu === true) {
                  props.setMenuState(!props.displayMenu, undefined);
                }
                searchMedia(value, AppConfig.DefaultPage).then(() => {
                  props.history.push({
                    pathname: '/search',
                    state: { searchTerm: value },
                  });
                });
              }
            }}
          />
        </div>

        <div className="social-links-section">
          <div>
            <a
              href="https://www.instagram.com/millionstoriesmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Insta iconWidth="25" iconHeight="25" iconfill="#fff" />
            </a>
            <a
              href="https://twitter.com/millionstories"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Twitter iconWidth="25" iconHeight="25" iconfill="#fff" />
            </a>
            <a
              href="https://www.facebook.com/millionstoriesmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="fab fa-facebook fa" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  searchMedia: (value, DefaultPage) => dispatch(MenuActions.searchMedia(value, DefaultPage)),
});

export default connect(
  state => ({
    menu: state.menu,
    mediaSearch: state.mediaSearch,
    isContactModalOpen: state.partners.isContactModalOpen,
  }),
  mapDispatchToProps
)(withRouter(LeftNav));
