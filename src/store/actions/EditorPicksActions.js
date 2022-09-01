import { GET_EDITOR_PICKS_SUCCESS, GET_EDITOR_PICKS_FAILURE } from '../actionTypes/EditorPicksActionTypes';
import getEditorPicks from '../../api/EditorPicksApi';

const dispatchAction = (type, data) => ({
  type,
  payload: data,
});

const actionCreator = {
  getEditorPicks: () => async dispatch => {
    try {
      return getEditorPicks().then(response => dispatch(dispatchAction(GET_EDITOR_PICKS_SUCCESS, response.data)));
    } catch (error) {
      return dispatch(dispatchAction(GET_EDITOR_PICKS_FAILURE, error));
    }
  },
};

export default actionCreator;
