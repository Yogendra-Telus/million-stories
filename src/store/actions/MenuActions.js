import axios from 'axios';
import { getAllSeries, getAllTopics, getAllTools } from '../../api/MenuApi';
import { mediaSearch } from '../../api/MediaApi';
import { API_CALL_ERROR } from './ActionTypes';
import dispatchAction from '../../utility/DispatchUtility';

const menuMediaSearchAction = (payload, searchTerm) => ({
  type: 'LOAD_MENU_MEDIA_SEARCH',
  data: { payload, searchTerm },
});

const changeSearchTermAction = searchTerm => ({
  type: 'ON_CHANGE_SEARCH_TERM',
  data: searchTerm,
});

const changeMenuStateAction = menuState => ({
  type: 'MENU_STATE_CHANGE',
  data: menuState,
});

const ChangeDisplayTypeAction = (displayMenu, displayType) => ({
  type: 'MENU_DISPLAY_TYPE',
  displayType,
  displayMenu,
});

const actionCreator = {
  loadMenuOverlay: () => async dispatch => {
    axios
      .all([getAllSeries, getAllTopics, getAllTools])
      .then(
        axios.spread((series, topics, tools) => {
          dispatch(
            dispatchAction('LOAD_MENU_OVERLAY', {
              series: series.data,
              topics: topics.data,
              tools: tools.data,
            })
          );
        })
      )
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      });
  },
  searchMedia: (searchItem, pageNumber) => async dispatch => {
    mediaSearch(searchItem, pageNumber)
      .then(response => {
        dispatch(menuMediaSearchAction(response.data, searchItem));
      })
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      });
  },
  onChangeSearchTerm: searchItem => async dispatch => {
    dispatch(changeSearchTermAction(searchItem));
  },
  onChangeMenuState: menuState => async dispatch => {
    dispatch(changeMenuStateAction(menuState));
  },
  onChangeDisplayType: (menuState, displayType) => async dispatch => {
    dispatch(ChangeDisplayTypeAction(menuState, displayType));
  },
};

export default actionCreator;
