import React, { useState } from 'react';
import { message } from 'antd';
import * as AuthService from '../../utility/AuthService';
import ShareModal from '../modal/ShareModal';
import AddIcon from '../common/Icons/Subscribe';
import ShareIcon from '../common/Icons/Plane';
import AddedIcon from '../common/Icons/Added';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import * as Constants from '../../config/Constants';
import RESPONSE_CODE from '../../config/ResponseCodes';
import PlusIcon from '../common/Icons/Add';

const SeriesHeader = ({ logo, featuredImage, seriesId, title, description, isSeriesSubscribed, ...props }) => {
  const [shareModal, setShareModal] = useState(false);
  const toggleSubscribeSeries = async () => {
    if (AuthService.isAuthenticated()) {
      const userId = AuthService.getUserId();
      if (!isSeriesSubscribed) {
        props
          .subscribeSeries(userId, seriesId)
          .then(() => message.success(`${Constants.subscribedCaption}${Constants.ITEM_TYPE.SERIES}`))
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
          .then(() => message.success(`${Constants.unsubscribedCaption}${Constants.ITEM_TYPE.SERIES}`))
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
    MixPanel.track(MixPanelEvents.SUBSCRIBE_REQUEST, {
      seriesName: title,
    });
  };
  return (
    <section
      className="header-section"
      style={featuredImage !== '' ? { backgroundImage: `url(${featuredImage})` } : { background: 'black' }}
    >
      <div className="data-wrapper">
        <h1 className="heading">
          {logo && <img src={logo} alt="logo" width="200" />}
          {!logo && title}
        </h1>

        <div className="heading-buttons-wrapper">
          <div className="content">
            <p>{description}</p>
          </div>
          <div className="button-wrapper">
            <button
              className={
                isSeriesSubscribed
                  ? ' visible-mobile btn light-transparent-btn mr-20 checked'
                  : 'btn light-transparent-btn mr-20 visible-mobile'
              }
              onClick={toggleSubscribeSeries}
            >
              {!isSeriesSubscribed && <PlusIcon iconfill="#ffffff" iconWidth="9" iconHeight="9" />}
              {isSeriesSubscribed && <AddedIcon iconfill="#fff" iconWidth="20" iconHeight="20" />}
              <span>{isSeriesSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'} TO SERIES</span>
            </button>
            <button
              className="visible-mobile btn light-transparent-btn  btn-width-auto"
              onClick={() => setShareModal(!shareModal)}
            >
              <ShareIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />
              <span> Share</span>
            </button>

            <button
              className={
                isSeriesSubscribed
                  ? ' visible-desktop btn light-transparent-btn mr-20 checked'
                  : 'btn light-transparent-btn mr-20 visible-desktop'
              }
              onClick={toggleSubscribeSeries}
            >
              {!isSeriesSubscribed && <AddIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />}
              {isSeriesSubscribed && <AddedIcon iconfill="#fff" iconWidth="20" iconHeight="20" />}
              <span>{isSeriesSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'} TO SERIES</span>
            </button>
            <button
              className="visible-desktop btn light-transparent-btn  btn-width-auto"
              onClick={() => setShareModal(!shareModal)}
            >
              <ShareIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />
              <span> Share </span>
            </button>
          </div>
        </div>
      </div>
      <ShareModal
        openShareModal={shareModal}
        toggleOpenShareModal={() => setShareModal(!shareModal)}
        seriesId={seriesId}
        seriesTitle={title}
      />
    </section>
  );
};
export default SeriesHeader;
