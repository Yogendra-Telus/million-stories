/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import Check from '../common/Icons/Check';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntPassword } from '../ModelComponents/AntField';
import { validateChangePassword } from './ValidationAccountInfoModal';

const ChangePasswordModal = props => {
  const [modal, setModal] = useState(false);
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

  const { handleChangePassword } = props;
  const toggle = () => {
    setModal(!modal);
    props.resetForm();
  };

  const switchToEditAccount = () => {
    toggle();
    props.toggleChangePassword();
  };

  const switchToChangePassword = () => {
    props.toggleChangePassword();
    toggle();
  };

  return (
    <div className="forgot-modal">
      <span className="forgotbutton" onClick={switchToChangePassword}>
        Change Password
      </span>
      <CustomModal
        title="Change Password"
        onCancel={switchToEditAccount}
        submit={submitValues => handleChangePassword(submitValues)}
        visible={modal}
        okText="Change Password"
        cancelText="Cancel"
        className="custom-modal change-password"
        {...props}
      >
        <div className="modal-body">
          <CustomField
            name="oldPassword"
            component={AntPassword}
            placeholder="Enter current password"
            label="Current Password"
          />
          <CustomField
            name="newPassword"
            component={AntPassword}
            placeholder="Enter new password"
            label="New Password"
          />
          <CustomField
            name="confirmPassword"
            component={AntPassword}
            placeholder="Re-Enter new password"
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

export default withFormik({ validationSchema: validateChangePassword })(ChangePasswordModal);
