/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { withFormik } from 'formik';
import { Button, message } from 'antd';
import { connect } from 'react-redux';

import ContactModal from '../ContactUs/ContactModal';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput } from '../ModelComponents/AntField';
import { validateForgotPassword } from './ValidationLoginModals';
import AccountActions from '../../store/actions/AccountActions';
import { emailSent } from '../../config/Constants';
import FullLogo from '../common/Icons/MS-Logo';

const ForgotPasswordModal = props => {
  const [modal, setModal] = useState(props.isOpen);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggle = () => {
    props.resetForm();
    setModal(!modal);
  };

  const triggerContactModal = () => {
    props.resetForm();
    toggle();
    toggleContactModal();
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  const switchToForgotPassword = () => {
    toggle();
    props.toggleLoginModal();
  };

  const sendLink = () => {
    props.postForgotPassword({ email: props.values.email }).then(
      () => {
        message.success(emailSent);
        toggle();
      },
      error => message.error(error.message)
    );
  };

  return (
    <div className="forgot-modal">
      <div className="forgot-modal">
        <span className="forgotbutton" onClick={switchToForgotPassword}>
          Forgot Password?
        </span>
      </div>
      <CustomModal
        title="FORGOT YOUR PASSWORD?"
        onCancel={toggle}
        visible={modal}
        footer={null}
        className="modal-login custom-modal modal-forgot"
      >
        <div className="popup-logo-sec">
          <FullLogo className="text-logo" iconfill="#000000" iconWidth="165" iconHeight="34" />
        </div>
        <div className="modal-body" style={{ padding: '0' }}>
          <div>Please enter your email below. We&apos;ll send you a link to reset your password.</div>
          <CustomField name="email" component={AntInput} placeholder="Email" label="Email" />
          <Button
            className="login-modal-button width-auto"
            style={{ textAlign: 'center' }}
            size="large"
            type="primary"
            disabled={!props.isValid}
            onClick={sendLink}
          >
            SEND RESET LINK
          </Button>
          <div className="sub-info">
            Having trouble?{' '}
            <span
              className="link"
              onClick={() => {
                triggerContactModal();
              }}
            >
              Contact us
            </span>
            {' for support.'}
          </div>
        </div>
        <ContactModal isContactModalOpen={isContactModalOpen} toggleContactModal={toggleContactModal} />
      </CustomModal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  postForgotPassword: authData => dispatch(AccountActions.postForgotPassword(authData)),
});

export default connect(
  null,
  mapDispatchToProps
)(withFormik({ validationSchema: validateForgotPassword })(ForgotPasswordModal));
