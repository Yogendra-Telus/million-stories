import * as yup from 'yup';

export const validateEditAccountInfo = yup.object({
  email: yup
    .string()
    .email('Invalid email.')
    .required('Email Address is required.'),
  firstName: yup
    .string()
    .required('First Name is required.')
    .max(45, 'First Name cannot have more than 45 characters.'),
  lastName: yup
    .string()
    .required('Last Name is required.')
    .max(45, 'Last Name cannot have more than 45 characters.'),
});

export const validateChangePassword = yup.object({
  oldPassword: yup.string().required('Current Password is required.'),
  newPassword: yup
    .string()
    .required('New Password is required.')
    .min(8, 'Password must meet requirements below.')
    .matches(
      new RegExp('^(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*]))(?=.{8,})'),
      'Password must meet requirements below.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirmed Password is required.')
    .oneOf([yup.ref('newPassword'), null], 'Confirmed Password must match the New Password'),
});

export const validateNewPassword = yup.object({
  newPassword: yup
    .string()
    .required('New Password is required.')
    .min(8, 'Password must meet requirements below.')
    .matches(
      new RegExp('^(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*]))(?=.{8,})'),
      'Password must meet requirements below.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirmed Password is required.')
    .oneOf([yup.ref('newPassword'), null], 'Confirmed Password must match the New Password'),
});

export default { validateEditAccountInfo, validateChangePassword, validateNewPassword };
