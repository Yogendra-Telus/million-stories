import * as yup from 'yup';

const ValidateEmailNotificationModal = yup.object({
  email: yup
    .string()
    .email('Invalid email.')
    .required('Email Address is required.'),
});

export default ValidateEmailNotificationModal;
