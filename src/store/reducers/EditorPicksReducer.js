const EditorPicksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EDITOR_PICKS_SUCCESS':
      return {
        ...state,
        editorPicks: action.payload.items,
      };
    case 'GET_EDITOR_PICKS_FAILURE':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default EditorPicksReducer;
