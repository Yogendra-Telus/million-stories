import * as yup from 'yup';
import * as Constants from '../../config/Constants';

const Validate = yup.object({
  company: yup.string().required(Constants.VALIDATION_ERRORS.required),
  firstName: yup.string().required(Constants.VALIDATION_ERRORS.required),
  lastName: yup.string().required(Constants.VALIDATION_ERRORS.required),
  email: yup
    .string()
    .email()
    .required(Constants.VALIDATION_ERRORS.required),
  phone: yup.string().matches(Constants.usPhoneRegExp, Constants.VALIDATION_ERRORS.phone),
  partnershipType: yup.array(),
  message: yup.string().max(400, Constants.VALIDATION_ERRORS.max),
});

export default Validate;
