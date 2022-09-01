/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import * as Constants from '../../config/Constants';
import AddedIcon from '../common/Icons/Added';
import PlusIcon from '../common/Icons/Add';

const { MENU_TYPE } = Constants;

const pageRedirect = (item, history, menuType) => {
  let redirectionUrl;
  switch (menuType) {
    case MENU_TYPE.TOPIC:
      redirectionUrl = `/topics/${item.seoUrl}/${item.id}`;
      break;
    case MENU_TYPE.SERIES:
      redirectionUrl = `/series/${item.seoUrl}/${item.id}`;
      break;
    default:
      redirectionUrl = '';
      break;
  }
  history.push(redirectionUrl);
};

const TopResults = ({
  topTopics,
  topSeries,
  topTools,
  seriesUserSubscriptions,
  topicUserSubscriptions,
  toggleSubscribeSeries,
  toggleSubscribeTopic,
  history,
  isMediaAvailable,
}) => (
  <div className="result">
    <h3 className="search-heading">Top Results</h3>
    <div className={`row card-container${isMediaAvailable ? ` border-bottom` : ``}`}>
      {topTopics && (
        <div className="col-md-4 card-wrapper">
          <div className="card-item">
            <div
              className="img-container"
              style={{ backgroundImage: `url(${topTopics.featuredImage})` }}
              onClick={() => {
                pageRedirect(topTopics, history, MENU_TYPE.TOPIC);
              }}
            />
            <h3
              className="heading"
              onClick={() => {
                pageRedirect(topTopics, history, MENU_TYPE.TOPIC);
              }}
            >
              {topTopics.name}
            </h3>
            <p className="descriptionContent">Topic</p>
            <div className="button-wrapper">
              <button
                className="btn dark-transparent-btn search-btn"
                onClick={() => {
                  toggleSubscribeTopic(topTopics.id);
                }}
              >
                {topicUserSubscriptions && topicUserSubscriptions.includes(Number(topTopics.id)) ? (
                  <Fragment>
                    <AddedIcon iconfill="#333333" iconWidth="9" iconHeight="9" />
                    <span>
                      {Constants.subscribedCaption} {Constants.ITEM_TYPE.TOPIC}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <PlusIcon iconfill="#333333" iconWidth="9" iconHeight="9" />
                    <span>
                      {Constants.subscribeToCaption} {Constants.ITEM_TYPE.TOPIC}
                    </span>
                  </Fragment>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {topSeries && (
        <div className="col-md-4 card-wrapper">
          <div className="card-item">
            <div
              className="img-container"
              style={{ backgroundImage: `url(${topSeries.featuredImage})` }}
              onClick={() => {
                pageRedirect(topSeries, history, MENU_TYPE.SERIES);
              }}
            />
            <h3
              className="heading"
              onClick={() => {
                pageRedirect(topSeries, history, MENU_TYPE.SERIES);
              }}
            >
              {topSeries.name}
            </h3>
            <p className="descriptionContent">Series</p>

            <div className="button-wrapper">
              <button
                className="btn dark-transparent-btn search-btn"
                onClick={() => {
                  toggleSubscribeSeries(topSeries.id);
                }}
              >
                {seriesUserSubscriptions && seriesUserSubscriptions.includes(Number(topSeries.id)) ? (
                  <Fragment>
                    <AddedIcon iconfill="#333333" iconWidth="9" iconHeight="9" />
                    <span>
                      {Constants.subscribedCaption} {Constants.ITEM_TYPE.SERIES}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <PlusIcon iconfill="#333333" iconWidth="9" iconHeight="9" />
                    <span>
                      {Constants.subscribeToCaption} {Constants.ITEM_TYPE.SERIES}
                    </span>
                  </Fragment>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {topTools && (
        <div className="col-md-4 card-wrapper">
          <div className="card-item">
            <a
              className="img-container"
              href={topTools.url || ''}
              style={{ backgroundImage: `url(${topTools.featuredImage})` }}
            />
            <h3
              className="heading"
              onClick={() => {
                window.location.href = topTools.url;
              }}
            >
              {topTools.name}
            </h3>
            <p className="descriptionContent">Tool</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default TopResults;
