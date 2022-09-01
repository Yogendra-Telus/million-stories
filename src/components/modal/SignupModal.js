/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Row, message } from 'antd';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import _ from 'lodash';

import CustomField from '../ModelComponents/CustomField';
import { AntInput, AntPassword } from '../ModelComponents/AntField';
import CustomModal from '../ModelComponents/CustomModal';
import { validateSignUp } from './ValidationLoginModals';
import actionCreator from '../../store/actions/AccountActions';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import Check from '../common/Icons/Check';
import FullLogo from '../common/Icons/MS-Logo';

const SignUpModal = props => {
  const { isOpen } = props;
  const [modal, setModal] = useState(isOpen);
  const [passwordStrength, setPasswordStrength] = useState({});
  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const checkPasswordStrength = pass => {
      const passToArray = pass.split('');
      const result = { score: 0 };
      if (pass) {
        if (pass.length >= 8) {
          result.isMinLength = true;
          result.score += 40;
        }
        if (/\d/.test(pass) || /[!@#$%^&*]/.test(pass)) {
          result.isNumOrCharacter = true;
          result.score += 10;
          const numOrCharacterLength = passToArray.filter(element => /\d/.test(element) || /[!@#$%^&*]/.test(element))
            .length;
          if (numOrCharacterLength > 1) result.score += 10;
        }
        if (/[a-z]/.test(pass)) {
          result.score += 10;
          const lowercaseLength = passToArray.filter(element => /[a-z]/.test(element)).length;
          if (lowercaseLength > 1) result.score += 10;
        }
        if (/[A-Z]/.test(pass)) {
          result.isUppercase = true;
          result.score += 10;
          const uppercaseLength = passToArray.filter(element => /[A-Z]/.test(element)).length;
          if (uppercaseLength > 1) result.score += 10;
        }
      }
      setPasswordStrength(result);
    };
    if (props.values.password) {
      checkPasswordStrength(props.values.password);
    } else {
      setPasswordStrength({ score: 0, isNumOrCharacter: false });
    }
  }, [props.values]);

  const toggle = () => {
    setModal(!modal);
    if (props.toggleSignUpModal) {
      props.toggleSignUpModal();
    }
    props.resetForm();
  };

  const switchToSignUp = () => {
    MixPanel.track(MixPanelEvents.REGISTRATION_REQUEST);
    toggle();
    if (props.toggleSignUp) {
      props.toggleSignUp();
    }
  };

  const sendData = () => {
    const { email, firstName, lastName, password } = props.values;
    props
      .postSignUp({
        email,
        firstName,
        lastName,
        password,
      })
      .then(
        () => {
          message.success('Account created!');
          toggle();
          props.loginUser(true);
        },
        error => {
          if (error && error.response && error.response.data) {
            message.info(`${error.response.data.detail}s`);
          } else {
            message.error(`${Constants.errorCaption}`);
          }
        }
      );
  };

  const displaySignUp = source => {
    switch (source) {
      case 'HEADER':
        return (
          <button
            className={props.theme ? 'hide-mobile header-signup-btn dark-theme' : 'hide-mobile header-signup-btn'}
            onClick={toggle}
          >
            Sign Up
          </button>
        );
      case 'ABOUT':
        return (
          <a
            href="#"
            className={
              props.theme
                ? 'hide-mobile signupbutton header-signup-btn dark-theme'
                : 'hide-mobile signupbutton header-signup-btn'
            }
            onClick={switchToSignUp}
          >
            {props.label}
          </a>
        );
      default:
        return (
          <a
            href="#1"
            className={
              props.theme
                ? 'hide-mobile signupbutton header-signup-btn dark-theme'
                : 'hide-mobile signupbutton header-signup-btn'
            }
            onClick={switchToSignUp}
          >
            Sign Up
          </a>
        );
    }
  };

  return (
    <div className="login-modal">
      {!props.isLoggedIn && displaySignUp(props.source)}
      <CustomModal
        title="Keep up with a million things."
        visible={modal}
        onCancel={toggle}
        footer={null}
        className="modal-login custom-modal singup-modal"
      >
        <div className="popup-logo-sec">
          <FullLogo className="text-logo" iconfill="#000000" iconWidth="165" iconHeight="34" />
        </div>
        <p className="signup-subheading">
          Join The Million Stories family! Sign up to receive the latest news, sneak peeks, offers, tips and other stuff
          to entertain and enlighten.
        </p>
        <div className="modal-body">
          <Row gutter={[16, 16]} className="">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CustomField name="firstName" component={AntInput} placeholder="First Name" label="First Name" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CustomField name="lastName" component={AntInput} placeholder="Last Name" label="Last Name" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CustomField
                name="email"
                component={AntInput}
                placeholder="your@email.com"
                label="EMAIL"
                className="form-input"
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CustomField name="password" component={AntPassword} placeholder="Enter password" label="Password" />
              <div className="password-reliability">
                <div className="password-reliability-line" style={{ width: `${passwordStrength.score}%` }} />
              </div>
            </Col>
            <Col span={24}>
              <div className="validation">
                <span>Password Requirements:</span>
                <div className={`validation-chek${passwordStrength.isMinLength ? ` checked` : ``}`}>
                  <div className="validation-condition">
                    {passwordStrength.isMinLength && <Check iconfill="#20a885" iconWidth="25" />}
                    <span className="ant-checkbox-inner" />
                    Minimum 8 characters in length
                  </div>
                </div>
                <div className={`validation-chek${passwordStrength.isUppercase ? ` checked` : ``}`}>
                  <div className="validation-condition">
                    {passwordStrength.isUppercase && <Check iconfill="#20a885" iconWidth="25" />}
                    <span className="ant-checkbox-inner" />
                    At least 1 uppercase letter
                  </div>
                </div>
                <div className={`validation-chek${passwordStrength.isNumOrCharacter ? ` checked` : ``}`}>
                  <div className="validation-condition">
                    {passwordStrength.isNumOrCharacter && <Check iconfill="#20a885" iconWidth="25" />}
                    <span className="ant-checkbox-inner" />
                    At least 1 number or special character
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="controls-container modal-bottom-button">
            <Button
              className="login-modal-button btn-btm-margin"
              style={{ textAlign: 'center' }}
              size="large"
              type="primary"
              disabled={!_.isEmpty(props.errors)}
              onClick={() => {
                MixPanel.track(MixPanelEvents.REGISTRATION_SUBMIT);
                props.handleSubmit();
                sendData();
              }}
            >
              I’m In!
            </Button>
            <p>Your privacy is sacred. We will not share your information with anyone, period.</p>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default connect(
  state => state.account,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(
  withFormik({
    validationSchema: validateSignUp,
    handleSubmit: e => e,
  })(withRouter(SignUpModal))
);
