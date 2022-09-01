import * as yup from 'yup';
import * as Constants from '../../config/Constants';

const Validate = yup.object({
  firstName: yup.string().required(Constants.VALIDATION_ERRORS.required),
  lastName: yup.string().required(Constants.VALIDATION_ERRORS.required),
  email: yup
    .string()
    .email()
    .required(Constants.VALIDATION_ERRORS.required),
  phone: yup.string().matches(Constants.usPhoneRegExp, Constants.VALIDATION_ERRORS.phone),
  message: yup.string().max(1000, Constants.VALIDATION_ERRORS.max),
});

export default Validate;
