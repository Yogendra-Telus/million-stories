import * as Constants from '../../config/Constants';

const initialState = {
  series: [],
  topics: [],
  tools: [],
  displayMenu: false,
  displayType: Constants.MENU_TYPE.SERIES,
};

export const MenuOverlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_SERIES':
      return {
        ...state,
        series: action.payload.items,
      };
    case 'MENU_STATE_CHANGE':
      return {
        ...state,
        displayMenu: action.data,
      };
    case 'MENU_DISPLAY_TYPE':
      return {
        ...state,
        displayMenu: action.displayMenu,
        displayType: action.displayType,
      };
    case 'DISPLAY_TOPICS':
      return {
        ...state,
        topics: action.payload.items,
      };
    case 'DISPLAY_TOOLS':
      return {
        ...state,
        tools: action.payload.items,
      };
    case 'LOAD_MENU_OVERLAY':
      return {
        ...state,
        type: 'LOAD_MENU_OVERLAY',
        series: action.payload.series,
        topics: action.payload.topics,
        tools: action.payload.tools,
      };
    default:
      return state;
  }
};

export default MenuOverlayReducer;
