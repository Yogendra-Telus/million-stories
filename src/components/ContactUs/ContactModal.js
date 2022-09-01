/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Row, Col } from 'antd';
import { withFormik } from 'formik';
import _ from 'lodash';
import MaskedInput from 'antd-mask-input';

import CustomModal from '../ModelComponents/CustomModal';
import PartnerActions from '../../store/actions/PartnerActions';
import Validate from './Validate';
import CustomField from '../ModelComponents/CustomField';
import { InitialMapper } from './Mapper';
import { AntInput, AntTextarea } from '../ModelComponents/AntField';
import RESPONSE_CODE from '../../config/ResponseCodes';
import FullLogo from '../common/Icons/MS-Logo';

const ContactModal = props => {
  const {
    isContactModalOpen,
    handleContactModal,
    toggleContactModal,
    handleSubmit,
    setSubmitting,
    postContactUsMail,
    isValid,
    resetForm,
    touched,
    errors,
    setFieldTouched,
  } = props;
  const [modal, setModal] = useState(isContactModalOpen);

  useEffect(() => {
    setModal(isContactModalOpen);
  }, [isContactModalOpen]);

  return (
    <CustomModal
      visible={modal}
      title="Contact Us"
      footer={null}
      submit={props.handleSubmit}
      className="ant-modal custom-modal contact-modal"
      onCancel={() => {
        resetForm();
        setModal(false);
        handleContactModal && handleContactModal();
        toggleContactModal && toggleContactModal();
      }}
    >
      <div className="popup-logo-sec">
        <FullLogo className="text-logo" iconfill="#000000" iconWidth="165" iconHeight="34" />
      </div>
      <div className="controls-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="contact-input">
            <CustomField
              label="FIRST NAME"
              maxLength={48}
              name="firstName"
              placeholder="Your First Name"
              component={AntInput}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="contact-input">
            <CustomField
              label="LAST NAME"
              maxLength={48}
              name="lastName"
              placeholder="Your Last Name"
              component={AntInput}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="contact-input">
            <CustomField label="EMAIL" name="email" placeholder="your@email.com" component={AntInput} />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12} className="contact-input">
            <div className="ant-col ant-form-item-label">
              <label title="PHONE">PHONE</label>
            </div>
            <MaskedInput
              mask="(111) 111-1111"
              name="phone"
              size="14"
              label="PHONE"
              placeholder="(xxx) xxx-xxxx"
              value={props.values.phone}
              onChange={e => {
                props.setFieldValue('phone', e.target.value);
                setFieldTouched('phone', true);
              }}
            />
            {touched.phone && errors.phone ? <div style={{ color: 'red' }}>{errors.phone}</div> : null}
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="contact-input msg-input">
            <CustomField rows={8} label="YOUR MESSAGE" name="message" component={AntTextarea} />
          </Col>
        </Row>
      </div>

      <div className="controls-container contact-button">
        <p>Your privacy is sacred. We will not share your information with anyone, period.</p>
        <button
          type="submit"
          disabled={!_.isEmpty(props.errors)}
          onClick={() => {
            handleSubmit();
            const { firstName, lastName } = props.values;
            isValid
              ? postContactUsMail({
                  ...props.values,
                  name: `${firstName} ${lastName}`,
                })
                  .then(successResponse => {
                    if (successResponse.payload.status === RESPONSE_CODE.OK) {
                      message.success(`We'll get back to you soon`);
                    }
                    setSubmitting(false);
                    resetForm();
                    setModal(false);
                  })
                  .catch(error => {
                    if (error.response && error.response.status === RESPONSE_CODE.BADREQUEST) {
                      const errObj = error.response.data.errors;
                      message.error(_.first(errObj.Message));
                    }
                    message.error(error.message);
                  })
              : setSubmitting(false);
          }}
          className="btn light-transparent-btn"
        >
          GET IN TOUCH WITH US!
        </button>
      </div>
      <div className="bar-container">
        <span className="coloured-border" />
      </div>
    </CustomModal>
  );
};

const mapDispatchToProps = dispatch => ({
  postContactUsMail: param => dispatch(PartnerActions.postContactUsMail(param)),
});

export default connect(
  null,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: Validate,
    enableReinitialize: true,
    mapPropsToValues: () => InitialMapper,
    handleSubmit: e => e,
  })(ContactModal)
);
