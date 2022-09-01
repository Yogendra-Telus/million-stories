import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message, Pagination } from 'antd';
import _ from 'lodash';

import MenuActions from '../../store/actions/MenuActions';
import SeriesActions from '../../store/actions/SeriesActions';
import TopicActions from '../../store/actions/TopicsActions';
import Searchbar from './Searchbar';
import TopResults from './TopResults';
import Results from './Results';
import AppConfig from '../../config/AppConfig';
import { isAuthenticated, getUserId } from '../../utility/AuthService';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';

const Searchresult = ({ mediaSearch, ...props }) => {
  props.setTheme('dark');
  props.setTitle('Search');
  const { media, searchTerm, totalMediaCount, topTopics, topSeries, topTools } = mediaSearch;
  const [currentPage, setCurrentPage] = useState(AppConfig.DefaultPage);
  const [isSearchCleared, setSearchCleared] = useState(false);
  const userId = getUserId();
  props.setDisplay(' static-header grey-page');
  MixPanel.track(MixPanelEvents.KEYWORD_SEARCH, {
    searchTerm,
  });

  useEffect(() => {
    props.account.isAuth && props.getTopicUserSubscriptions(userId);
    props.account.isAuth && props.getSeriesUserSubscriptions(userId);
    props.account.isAuth && props.getUserFavorites(userId);
    props.account.isAuth && props.getUserPlaylists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.account.isAuth]);

  const toggleSubscribeSeries = seriesId => {
    if (isAuthenticated()) {
      if (props.seriesUserSubscriptions.includes(Number(seriesId))) {
        props.unsubscribeSeries(userId, seriesId).then(
          () => message.success(`${Constants.unsubscribedCaption}${Constants.ITEM_TYPE.SERIES}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      } else {
        props.subscribeSeries(userId, seriesId).then(
          () => message.success(`${Constants.subscribedCaption}${Constants.ITEM_TYPE.SERIES}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      }
    } else {
      props.openLoginModal();
    }
  };

  const toggleSubscribeTopic = topicId => {
    if (isAuthenticated()) {
      if (props.topicUserSubscriptions.includes(Number(topicId))) {
        props.unsubscribeTopic(userId, topicId).then(
          () => message.success(`${Constants.unsubscribedCaption}${Constants.ITEM_TYPE.TOPIC}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      } else {
        props.subscribeTopic(userId, topicId).then(
          () => message.success(`${Constants.subscribedCaption}${Constants.ITEM_TYPE.TOPIC}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      }
    } else {
      props.openLoginModal();
    }
  };

  const addToPlaylist = (playlistId, curMedia) => {
    const playlist = props.userPlaylists.find(elem => elem.playlistId === playlistId);
    if (playlist && playlist.mediaIds && !playlist.mediaIds.filter(elem => elem.id === curMedia).length) {
      props
        .addMediaToPlaylist(playlistId, curMedia)
        .then(() => message.success(Constants.addedToPlaylistCaption))
        .catch(error => {
          if (error && error.response && error.response.data) {
            message.error(`Error, ${error.response.data.detail}`);
          } else {
            message.error(`${Constants.errorCaption}`);
          }
        });
    } else {
      message.info(Constants.alreadyAddedToPlaylistCaption);
    }
  };

  const onAddPlaylist = (name, curMedia) => {
    const playlistItem = props.userPlaylists.find(elem => elem.name === name);
    if (playlistItem) return message.info(Constants.alreadyPlaylistExistCaption);
    return props.createPlaylist(userId, name).then(
      res => {
        message.success(Constants.playlistCreated);
        return addToPlaylist(res.response.data.id, curMedia);
      },
      () => message.error(`${Constants.errorCaption}`)
    );
  };

  const toggleMedia = mediaId => {
    if (isAuthenticated()) {
      if (props.userFavorites.filter(elem => elem.mediaId === mediaId).length) {
        props.removeFromFavorites(userId, mediaId).then(
          () => message.success(`${Constants.removedFromFavoritesCaption}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      } else {
        props.addMediaToFavorites(userId, mediaId).then(
          () => message.success(`${Constants.addedToFavoritesCaption}`),
          () => message.error(`${Constants.errorCaption}`)
        );
      }
    } else {
      props.openLoginModal();
    }
  };

  const handlePagination = page => {
    props.searchMedia(mediaSearch.searchTerm, page);
  };

  return (
    <div className="searchresult-page">
      <Searchbar
        currentPage={currentPage}
        mediaSearchResults={mediaSearch}
        clearSearch={setSearchCleared}
        setCurrentPage={setCurrentPage}
      />
      <section className="search-container">
        {!isSearchCleared && (
          <div>
            {topTopics || topSeries || topTools || !_.isEmpty(media) ? (
              <Fragment>
                {(topTopics || topSeries || topTools) && (
                  <TopResults
                    topTopics={topTopics}
                    topSeries={topSeries}
                    topTools={topTools}
                    isMediaAvailable={!_.isEmpty(media)}
                    seriesUserSubscriptions={props.seriesUserSubscriptions}
                    topicUserSubscriptions={props.topicUserSubscriptions}
                    toggleSubscribeSeries={toggleSubscribeSeries}
                    toggleSubscribeTopic={toggleSubscribeTopic}
                    {...props}
                  />
                )}
                {!_.isEmpty(media) && (
                  <Results
                    likeMedia={toggleMedia}
                    addToPlaylist={addToPlaylist}
                    addToFavorites={toggleMedia}
                    searchTerm={searchTerm}
                    searchData={media}
                    totalCount={totalMediaCount}
                    page={currentPage}
                    userFavorites={props.userFavorites}
                    playlists={props.userPlaylists}
                    openLoginModal={props.openLoginModal}
                    isAuth={isAuthenticated()}
                    onAddPlaylist={onAddPlaylist}
                  />
                )}
              </Fragment>
            ) : (
              <div className="result">
                <h3 className="search-heading no-result-heading">No Results found</h3>
              </div>
            )}
            {totalMediaCount > AppConfig.DefaultItemCount && (
              <span className="pagination-wrapper">
                <Pagination
                  defaultCurrent={AppConfig.DefaultPage}
                  defaultPageSize={AppConfig.DefaultItemCount}
                  onChange={handlePagination}
                  total={totalMediaCount}
                />
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(
    {
      ...MenuActions,
      ...SeriesActions,
      ...TopicActions,
      getSeriesUserSubscriptions: userId => SeriesActions.getUserSubscriptions(userId),
      getTopicUserSubscriptions: userId => TopicActions.getUserSubscriptions(userId),
    },
    dispatch
  )
)(Searchresult);

function mapStateToProps(state) {
  return {
    mediaSearch: state.mediaSearch,
    userFavorites: state.series.userFavorites,
    userPlaylists: state.series.userPlaylists,
    seriesUserSubscriptions: state.series.userSubscriptions,
    topicUserSubscriptions: state.topics.userSubscriptions,
    account: state.account,
  };
}
