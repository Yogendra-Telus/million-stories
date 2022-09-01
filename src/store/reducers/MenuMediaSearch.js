/* eslint-disable no-case-declarations */
const initialState = {
  searchTerm: null,
  isSearchTermClear: false,
  topTools: null,
  topTopics: null,
  topSeries: null,
  mediaCount: 0,
  media: null,
  page: 1,
  pageTotal: 100,
  type: null,
};

const MenuMediaSearch = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_MENU_MEDIA_SEARCH':
      const { payload, searchTerm } = action.data;
      const { media, topResults, totalMediaCount } = payload;
      return {
        ...state,
        searchTerm,
        topTools: topResults.Tool,
        topTopics: topResults.Topic,
        topSeries: topResults.Series,
        media,
        totalMediaCount,
        type: 'LOAD_MENU_MEDIA_SEARCH',
        isSearchTermClear: false,
      };
    case 'ON_CHANGE_SEARCH_TERM':
      return { ...state, updatedSearchTerm: action.data, isSearchTermClear: true };
    default:
      return state;
  }
};

export default MenuMediaSearch;
