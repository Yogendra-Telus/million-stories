import { GET_PARTNERS_SUCCESS, GET_PARTNERS_FAILURE } from '../../store/actionTypes/PartnerActionTypes';
import RESPONSE_CODE from '../../config/ResponseCodes';

const PartnersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PARTNERS_SUCCESS:
      return {
        ...state,
        type: GET_PARTNERS_SUCCESS,
        partners: action.payload.status === RESPONSE_CODE.OK ? action.payload.data.items : [],
      };
    case GET_PARTNERS_FAILURE:
      return {
        ...state,
        type: GET_PARTNERS_FAILURE,
      };
    default:
      return state;
  }
};

export default PartnersReducer;
