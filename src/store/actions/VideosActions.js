import { GET_FEATURED_VIDEO_SUCCESS, GET_FEATURED_VIDEO_FAILURE } from '../actionTypes/VideosActionTypes';
import getFeaturedVideos from '../../api/VideosApi';

const dispatchAction = (type, data) => ({
  type,
  payload: data,
});

const actionCreator = {
  getFeaturedVideos: () => async dispatch => {
    try {
      return getFeaturedVideos().then(response => dispatch(dispatchAction(GET_FEATURED_VIDEO_SUCCESS, response.data)));
    } catch (error) {
      return dispatch(dispatchAction(GET_FEATURED_VIDEO_FAILURE, error));
    }
  },
};

export default actionCreator;
