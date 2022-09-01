/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';

import SeriesHeader from './SeriesHeader';
import SeriesContent from './SeriesContent';
import actionCreator from '../../store/actions/SeriesActions';
import {
  GET_SERIES_SUBSCRIPTIONS_SUCCESS,
  SUBSCRIBE_SERIES_SUCCESS,
  UNSUBSCRIBE_SERIES_SUCCESS,
  RESET_USER_DATA,
} from '../../store/actionTypes/SeriesActionTypes';
import AppConfig from '../../config/AppConfig';
import BottomArrow from '../common/Icons/ScrollDown';
import { getUserId } from '../../utility/AuthService';

const Series = ({ type, seriesDetails, userSubscriptions, userPlaylists, userFavorites, account, ...props }) => {
  const [page, setPage] = useState(AppConfig.DefaultPage);
  const [isSeriesSubscribed, setSubscribedSeries] = useState(false);
  const { seriesId } = props.match.params;
  const { isAuth } = account;
  const userId = getUserId();

  useEffect(() => {
    props.getSeriesDetails(seriesId, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    isAuth && props.getUserFavorites(userId);
    isAuth && props.getUserPlaylists(userId);
    isAuth && props.getUserSubscriptions(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    switch (type) {
      case GET_SERIES_SUBSCRIPTIONS_SUCCESS:
        if (userSubscriptions.includes(Number(seriesId))) {
          setSubscribedSeries(true);
        }
        break;
      case SUBSCRIBE_SERIES_SUCCESS:
        setSubscribedSeries(true);
        break;
      case UNSUBSCRIBE_SERIES_SUCCESS:
        setSubscribedSeries(false);
        break;
      case RESET_USER_DATA:
        setSubscribedSeries([]);
        break;
      default:
        break;
    }
  }, [props.subscribedUserId, props.unsubscribedUserId, userSubscriptions]);

  return (
    <Fragment>
      {seriesDetails && (
        <div className="series-page">
          <SeriesHeader
            logo={seriesDetails.logo}
            seriesId={seriesDetails.seriesId}
            title={seriesDetails.title}
            description={seriesDetails.description}
            featuredImage={seriesDetails.featuredImage}
            isSeriesSubscribed={isSeriesSubscribed}
            setSubscribedSeries={setSubscribedSeries}
            loggedIn={account.isAuth}
            openLoginModal={props.openLoginModal}
            {...props}
          />
          {/* {isMobile && (
            <div className="scroll-icon">
              <BottomArrow iconfill="#F1F1F1" iconWidth="40" />
            </div>
          )} */}
          <SeriesContent
            pageNumber={page}
            setPage={setPage}
            videos={seriesDetails.videos}
            videoCount={seriesDetails.videoCount}
            seriesId={seriesDetails.seriesId}
            userPlaylists={userPlaylists}
            userFavorites={userFavorites}
            openLoginModal={props.openLoginModal}
            isAuth={account.isAuth}
            {...props}
          />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  ...state.series,
  account: state.account,
});

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreator, dispatch))(Series);
