/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { bindActionCreators } from 'redux';
import TextTruncate from 'react-text-truncate';
import actionCreator from '../../store/actions/SeriesActions';
import PlusIcon from '../common/Icons/Subscribe';
import PlayIcon from '../common/Icons/Play2';
import CheckIcon from '../common/Icons/Added';
import * as Constants from '../../config/Constants';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import { getUserId } from '../../utility/AuthService';
import RESPONSE_CODE from '../../config/ResponseCodes';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const Series = ({ account, setMenuState, series, ...props }) => {
  const { featuredSeries, userSubscriptions } = series;
  const { isAuth } = account;
  const userId = getUserId();
  // const [isOpenId, setIsOpenId] = useState([]);

  useEffect(() => {
    props.getFeaturedSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isAuth && props.getUserSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const toggleSubscribeSeries = (e, seriesId) => {
    e.stopPropagation();
    if (isAuth) {
      if (userSubscriptions && !userSubscriptions.includes(seriesId)) {
        props
          .subscribeSeries(userId, seriesId)
          .then(() => {
            message.success(`${Constants.subscribedCaption}${Constants.ITEM_TYPE.SERIES}`);
          })
          .catch(error => {
            if (error && error.response && error.response.data) {
              message.error(`${error.response.data.detail}`);
            } else {
              message.error(`${Constants.errorCaption}`);
            }
          });
      } else {
        props
          .unsubscribeSeries(userId, seriesId)
          .then(() => {
            message.success(`${Constants.unsubscribedCaption}${Constants.ITEM_TYPE.SERIES}`);
          })
          .catch(error => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.status === RESPONSE_CODE.NOTFOUND
            ) {
              message.error('Subscription Not Found');
            } else {
              message.error(`${Constants.errorCaption}`);
            }
          });
      }
    } else {
      props.openLoginModal();
    }
    MixPanel.track(MixPanelEvents.SUBSCRIBE_REGISTRATION_REQUEST, {
      seriesId,
    });
  };

  // const openModal = id => {
  //   setIsOpenId(state => [...state, id]);
  // };

  // const closeModal = id => {
  //   setIsOpenId(state => state.filter(item => item !== id));
  // };

  const redirectToItemDetail = item => {
    localStorage.setItem('redirectedFromPage', props.history.location.pathname);
    props.history.push(`/series/${item.seoUrl}/${item.id}`);
  };

  const winWidth = window.innerWidth;

  if (isMobile || winWidth <= 768) {
    return (
      <div className="series-section">
        <div className="featured-series-container">
          {featuredSeries &&
            featuredSeries.length > 0 &&
            featuredSeries.slice(0, 3).map(item => {
              const isSubscribed = userSubscriptions && userSubscriptions.includes(item.id);
              return (
                <Fragment key={item.id}>
                  <div
                    className="featured-series"
                    style={{
                      backgroundImage: `url(${item.seriesImage})`,
                    }}
                  >
                    {/* <img src={item.seriesImage} alt={item.seriesTitle} /> */}
                    {item.seriesLogo && (
                      <div className="series-info" onClick={() => redirectToItemDetail(item)}>
                        <img src={item.seriesLogo} alt={item.seriesTitle} />
                      </div>
                    )}
                  </div>
                  <div className="series-more-info-container">
                    <div className="series-info-count">
                      {!item.videoCount && `No Episode`}
                      {item.videoCount > 1 && `${item.videoCount} Episodes`}
                      {item.videoCount === 1 && `${item.videoCount} Episode`}
                    </div>
                    <TextTruncate line={6} element="div" truncateText="…" text={item.seriesDescription} />

                    <button
                      className="btn blue-btn btn-small btn-shadow"
                      onClick={e => toggleSubscribeSeries(e, item.id)}
                    >
                      {isSubscribed ? (
                        <Fragment>
                          <CheckIcon iconfill="#fff" iconWidth="15" iconHeight="15" />
                          {`${Constants.subscribedCaption}${Constants.MENU_TYPE.SERIES}`}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <PlusIcon iconfill="#10a2dd" iconWidth="20" iconHeight="20" />
                          {`${Constants.subscribeToCaption}${Constants.MENU_TYPE.SERIES}`}
                        </Fragment>
                      )}
                    </button>

                    <a
                      className="btn green-btn btn-small btn-shadow btn-pad"
                      href={`/series/${item.seoUrl}/${item.id}`}
                    >
                      {`${Constants.seeAllCaption} ${Constants.ITEM_TYPE.EPISODE}s`}
                    </a>
                    {/* <button className="scroll-icon arrow-top" onClick={() => closeModal(item.id)}>
                      <BottomArrow iconfill="#F1F1F1" iconWidth="28" iconHeight="15" />
                      </button> */}
                  </div>
                </Fragment>
              );
              /* 
                <Fragment>
                  {!isOpenId.includes(item.id) ? (
                    <div className="featured-series" key={item.id}>

                      <img src={item.seriesImage} alt={item.seriesTitle} />
                      {item.seriesLogo && (
                        <div className="series-info">
                          <img src={item.seriesLogo} alt={item.seriesTitle} />
                        </div>
                      )
                     
                      <div className="series-info-toggle-btn">
                        <button className="scroll-icon" onClick={() => openModal(item.id)}>
                          <BottomArrow iconfill="#F1F1F1" iconWidth="28" iconHeight="15" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Fragment>
                      <div className="featured-series" key={item.id}>
                        <img src={item.homepageBanner} alt={item.seriesTitle} />
                        <div className="series-info">
                          {item.seriesImage ? (
                            <img src={item.seriesImage} alt={item.seriesTitle} />
                          ) : (
                            item.seriesLogo && <img src={item.seriesLogo} alt={item.seriesTitle} />
                          )}
                        </div>
                      </div>
                      <div className="series-more-info-container">
                        <div className="series-info-count">{item.videoCount} Episodes</div>
                        <TextTruncate line={6} element="div" truncateText="…" text={item.seriesDescription} />

                        <button
                          className="btn blue-btn btn-small btn-shadow"
                          onClick={e => toggleSubscribeSeries(e, item.id)}
                        >
                          {isSubscribed ? (
                            <Fragment>
                              <CheckIcon iconfill="#fff" iconWidth="15" iconHeight="15" />
                              {`${Constants.subscribedCaption}${Constants.MENU_TYPE.SERIES}`}
                            </Fragment>
                          ) : (
                            <Fragment>
                              <PlusIcon iconfill="#10a2dd" iconWidth="20" iconHeight="20" />
                              {`${Constants.subscribeToCaption}${Constants.MENU_TYPE.SERIES}`}
                            </Fragment>
                          )}
                        </button>

                        <a className="btn green-btn btn-small btn-shadow btn-pad" href={`/series/${item.seoUrl}/${item.id}`}>
                          {`${Constants.seeAllCaption} ${Constants.ITEM_TYPE.EPISODE}s`}
                        </a>
                        <button className="scroll-icon arrow-top" onClick={() => closeModal(item.id)}>
                          <BottomArrow iconfill="#F1F1F1" iconWidth="28" iconHeight="15" />
                        </button>
                      </div>
                    </Fragment>
                  )}
                </Fragment> */
            })}
          <div className="text-center mobile">
            <button
              className="btn more-series green-btn transparent-btn"
              onClick={() => setMenuState(true, Constants.MENU_TYPE.SERIES)}
            >
              {`${Constants.seeMoreCaption} ${Constants.MENU_TYPE.SERIES}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="series-section">
      {featuredSeries && featuredSeries.length > 0 && (
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false}
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl
          transitionDuration={500}
          customTransition="transform 300ms ease-in-out all .5s"
        >
          {featuredSeries.map(item => {
            const isSubscribed = userSubscriptions && userSubscriptions.includes(item.id);
            return (
              <div
                key={item.id}
                className="series-item"
                // style={{ backgroundImage: `url(${item.homepageBanner})` }}
                // onClick={() => redirectToItemDetail(item)}
              >
                <div
                  className="series-featured-image-container"
                  onClick={() => redirectToItemDetail(item)}
                  style={{ backgroundImage: `url(${item.seriesImage})` }}
                >
                  <span onClick={() => redirectToItemDetail(item)}>
                    <PlayIcon iconfill="#ffffff" iconWidth="40" iconHeight="40" />
                  </span>
                </div>
                <div className="series-logo-container">
                  <img
                    onClick={() => redirectToItemDetail(item)}
                    className="series-logo"
                    src={item.seriesLogo}
                    alt={item.seriesTitle}
                    title={item.seriesTitle}
                  />
                </div>
                <div className="series-info">
                  <div className="series-count">
                    {/* {item.videoCount} Episodes */}
                    {!item.videoCount && `No Episode`}
                    {item.videoCount > 1 && `${item.videoCount} Episodes`}
                    {item.videoCount === 1 && `${item.videoCount} Episode`}
                  </div>
                  <TextTruncate line={5} element="div" truncateText="…" text={item.seriesDescription} />
                  {item.mediaId !== 0 && (
                    <div
                      className="video-image-wrapper"
                      onClick={() => redirectToItemDetail(item)}
                      onKeyDown={() => redirectToItemDetail(item)}
                      role="button"
                      tabIndex="0"
                    >
                      {item.videoThumbnail && (
                        <Fragment>
                          <img src={item.videoThumbnail} alt="Thumbnail" />
                          <PlayIcon iconfill="#F1F1F1" iconWidth="20" iconHeight="20" />
                        </Fragment>
                      )}
                      {!item.videoThumbnail && (
                        <div className="thumbnail-mock">
                          <PlayIcon iconfill="#F1F1F1" iconWidth="20" iconHeight="20" />
                        </div>
                      )}
                    </div>
                  )}

                  <button className="btn series-link" onClick={e => toggleSubscribeSeries(e, item.id)}>
                    {isSubscribed ? (
                      <Fragment>
                        <span className="white-icon">
                          <CheckIcon iconfill="#fff" iconWidth="15" iconHeight="15" />
                        </span>
                        {`${Constants.subscribedCaption}${Constants.MENU_TYPE.SERIES}`}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span className="white-icon">
                          <PlusIcon iconfill="#10a2dd" iconWidth="20" iconHeight="20" />
                        </span>
                        {`${Constants.subscribeToCaption}${Constants.MENU_TYPE.SERIES}`}
                      </Fragment>
                    )}
                  </button>
                  <a className="btn series-link episode" href={`/series/${item.seoUrl}/${item.id}`}>
                    {`${Constants.seeAllCaption} ${Constants.ITEM_TYPE.EPISODE}s`}
                  </a>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  series: state.series,
  account: state.account,
});

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreator, dispatch))(withRouter(Series));
