import React from 'react';
import { withRouter } from 'react-router';
import Carousel from 'react-multi-carousel';
import Close from '../common/Icons/Close';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import trackEventAsync from '../../api/MixPanelApi';
import { EVENT_TYPE } from '../../config/Constants';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 50,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
    partialVisibilityGutter: 0,
  },
};

function SeeWhatsNextPanel({ currentVideo, isOpen, setIsOpen, videos, playlistId, serieId, topicId, ...props }) {
  const getHref = ({ id, seoUrl }) => {
    if (serieId) {
      return `/Media/${seoUrl}?video=${id}&serie=${serieId}`;
    }
    if (playlistId) {
      return `/Media/${seoUrl}?video=${id}&playlist=${playlistId}`;
    }
    if (topicId) {
      return `/Media/${seoUrl}?video=${id}&topic=${topicId}`;
    }
    return `/Media/${seoUrl}?video=${id}`;
  };

  const playVideo = video => {
    const url = getHref(video);
    props.history.push(url);
    MixPanel.track(MixPanelEvents.WATCHED_VIDEO, {
      id: video.id,
      title: video.title,
    });
    trackEventAsync(EVENT_TYPE.VIDEO_WATCH, video.id);
  };

  return (
    <div className={`video-panel${isOpen ? ' active' : ''}`}>
      <div className="panel-wrapper">
        <div className="row justify-content-between header-panel">
          <span>What&apos;s Next</span>
          <span className="close-video-panel-btn" onClick={setIsOpen} onKeyDown={setIsOpen} tabIndex="0" role="button">
            <span>Close</span>
            <Close iconWidth="18" iconHeight="18" iconfill="#fff" />
          </span>
        </div>
      </div>
      {videos && videos.length && (
        <Carousel
          centerMode
          customRightArrow={
            <CustomArrow
              isRight
              loadMore={props.loadMore}
              style={{ right: 0 }}
              Arrow={() => <i className="fa fa-angle-right" />}
            />
          }
          customLeftArrow={<CustomArrow style={{ left: 0 }} Arrow={() => <i className="fa fa-angle-left" />} />}
          infinite
          responsive={responsive}
        >
          {videos.map(video => (
            <div
              key={video.id}
              role="button"
              className="video-item-wrapper"
              tabIndex="0"
              onKeyDown={() => (currentVideo !== video.id ? playVideo(video) : {})}
              onClick={() => (currentVideo !== video.id ? playVideo(video) : {})}
            >
              <div
                className={`video-block${currentVideo === video.id ? ' current' : ''}`}
                style={{
                  backgroundImage: `url(${video && (video.featuredImage || video.thumbnail)})`,
                  backgroundSize: 'cover',
                }}
                key={video.id}
              >
                <div className="video-block-name">
                  <span>{video.title}</span>
                </div>
                {currentVideo === video.id ? (
                  <span className="now-playing">{currentVideo === video.id ? 'now playing' : ''}</span>
                ) : (
                  <div className="play-btn">
                    <i className="fa fa-play" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

const CustomArrow = ({ Arrow, isRight, style, onClick, loadMore }) => (
  <div
    className="custom-arrow"
    style={style}
    onClick={() => {
      isRight && loadMore();
      onClick();
    }}
    onKeyDown={onClick}
    tabIndex="0"
    role="button"
  >
    <Arrow />
  </div>
);

export default withRouter(SeeWhatsNextPanel);
