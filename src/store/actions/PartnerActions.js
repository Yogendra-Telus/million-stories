import partnersAPI from '../../api/PartnerApi';
import dispatchAction from '../../utility/DispatchUtility';
import {
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAILURE,
  POST_CONTACT_US_MAIL_FAILURE,
  POST_CONTACT_US_MAIL_SUCCESS,
  POST_BECOME_PARTNER_MAIL_SUCCESS,
  POST_BECOME_PARTNER_MAIL_FAILURE,
} from '../../store/actionTypes/PartnerActionTypes';

const actionCreator = {
  getAllPartners: () => async dispatch => {
    partnersAPI
      .getAllPartners()
      .then(response => {
        dispatch(dispatchAction(GET_PARTNERS_SUCCESS, response));
      })
      .catch(error => {
        dispatch(dispatchAction(GET_PARTNERS_FAILURE, error));
        throw error;
      });
  },
  postContactUsMail: data => dispatch =>
    partnersAPI
      .postContactUsMail(data)
      .then(response => dispatch(dispatchAction(POST_CONTACT_US_MAIL_SUCCESS, response)))
      .catch(error => {
        dispatch(dispatchAction(POST_CONTACT_US_MAIL_FAILURE, error));
        throw error;
      }),
  postBecomeAPartnerMail: data => dispatch =>
    partnersAPI
      .postBecomeAPartnerMail(data)
      .then(response => dispatch(dispatchAction(POST_BECOME_PARTNER_MAIL_SUCCESS, response)))
      .catch(error => {
        dispatch(dispatchAction(POST_BECOME_PARTNER_MAIL_FAILURE, error));
        throw error;
      }),
};

export default actionCreator;
