import React, { useState, useEffect } from 'react';
import Clipboard from 'react-clipboard.js';
import queryString from 'query-string';
import CustomModal from '../ModelComponents/CustomModal';
import AppConfig from '../../config/AppConfig';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import trackEventAsync from '../../api/MixPanelApi';
import { EVENT_TYPE } from '../../config/Constants';

const FACEBOOK = 'FACEBOOK';
const TWITTER = 'TWITTER';
const EMAIL = 'EMAIL';
const LINK = 'LINK';

export default ({
  openShareModal,
  toggleOpenShareModal,
  playlist,
  seriesId,
  topicId,
  topicTitle,
  seriesTitle,
  mediaDetails,
  location,
  playLink,
  ...props
}) => {
  useEffect(() => {
    if (playLink) {
      document.addEventListener('copy', e => {
        e.clipboardData.setData('text/plain', `${playLink}`);
      });
    }
  }, [playLink]);

  let queryParams;
  if (location && location.search) {
    queryParams = queryString.parse(location.search);
  }
  const [linkCopied, setLinkCopied] = useState(false);
  const onShare = link => {
    switch (link) {
      case FACEBOOK:
        if (props.isMedia) {
          MixPanel.track(MixPanelEvents.SHARED_VIDEO, {
            id: mediaDetails && mediaDetails.id,
            link: playLink || window.location.href,
            title: (mediaDetails && mediaDetails.name) || seriesTitle || topicTitle,
            shareType: FACEBOOK,
            mediaType: mediaDetails && mediaDetails.mediaType,
            playlistId: (queryParams && queryParams.playlist) || (playlist && playlist.playlistId),
            seriesId,
            topicId,
          });
          trackEventAsync(EVENT_TYPE.VIDEO_SHARE, mediaDetails.id);
          if (props.setMediaShared) {
            props.setMediaShared(true);
          }
        }
        window.open(`${AppConfig.FacebookShare}${encodeURIComponent(playLink || window.location.href)}`, '_blank');
        break;
      case TWITTER:
        if (props.isMedia) {
          MixPanel.track(MixPanelEvents.SHARED_VIDEO, {
            id: mediaDetails && mediaDetails.id,
            link: playLink || window.location.href,
            title: (mediaDetails && mediaDetails.name) || seriesTitle || topicTitle,
            shareType: TWITTER,
            mediaType: mediaDetails && mediaDetails.mediaType,
            playlistId: (queryParams && queryParams.playlist) || (playlist && playlist.playlistId),
            seriesId,
            topicId,
          });
          trackEventAsync(EVENT_TYPE.VIDEO_SHARE, mediaDetails.id);
          if (props.setMediaShared) {
            props.setMediaShared(true);
          }
        }
        window.open(`${AppConfig.TwitterShare}${encodeURIComponent(playLink || window.location.href)}`, '_blank');
        break;
      case EMAIL:
        if (props.isMedia) {
          MixPanel.track(MixPanelEvents.SHARED_VIDEO, {
            id: mediaDetails && mediaDetails.id,
            link: playLink || window.location.href,
            title: (mediaDetails && mediaDetails.name) || seriesTitle || topicTitle,
            shareType: EMAIL,
            mediaType: mediaDetails && mediaDetails.mediaType,
            playlistId: (queryParams && queryParams.playlist) || (playlist && playlist.playlistId),
            seriesId,
            topicId,
          });
          trackEventAsync(EVENT_TYPE.VIDEO_SHARE, mediaDetails.id);
          if (props.setMediaShared) {
            props.setMediaShared(true);
          }
        }
        window.open(`${AppConfig.MailShare}${encodeURIComponent(playLink || window.location.href)}`, '_blank');
        break;
      case LINK:
        if (props.isMedia) {
          MixPanel.track(MixPanelEvents.SHARED_VIDEO, {
            id: mediaDetails && mediaDetails.id,
            link: playLink || window.location.href,
            title: (mediaDetails && mediaDetails.name) || seriesTitle || topicTitle,
            shareType: LINK,
            mediaType: mediaDetails && mediaDetails.mediaType,
            playlistId: (queryParams && queryParams.playlist) || (playlist && playlist.playlistId),
            seriesId,
            topicId,
          });
          trackEventAsync(EVENT_TYPE.VIDEO_SHARE, mediaDetails.id);
          if (props.setMediaShared) {
            props.setMediaShared(true);
          }
        }
        return AppConfig.BaseUrl;
      default:
        toggleOpenShareModal();
    }
    return toggleOpenShareModal();
  };

  const onSuccess = () => {
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
    onShare(LINK);
  };

  const getText = () => playLink || `${window.location.href}`;

  return (
    <CustomModal
      title="Share"
      visible={openShareModal}
      footer={null}
      className="share-modal custom-modal"
      onCancel={() => {
        toggleOpenShareModal();
      }}
      {...props}
    >
      <div
        className="share-link"
        onClick={() => onShare(FACEBOOK)}
        onKeyDown={() => onShare(FACEBOOK)}
        tabIndex="0"
        role="button"
      >
        <span>
          <i className="fa fa-facebook-square" />
          Facebook
        </span>
      </div>
      <div
        className="share-link"
        onClick={() => onShare(TWITTER)}
        onKeyDown={() => onShare(TWITTER)}
        tabIndex="0"
        role="button"
      >
        <span>
          <i className="fa fa-twitter-square" />
          Twitter
        </span>
      </div>
      <div
        className="share-link"
        onClick={() => onShare(EMAIL)}
        onKeyDown={() => onShare(EMAIL)}
        tabIndex="0"
        role="button"
      >
        <span>
          <i className="fa fa-envelope" />
          Email
        </span>
      </div>

      <Clipboard
        style={{
          backgroundColor: 'transparent',
          color: 'lightgray',
          border: 'none',
          padding: 0,
          width: '100%',
          boxShadow: 'none',
        }}
        option-text={getText}
        onSuccess={onSuccess}
      >
        <div className="share-link">
          <span className="no-border">
            <i className="fa fa-link" />
            Link
          </span>
          {linkCopied && <span className="custom-tooltip">Link copied!</span>}
        </div>
      </Clipboard>
    </CustomModal>
  );
};
