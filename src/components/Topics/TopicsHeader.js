import React, { useState } from 'react';
import ShareModal from '../modal/ShareModal';
import AddIcon from '../common/Icons/Subscribe';
import ShareIcon from '../common/Icons/Plane';
import AddedIcon from '../common/Icons/Added';
import * as Constants from '../../config/Constants';
import PlusIcon from '../common/Icons/Add';

const TopicsHeader = ({ topicId, topicTitle, desc, featuredImage, onSubscribeTopics, isUserSubscribed }) => {
  const [openShareModal, setOpenShareModal] = useState(false);

  const toggleOpenShareModal = () => {
    setOpenShareModal(!openShareModal);
  };

  return (
    // <ModalProvider>
    <section
      className="header-section"
      style={{
        backgroundImage: `url(${featuredImage})`,
      }}
    >
      <div className="data-wrapper">
        <h1 className="heading">{topicTitle}</h1>
        <div className="heading-buttons-wrapper">
          <div className="content">
            <p>{desc}</p>
          </div>
          <div className="button-wrapper">
            <button
              className={
                isUserSubscribed
                  ? 'visible-mobile btn light-transparent-btn mr-20 checked'
                  : 'btn light-transparent-btn mr-20 visible-mobile'
              }
              onClick={onSubscribeTopics}
            >
              {!isUserSubscribed && <PlusIcon iconfill="#fff" iconWidth="9" iconHeight="9" />}
              {isUserSubscribed && <AddedIcon iconfill="#fff" iconWidth="15" iconHeight="15" />}
              <span>
                {isUserSubscribed ? Constants.subscribedCaption : Constants.subscribeToCaption}{' '}
                {Constants.ITEM_TYPE.TOPIC}
              </span>
            </button>
            <button className="visible-mobile btn light-transparent-btn share-btn" onClick={toggleOpenShareModal}>
              <ShareIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />
              <span>SHARE</span>
            </button>

            <button
              className={
                isUserSubscribed
                  ? 'visible-desktop btn light-transparent-btn mr-20 checked'
                  : 'btn light-transparent-btn mr-20 visible-desktop'
              }
              onClick={onSubscribeTopics}
            >
              {!isUserSubscribed && <AddIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />}
              {isUserSubscribed && <AddedIcon iconfill="#fff" iconWidth="20" iconHeight="20" />}
              <span>
                {isUserSubscribed ? Constants.subscribedCaption : Constants.subscribeToCaption}{' '}
                {Constants.ITEM_TYPE.TOPIC}
              </span>
            </button>
            <button className="visible-desktop btn light-transparent-btn" onClick={toggleOpenShareModal}>
              <ShareIcon iconfill="#10a2dd" iconWidth="25" iconHeight="25" />
              <span>SHARE</span>
            </button>
          </div>
        </div>
      </div>
      <ShareModal
        openShareModal={openShareModal}
        toggleOpenShareModal={toggleOpenShareModal}
        topicId={topicId}
        topicTitle={topicTitle}
      />
    </section>
    // </ModalProvider>
  );
};

export default TopicsHeader;
