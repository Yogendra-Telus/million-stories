const VideosReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FEATURED_VIDEO_SUCCESS':
      return {
        ...state,
        videos: action.payload.items,
      };
    case 'GET_FEATURED_VIDEO_FAILURE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default VideosReducer;
