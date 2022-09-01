import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { message } from 'antd';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntPassword } from '../ModelComponents/AntField';
import { validateNewPassword } from './ValidationAccountInfoModal';
import { POST_SET_PASSWORD } from '../../store/actions/ActionTypes';
import actionCreator from '../../store/actions/AccountActions';
import * as Constants from '../../config/Constants';
import Check from '../common/Icons/Check';

const SetPasswordModal = props => {
  const [modal, setModal] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({});

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
    if (props.values.newPassword) {
      checkPasswordStrength(props.values.newPassword);
    } else {
      setPasswordStrength({ score: 0, isNumOrCharacter: false });
    }
  }, [props.values]);

  const handleSetPassword = values => {
    props
      .setPassword({ setPasswordToken: props.setPasswordToken, newPassword: values.newPassword })
      .then(successResponse => {
        if (successResponse.type === POST_SET_PASSWORD) {
          message.success(Constants.registrationCompletedSuccess);
          props.loginUser();
          props.history.push('/');
        }
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="forgot-modal">
      <CustomModal
        title="Complete Registration"
        onCancel={toggle}
        submit={submitValues => handleSetPassword(submitValues)}
        visible={modal}
        okText="Set Password"
        cancelText="Cancel"
        className="custom-modal change-password"
        {...props}
      >
        <div className="modal-body">
          <CustomField name="newPassword" component={AntPassword} placeholder="Enter password" label="New Password" />
          <CustomField
            name="confirmPassword"
            component={AntPassword}
            placeholder="Re-Enter Password"
            label="Re-Enter Password"
          />
          <div className="password-reliability">
            <div className="password-reliability-line" style={{ width: `${passwordStrength.score}%` }} />
          </div>
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
        </div>
      </CustomModal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setPassword: authData => dispatch(actionCreator.postSetPassword(authData)),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withFormik({ validationSchema: validateNewPassword })(SetPasswordModal)));
