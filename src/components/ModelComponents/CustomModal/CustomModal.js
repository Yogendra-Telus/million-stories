import React from 'react';
import { Modal } from 'antd';
import { Form } from 'formik';
import useStopPropagation from '../../../hooks/stopPropagation';
import CloseNew from '../../../components/common/Icons/CloseNew';

// In order to use this component,
// it should be wrappered in withFormik() HOC,
// {props.children} should recieve custom fields (which exist in CustomFields.js)
// and props listed below also should be transferred.

const CustomModal = ({
  title, // Modal Title
  visible, // Boolean variable with information is modal open
  onCancel, // Function to close and open modal
  submit, // submit function
  okText, // text on submit button
  cancelText,
  style,
  ...props // formik props
}) => {
  useStopPropagation(visible);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        disabled: !props.isValid,
      }}
      onOk={() => {
        submit(props.values);
        onCancel();
      }}
      style={style}
      closeIcon={<CloseNew />}
      {...props}
    >
      <Form>{props.children}</Form>
    </Modal>
  );
};

export default CustomModal;
