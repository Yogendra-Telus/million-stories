import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Menu from '../../components/common/menu/Menu';
import MenuActions from '../../store/actions/MenuActions';
import AuthContext from '../../providers/AuthProvider';
import MenuContext from '../../providers/MenuProvider';
import * as AuthService from '../../utility/AuthService';

const MasterComponent = ({ Component, displayMenu, displayType, renderProps, ...props }) => {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState(props.theme);
  const [display, setDisplay] = useState('');
  const [currentContext, setCurrentContext] = useState(undefined);

  const setMenuState = (menuState, menuDisplayType) => {
    const { setDisplayType, setDisplayMenu } = props;
    if (menuDisplayType) {
      setDisplayType(menuState, menuDisplayType);
    } else {
      setDisplayMenu(menuState);
    }
  };
  // eslint-disable-next-line consistent-return
  const detectMacBrowser = () => {
    if (window.navigator.userAgent.indexOf('Mac') > 0) {
      if (window.navigator.userAgent.indexOf('Chrome') > 0) return ' mac-os chrome';
      if (window.navigator.userAgent.indexOf('Safari') > 0) return ' mac-os safari';
    }
    return '';
  };

  const isHomePathActive =
    window.location.pathname === '/' ||
    window.location.pathname === '/resetPassword' ||
    window.location.pathname === '/setPassword';

  const getClassName = (homeActive, menuDisplayed) => {
    if (homeActive) {
      if (menuDisplayed) {
        return 'App home-active hidden';
      }
      return 'App home-active';
    } else if (menuDisplayed) {
      if (homeActive) {
        return 'App home-active hidden';
      }
      return 'App home-hidden';
    }
    return 'App';
  };

  const [loggedIn, setLogin] = useState(AuthService.isAuthenticated());
  const loginUser = signUpContext => {
    if (!signUpContext) {
      setLoginModal(false);
    }
    setLogin(true);
  };

  const [loginModal, setLoginModal] = useState(false);
  const toggleUserModal = useContext(AuthContext);
  const toggleUser = context => {
    if (context) {
      setCurrentContext(context);
    }
    const result = toggleUserModal();
    if (!result) {
      setLoginModal(!loginModal);
    }
  };

  const [signUpModal, setSignUpModal] = useState(false);
  const toggleSignUp = context => {
    if (context) {
      setCurrentContext(context);
    }
    setSignUpModal(!signUpModal);
  };

  return (
    <div className={`${getClassName(isHomePathActive, displayMenu)}${display || ''}${detectMacBrowser()}`}>
      <Menu
        toggleUser={toggleUser}
        toggleSignUp={toggleSignUp}
        displayType={displayType}
        displayMenu={displayMenu}
        setMenuState={setMenuState}
      />
      <Header
        toggleUser={toggleUser}
        toggleSignUp={toggleSignUp}
        loginModal={loginModal}
        signUpModal={signUpModal}
        loggedIn={loggedIn}
        loginUser={loginUser}
        title={title}
        theme={theme}
        setTheme={setTheme}
        display={display}
        setDisplay={setDisplay}
        displayMenu={displayMenu}
        setMenuState={setMenuState}
        currentContext={currentContext}
      />
      <MenuContext.Provider value={displayMenu}>
        <Component
          {...renderProps}
          loginUser={loginUser}
          loggedIn={loggedIn}
          openLoginModal={toggleUser}
          setTitle={setTitle}
          setTheme={setTheme}
          setDisplay={setDisplay}
          setMenuState={setMenuState}
        />
      </MenuContext.Provider>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setDisplayMenu: menuState => dispatch(MenuActions.onChangeMenuState(menuState)),
  setDisplayType: (menuState, menuDisplayType) => dispatch(MenuActions.onChangeDisplayType(menuState, menuDisplayType)),
});

export default connect(
  state => ({
    displayType: state.menu.displayType,
    displayMenu: state.menu.displayMenu,
  }),
  mapDispatchToProps
)(MasterComponent);
