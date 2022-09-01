import { combineReducers } from 'redux';
import EditorPicksReducer from './EditorPicksReducer';
import HomeReducer from './HomeReducer';
import MediaReducer from './MediaReducer';
import MenuReducer from './MenuReducer';
import SeriesReducer from './SeriesReducer';
import TopicsReducer from './TopicsReducer';
import VideosReducer from './VideosReducer';
import MenuMediaSearch from './MenuMediaSearch';
import AccountReducer from './AccountReducer';
import PartnersReducer from './PartnersReducer';
import SharedPlaylistReducer from './SharedPlaylistReducer';

export default combineReducers({
  HomeReducer,
  media: MediaReducer,
  menu: MenuReducer,
  series: SeriesReducer,
  topics: TopicsReducer,
  picks: EditorPicksReducer,
  videos: VideosReducer,
  mediaSearch: MenuMediaSearch,
  account: AccountReducer,
  partners: PartnersReducer,
  sharedPlaylist: SharedPlaylistReducer,
});
