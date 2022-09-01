/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { withFormik } from 'formik';
import { Col, Row } from 'antd';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput } from '../ModelComponents/AntField';
import ChangePasswordModal from './ChangePasswordModal';
import EditIcon from '../common/Icons/edit';
import { validateEditAccountInfo } from './ValidationAccountInfoModal';

const EditAccountInfoModal = props => {
  const [modal, setModal] = useState(false);
  const { handleEditAccountInfo } = props;
  const toggle = () => {
    setModal(!modal);
    if (props.resetForm) {
      props.resetForm();
    }
  };

  return (
    <div className="login-modal">
      <div className="no-border-btn" onClick={toggle} role="button">
        <EditIcon iconfill="#a1a6bb" iconWidth="25" />
        Edit
      </div>
      <CustomModal
        visible={modal}
        onCancel={toggle}
        submit={submitValues => handleEditAccountInfo(submitValues)}
        title="Edit My Account Info"
        okText="Save Changes"
        cancelText="Cancel"
        className="custom-modal edit-accInfo-modal"
        {...props}
      >
        <div className="modal-body">
          <Row gutter={0}>
            <Col span={24}>
              <CustomField
                defaultValue={props.firstName}
                name="firstName"
                id="firstName"
                component={AntInput}
                placeholder="First Name"
                label="First Name"
              />
              <CustomField
                defaultValue={props.lastName}
                name="lastName"
                component={AntInput}
                placeholder="Last Name"
                label="Last Name"
              />
              <CustomField
                defaultValue={props.email}
                readOnly
                name="email"
                component={AntInput}
                placeholder="Email Address"
                label="Email Address"
              />
              <CustomField
                defaultValue="*****************"
                readOnly
                name="password"
                component={AntInput}
                label="Password"
              />
              <ChangePasswordModal toggleChangePassword={toggle} handleChangePassword={props.handleChangePassword}>
                Change Password
              </ChangePasswordModal>
            </Col>
          </Row>
        </div>
      </CustomModal>
    </div>
  );
};

export default withFormik({ validationSchema: validateEditAccountInfo })(EditAccountInfoModal);
