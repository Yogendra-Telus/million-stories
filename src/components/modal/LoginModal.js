/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { withFormik } from 'formik';
import { Button, Col, Row, message } from 'antd';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import TwitterLogin from 'react-twitter-auth';
import _ from 'lodash';

import GoogleIcon from '../common/Icons/GoogleIcon';
import SignUpModal from '../modal/SignupModal';
import EmailNotificationModal from '../modal/EmailNotificationModal';
import ForgetPasswordModal from '../modal/ForgetPasswordModal';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput, AntCheckbox, AntPassword } from '../ModelComponents/AntField';
import { validateLogIn } from './ValidationLoginModals';
import actionCreator from '../../store/actions/AccountActions';
import AppConfig from '../../config/AppConfig';
import * as CookieService from '../../utility/CookieService';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import FullLogo from '../common/Icons/MS-Logo';
import { API_CALL_ERROR } from '../../store/actions/ActionTypes';
import RESPONSE_CODE from '../../config/ResponseCodes';

const LoginModal = props => {
  const [openEmailNotificationModal, setOpenEmailNotificationModal] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(props.rememberMe);

  const automaticLogin = (email, password) => {
    props
      .postSignIn({ username: email, password })
      .then(successResponse => {
        props.loginUser(successResponse);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const userId = getUserId();
  if (!userId) {
    const userCookie = CookieService.getItem(AppConfig.RememberMeCookie);
    if (userCookie) {
      const isRememberMeLoggedOut = CookieService.getItem(AppConfig.RememberMeCookieLoggedOut);
      if (isRememberMeLoggedOut === 'false') {
        automaticLogin(userCookie.email, userCookie.password);
      } else if (isRememberMeLoggedOut === 'true') {
        if (!props.values.email && !props.values.password) {
          // eslint-disable-next-line no-param-reassign
          props.values.userInfo.email = userCookie.email;
          // eslint-disable-next-line no-param-reassign
          props.values.userInfo.password = userCookie.password;
        }
      }
    }
  }

  const sendData = () => {
    props
      .postSignIn({ username: props.values.email, password: props.values.password })
      .then(({ payload: user }) => {
        MixPanel.register({
          loginState: true,
        });
        MixPanel.people.set({
          $email: user.username,
          $name: user.username,
        });
        MixPanel.identify(user.username);
        MixPanel.track(MixPanelEvents.LOGGED_IN_ENTRY, {
          url: window.location.href,
        });
        message.success(Constants.loginSuccessfulCaption);
        if (rememberMeChecked) {
          CookieService.setItem(
            AppConfig.RememberMeCookie,
            {
              email: props.values.email,
              password: props.values.password,
            },
            AppConfig.RememberMeExpiry
          );
          CookieService.setItem(AppConfig.RememberMeCookieLoggedOut, false, AppConfig.RememberMeExpiry);
        } else {
          CookieService.removeItem(AppConfig.RememberMeCookie);
        }
        props.loginUser(user);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const responseFacebook = response => {
    if (response.accessToken) {
      props
        .validateFacebookAuth(response.accessToken)
        .then(facebookResponse => {
          const { type } = facebookResponse;
          if (type === API_CALL_ERROR) {
            const { response: errorResponse } = facebookResponse.payload;
            if (errorResponse.status === RESPONSE_CODE.BADREQUEST) {
              const { data } = errorResponse;
              if (_.first(data.userStatus) === Constants.USER_STATUS.SUSPENDED) {
                message.error(Constants.deactivatedUserCaption);
              } else if (_.first(data.userStatus) === Constants.USER_STATUS.INVITED) {
                message.error(Constants.invitedUserCaption);
              } else {
                message.error(Constants.invalidCredentialsErrorCaption);
              }
            }
          } else {
            const { data: user } = facebookResponse.payload;
            MixPanel.register({
              loginState: true,
            });
            MixPanel.people.set({
              $email: user.username,
              $name: user.username,
            });
            MixPanel.identify(user.username);
            props.loginUser();
            message.success(Constants.loginSuccessfulCaption);
          }
        })
        .catch(error => {
          if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.SUSPENDED) {
            message.success(Constants.deactivatedUserCaption);
          } else if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.INVITED) {
            message.success(Constants.invitedUserCaption);
          } else {
            message.error(Constants.invalidCredentialsErrorCaption);
          }
        });
    }
  };

  const responseGoogle = response => {
    if (!response.error) {
      props
        .validateGoogleAuth(response.tokenId)
        .then(googleResponse => {
          const { type } = googleResponse;
          if (type === API_CALL_ERROR) {
            const { response: errorResponse } = googleResponse.payload;
            if (errorResponse.status === RESPONSE_CODE.BADREQUEST) {
              const { data } = errorResponse;
              if (_.first(data.userStatus) === Constants.USER_STATUS.SUSPENDED) {
                message.error(Constants.deactivatedUserCaption);
              } else if (_.first(data.userStatus) === Constants.USER_STATUS.INVITED) {
                message.error(Constants.invitedUserCaption);
              } else {
                message.error(Constants.invalidCredentialsErrorCaption);
              }
            }
          } else {
            const { data: user } = googleResponse.payload;
            MixPanel.register({
              loginState: true,
            });
            MixPanel.people.set({
              $email: user.username,
              $name: user.username,
            });
            MixPanel.identify(user.username);
            props.loginUser();
            message.success(Constants.loginSuccessfulCaption);
          }
        })
        .catch(error => {
          if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.SUSPENDED) {
            message.success(Constants.deactivatedUserCaption);
          } else if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.INVITED) {
            message.success(Constants.invitedUserCaption);
          } else {
            message.error(Constants.invalidCredentialsErrorCaption);
          }
        });
    }
  };

  const responseTwitter = response => {
    response
      .json()
      .then(twitterResponse => {
        const { userStatus } = twitterResponse;
        if (_.first(userStatus) === Constants.USER_STATUS.SUSPENDED) {
          message.error(Constants.deactivatedUserCaption);
        } else if (_.first(userStatus) === Constants.USER_STATUS.INVITED) {
          message.error(Constants.invitedUserCaption);
        } else if (twitterResponse.userid) {
          if (!twitterResponse.username) {
            setOpenEmailNotificationModal(true);
            localStorage.setItem(Constants.UserIdCaption, twitterResponse.userid);
            localStorage.setItem(Constants.TokenCaption, twitterResponse.token);
          } else {
            localStorage.setItem(Constants.UserIdCaption, twitterResponse.userid);
            localStorage.setItem(Constants.TokenCaption, twitterResponse.token);
            props.loginUser();
            props.validateTwitterAuth();
            message.success(Constants.loginSuccessfulCaption);
          }
        } else {
          message.error(Constants.errorCaption);
        }
      })
      .catch(error => {
        if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.SUSPENDED) {
          message.success(Constants.deactivatedUserCaption);
        } else if (error.data && _.first(error.data.userStatus) === Constants.USER_STATUS.INVITED) {
          message.success(Constants.invitedUserCaption);
        } else {
          message.error(Constants.invalidCredentialsErrorCaption);
        }
      });
  };

  const toggle = () => {
    props.toggleUser();
    props.resetForm();
  };

  return (
    <div className="login-modal">
      <button
        className={props.theme ? 'hide-mobile loginbutton dark-theme' : 'hide-mobile loginbutton'}
        onClick={props.toggleUser}
      >
        {props.isLoggedIn ? 'Logout' : 'LOG IN'}
      </button>
      <CustomModal
        visible={props.defaultOpen}
        onCancel={toggle}
        submit={props.handleSubmit}
        title="Login"
        footer={null}
        className="modal-login custom-modal "
        getContainer={props.currentContext || true}
      >
        <div className="popup-logo-sec">
          <FullLogo className="text-logo" iconfill="#000000" iconWidth="165" iconHeight="34" />
        </div>
        <div
          className="modal-body"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (!props.errors.email && !props.errors.password) {
                props.handleSubmit();
                sendData();
                props.closeLogin ? props.closeLogin() : props.toggleUser();
              }
            }
          }}
        >
          <Row className="row">
            <Col className="width-42">
              <CustomField
                name="email"
                component={AntInput}
                placeholder="your@email.com"
                label="Email"
                defaultValue={props.values.userInfo && props.values.userInfo.email}
              />
              <CustomField
                name="password"
                component={AntPassword}
                placeholder="Password"
                label="Password"
                defaultValue={props.values.userInfo && props.values.userInfo.password}
              />
              <div className="login-button-sec">
                <CustomField
                  className="checkbox-label"
                  name="remember"
                  component={AntCheckbox}
                  label="REMEMBER ME"
                  checked={rememberMeChecked}
                  onChange={e => {
                    setRememberMeChecked(e.target.checked);
                    if (CookieService.getItem(AppConfig.RememberMeCookieLoggedOut) === 'true') {
                      CookieService.removeItem(AppConfig.RememberMeCookieLoggedOut);
                    }
                  }}
                />
                <Button
                  className="login-modal-button btn-btm-margin"
                  style={{ textAlign: 'center' }}
                  size="large"
                  type="primary"
                  disabled={!props.isValid}
                  onClick={() => {
                    props.handleSubmit();
                    sendData();
                    props.closeLogin ? props.closeLogin() : props.toggleUser();
                  }}
                >
                  GO!
                </Button>
              </div>
              <Row className="login-links" style={{ margin: '5px 0' }}>
                <Col span={24} className="login-left-footer">
                  <SignUpModal
                    toggleSignUp={props.toggleUser}
                    loginUser={() => {
                      props.loginUser();
                      props.toggleUser();
                    }}
                  />

                  <ForgetPasswordModal toggleLoginModal={props.toggleUser}>Forget Password</ForgetPasswordModal>
                </Col>
              </Row>
            </Col>
            <Col className="width-15">
              <div className="login-divider">
                <div className="divide-line" />
                <div className="divide-text">OR</div>
                <div className="divide-line" />
              </div>
            </Col>
            <Col className="width-42 social-col">
              <div className="social-buttons-wrapper" onClick={toggle}>
                <TwitterLogin
                  className="twitter login-modal-button"
                  text="Continue with Twitter"
                  onSuccess={responseTwitter}
                  onFailure={responseTwitter}
                  requestTokenUrl={`${AppConfig.AuthUrl}/auth/twitterToken?callbackUrl=${AppConfig.TwitterCallbackUrl}`}
                  loginUrl={`${AppConfig.AuthUrl}/auth/twitterLogin`}
                  showIcon
                />
                <FacebookLogin
                  cssClass="facebook login-modal-button"
                  appId={AppConfig.FACEBOOK_APP_ID}
                  textButton="Continue with Facebook"
                  icon="fa-facebook"
                  callback={responseFacebook}
                  disableMobileRedirect
                />
                <GoogleLogin
                  className="google login-modal-button"
                  clientId={AppConfig.GOOGLE_CLIENT_ID}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  icon={false}
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </GoogleLogin>
              </div>
            </Col>
          </Row>
        </div>
      </CustomModal>

      {openEmailNotificationModal && (
        <EmailNotificationModal
          openEmailNotificationModal={openEmailNotificationModal}
          loginUser={props.loginUser}
          setOpenEmailNotificationModal={setOpenEmailNotificationModal}
        />
      )}
    </div>
  );
};

export default connect(
  state => state.account,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(
  withFormik({
    validationSchema: validateLogIn,
    handleSubmit: e => e,
  })(LoginModal)
);
