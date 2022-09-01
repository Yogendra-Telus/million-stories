import * as yup from 'yup';
import { emailValidationError, invalidPassword } from '../../config/Constants';

export const validateLogIn = yup.object({
  email: yup
    .string()
    .required(emailValidationError)
    .email(emailValidationError),
  password: yup
    .string()
    .required()
    .min(8, invalidPassword),
});

export const validateSignUp = yup.object({
  email: yup
    .string()
    .email(emailValidationError)
    .required(),
  firstName: yup.string().required('First Name is a required field.'),
  lastName: yup.string().required('Last Name is a required field.'),
  password: yup
    .string()
    .required()
    .min(8, invalidPassword),
});

export const validateForgotPassword = yup.object({
  email: yup
    .string()
    .required()
    .email(),
});

export default { validateLogIn, validateSignUp, validateForgotPassword };
