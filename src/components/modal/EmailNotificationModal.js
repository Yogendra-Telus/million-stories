import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput } from '../ModelComponents/AntField';
import ValidateEmailNotificationModal from './ValidateEmailNotificationModal';
import actionCreator from '../../store/actions/AccountActions';
import { getUserId } from '../../utility/AuthService';
import * as Constants from '../../config/Constants';

const EmailNotificationModal = props => {
  const toggle = () => {
    localStorage.removeItem(Constants.UserIdCaption);
    props.setOpenEmailNotificationModal(false);
  };

  const updateUserEmail = emailId => {
    const userId = getUserId();
    props.setUserEmail(userId, emailId).then(
      response => {
        if (response.payload) {
          localStorage.setItem(Constants.UserIdCaption, response.payload.userid);
          localStorage.setItem(Constants.TokenCaption, response.payload.token);
          props.loginUser();
          props.setOpenEmailNotificationModal(false);
          message.success(Constants.loginSuccessfulCaption);
        } else {
          message.error(Constants.errorCaption);
        }
      },
      () => message.error(Constants.errorCaption)
    );
  };

  return (
    <div className="forgot-modal">
      <CustomModal
        title="Email Address Required"
        onCancel={toggle}
        submit={values => updateUserEmail(values.email)}
        visible={props.openEmailNotificationModal}
        okText="Continue"
        className="small-size custom-modal change-password"
        {...props}
      >
        <span>
          Thank you! Your Twitter account has been confirmed. To complete your registration on Million Stories, please
          enter your email address below.
        </span>
        <div className="modal-body">
          <CustomField name="email" component={AntInput} placeholder="Email" label="Email" />
        </div>
      </CustomModal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setUserEmail: (userId, emailId) => dispatch(actionCreator.postSetUserEmail(userId, emailId)),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withFormik({ validationSchema: ValidateEmailNotificationModal })(EmailNotificationModal)));
