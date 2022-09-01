/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';
import { message } from 'antd';

import {
  getVideoUrl,
  getCurrentPlayingMedia,
  getUpcomingMediasById,
  getPlaylistMedia,
  getIsPause,
  validatePartnerMediaExpiration,
  UpdateCurrentMediaTime,
} from '../../store/actions/MediaAction';
import SeeWhatsNextPanel from './SeeWhatsNextPanel';
import TollbarPanel from './TollbarPanel';
import CustomPlayer from '../ModelComponents/CustomPlayer';
import actionCreator from '../../store/actions/AccountActions';
import actionCreatorTopics from '../../store/actions/TopicsActions';
import AppConfig from '../../config/AppConfig';
import CustomPlayerPortal from '../ModelComponents/CustomPlayerPortal';
import CryptoHelper from '../.../../../utility/CryptoHelper';
import * as Constants from '../../config/Constants';
import { URLGenerator } from '../../utility/Helpers';

const Media = props => {
  useEffect(() => {
    props.setDisplay(' media-page');
  }, []);
  const getQueryParams = () => queryString.parse(props.location.search);
  const [isSeeWhatsNextOpen, setIsSeeWhatsNextOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [videos, setVideos] = useState(null);
  const [isDiveDeeperOpen, setIsDiveDeeperOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(Number(AppConfig.DefaultPage) - 1);
  const { v, i, p, video, playlist, topic, serie } = getQueryParams();
  const [itemType, setItemType] = useState(undefined);
  const [limit, setLimit] = useState(false);
  const { currentPlayingMedia, location, playlistMedia, upcomingMedias, currentTime, isPause } = props;
  const { state } = location;

  // v -- mediaId, p-- partnerId
  // i -- mediaId from Edit media preview click

  const getSRTDetails = lstSrt => {
    const lstObj = [];
    _.forEach(lstSrt, item => {
      if (item.srtLanguage) {
        lstObj.push({
          label: item.srtLanguage,
          file: item.preSignedUrl,
          kind: 'captions',
          default: false,
        });
      }
    });
    return lstObj;
  };

  useEffect(() => {
    setVideoUrl('');
    setVideos(null);
  }, []);

  useEffect(() => {
    // Decode mediaId partnerId
    if (v && p) {
      const videoDecoded = CryptoHelper.decryptText(v);
      const partnerId = CryptoHelper.decryptText(p);
      if (videoDecoded && partnerId) {
        props
          .validatePartnerMedia(videoDecoded, partnerId)
          .then(() => {
            UpdateCurrentMediaTime('');
            props
              .getCurrentPlayingMedia(videoDecoded)
              .then(
                res => {
                  if (res.mediaItem.mediaType === Constants.MEDIA_TYPE.EMBEDDED_MEDIA) {
                    if (props.history.action === 'PUSH') {
                      props.history.push(
                        URLGenerator(Constants.MEDIA_TYPE.EMBEDDED_MEDIA, res.mediaItem.id, res.mediaItem.seoUrl)
                      );
                    }
                    props.history.goBack();
                  }
                  if (playlist) {
                    props.getPlaylistMedia(playlist);
                  } else if (serie) {
                    setItemType(Constants.ITEM_TYPE_ENUM.SERIES);
                    props.getUpcomingMedias(Number(videoDecoded), currentPage + 1, Constants.ITEM_TYPE_ENUM.SERIES);
                  } else if (topic) {
                    setItemType(Constants.ITEM_TYPE_ENUM.TOPIC);
                    props.getUpcomingMedias(Number(videoDecoded), currentPage + 1, Constants.ITEM_TYPE_ENUM.TOPIC);
                  } else {
                    setItemType(Constants.ITEM_TYPE_ENUM.RANDOM);
                    props.getUpcomingMedias(Number(videoDecoded), currentPage + 1, Constants.ITEM_TYPE_ENUM.RANDOM);
                  }
                  props.getVideoUrl(encodeURIComponent(res.mediaItem.url));
                },
                // eslint-disable-next-line no-console
                rej => console.log('rej', rej)
              )
              .catch(() => message.error(Constants.mediaIsNotAvailable));
          })
          .catch(() => message.error(Constants.linkIsNotValid));
      }
    }
  }, [v, p]);

  useEffect(() => {
    if (i) {
      const mediaIdDecoded = CryptoHelper.decryptText(i);
      if (mediaIdDecoded) {
        UpdateCurrentMediaTime('');
        props
          .getCurrentPlayingMedia(mediaIdDecoded, true)
          .then(
            res => {
              if (res.mediaItem.mediaType === Constants.MEDIA_TYPE.EMBEDDED_MEDIA) {
                props.history.push(
                  URLGenerator(Constants.MEDIA_TYPE.EMBEDDED_MEDIA, res.mediaItem.id, res.mediaItem.seoUrl)
                );
              }
              props.getVideoUrl(encodeURIComponent(res.mediaItem.url));
            },
            // eslint-disable-next-line no-console
            rej => console.log('rej', rej)
          )
          .catch(() => message.error(Constants.mediaIsNotAvailable));
      }
    }
  }, [i]);

  useEffect(() => {
    if (video && (!currentPlayingMedia.id || Number(currentPlayingMedia.id) !== Number(video))) {
      UpdateCurrentMediaTime('');
      props.getCurrentPlayingMedia(video, true).then(res => {
        const { mediaItem } = res;
        if (mediaItem.mediaType === Constants.MEDIA_TYPE.EMBEDDED_MEDIA) {
          props.history.push(URLGenerator(Constants.MEDIA_TYPE.EMBEDDED_MEDIA, res.mediaItem.id, res.mediaItem.seoUrl));
        }
        if (!state || !state.upcomingVideos || !upcomingMedias) {
          if (playlist) {
            props.getPlaylistMedia(playlist);
          } else if (serie) {
            setItemType(Constants.ITEM_TYPE_ENUM.SERIES);
            props.getUpcomingMedias(Number(video), currentPage + 1, Constants.ITEM_TYPE_ENUM.SERIES);
          } else if (topic) {
            setItemType(Constants.ITEM_TYPE_ENUM.TOPIC);
            props.getUpcomingMedias(Number(video), currentPage + 1, Constants.ITEM_TYPE_ENUM.TOPIC);
          } else if (currentPlayingMedia.seriesId) {
            setItemType(Constants.ITEM_TYPE_ENUM.SERIES);
            props.getUpcomingMedias(Number(video), currentPage + 1, Constants.ITEM_TYPE_ENUM.SERIES);
          } else if (!_.isEmpty(currentPlayingMedia.topicIds)) {
            setItemType(Constants.ITEM_TYPE_ENUM.TOPIC);
            props.getUpcomingMedias(Number(video), currentPage + 1, Constants.ITEM_TYPE_ENUM.TOPIC);
          } else {
            setItemType(Constants.ITEM_TYPE_ENUM.RANDOM);
            props.getUpcomingMedias(Number(video), currentPage + 1, Constants.ITEM_TYPE_ENUM.RANDOM);
          }
        }
        props.getVideoUrl(encodeURIComponent(mediaItem.url));
      });
    }
  }, [video]);

  useEffect(() => {
    setVideoUrl(props.videoUrl);
  }, [props.videoUrl]);

  useEffect(() => {
    if (upcomingMedias && !_.isEmpty(upcomingMedias.items) && currentPage !== upcomingMedias.pageNumber) {
      const consolidatedMedias = !_.isEmpty(videos) ? [...videos, ...upcomingMedias.items] : upcomingMedias.items;
      setVideos(consolidatedMedias);
      setCurrentPage(upcomingMedias.pageNumber);
    } else if (upcomingMedias.items === null) {
      setLimit(true);
    }
  }, [upcomingMedias.items]);

  useEffect(() => {
    if (video && playlist && playlistMedia && playlistMedia.length) {
      setVideos(playlistMedia);
    }
  }, [playlistMedia]);

  useEffect(() => {
    if (!serie && !topic && !playlist && currentPlayingMedia && !_.isEmpty(currentPlayingMedia)) {
      switch (true) {
        case !videos:
          setVideos([currentPlayingMedia]);
          break;
        case !videos.find(vid => vid.id === currentPlayingMedia.id):
          setVideos([currentPlayingMedia]);
          break;
      }
    }
  }, [serie, topic, playlist]);

  const loadMore = () => {
    !limit && props.getUpcomingMedias(Number(video), currentPage + 1, itemType);
  };

  const [playerEl, setPlayerEl] = useState();
  // TODO: Commented as part of SF-1704 need to know why we are storing video time in store.
  const curTime = time => {
    if (time !== null && props.history.action !== 'POP') {
      // props.UpdateCurrentMediaTime(time);
    } else {
      //  props.UpdateCurrentMediaTime('');
    }
  };
  return (
    <div
      className={`mediawrapper ${isSeeWhatsNextOpen ? 'custom-player-see-next' : ''}
      ${isDiveDeeperOpen ? 'custom-player-dive-deeper' : ''}
      ${isInfoOpen ? 'custom-player-info' : ''}
      ${props.currentPlayingMedia.mediaType === 'Podcast Audio' ? 'podcast-media' : ''}`}
    >
      <div
        className={`relative ${isSeeWhatsNextOpen ? 'custom-player-see-next' : ''}
            ${isDiveDeeperOpen ? 'custom-player-dive-deeper' : ''}
            ${isInfoOpen ? 'custom-player-info' : ''}`}
      >
        {currentPlayingMedia && playerEl && (
          <CustomPlayerPortal el={playerEl.current}>
            {currentPlayingMedia.mediaType === 'Podcast Audio' && (
              <img className="podcast-image" src={currentPlayingMedia.featuredImage} alt={currentPlayingMedia.name} />
            )}
          </CustomPlayerPortal>
        )}
        <CustomPlayer
          key={currentPlayingMedia.id}
          activeVideo={currentPlayingMedia}
          videoUrl={videoUrl}
          image={currentPlayingMedia.logo}
          isSharingAllowed={currentPlayingMedia.isSharingAllowed}
          subtitles={getSRTDetails(currentPlayingMedia.lstSrtFile)}
          curTime={curTime}
          time={props.time}
          setPlayerEl={setPlayerEl}
          goToLogin={props.openLoginModal}
          UpdateCurrentMediaTime={time => props.UpdateCurrentMediaTime(time)}
          currentTime={currentTime}
          isPause={isPause}
          getIsPause={pause => props.getIsPause(pause)}
        >
          <SeeWhatsNextPanel
            isOpen={isSeeWhatsNextOpen}
            setIsOpen={() => setIsSeeWhatsNextOpen(false)}
            currentVideo={currentPlayingMedia.id}
            videos={(state && state.upcomingVideos) || videos}
            playlistId={playlist}
            serieId={serie}
            topicId={topic}
            loadMore={loadMore}
          />
        </CustomPlayer>
      </div>
      <TollbarPanel
        videoId={props.currentPlayingMedia.id}
        isSeeWhatsNextOpen={isSeeWhatsNextOpen}
        setIsSeeWhatsNextOpen={setIsSeeWhatsNextOpen}
        setIsDiveDeeperOpen={setIsDiveDeeperOpen}
        isDiveDeeperOpen={isDiveDeeperOpen}
        isInfoOpen={isInfoOpen}
        setIsInfoOpen={setIsInfoOpen}
        tools={props.currentPlayingMedia.tools}
        currMediaTitle={props.currentPlayingMedia.name}
        currMediaDesc={props.currentPlayingMedia.description}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentPlayingMedia: state.media.currentPlayingMedia,
    upcomingVideos: state.media.upcomingVideos || [],
    userData: state.account.userInfo,
    media: state.media.media,
    time: state.media.currentTime,
    playlistMedia: state.media.playlistMedia || [],
    currentTopic: state.topics.currentTopic || {},
    upcomingMedias: state.media.upcomingMedias || [],
    videoUrl: state.media.videoUrl,
    currentTime: state.media.currentTime,
    isPause: state.media.isPause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postSignIn: authData => dispatch(actionCreator.postSignIn(authData)),
    getVideoUrl: id => dispatch(getVideoUrl(id)),
    UpdateCurrentMediaTime: time => dispatch(UpdateCurrentMediaTime(time)),
    getCurrentPlayingMedia: (id, isAllMediaAccess) => dispatch(getCurrentPlayingMedia(id, isAllMediaAccess)),
    getUpcomingMedias: (id, pageNumber, itemType) => dispatch(getUpcomingMediasById(id, pageNumber, itemType)),
    getPlaylistMedia: playlistId => dispatch(getPlaylistMedia(playlistId)),
    getTopicMediaDetails: topicId => dispatch(actionCreatorTopics.getTopicMediaDetails(topicId, 1)),
    getIsPause: isPause => dispatch(getIsPause(isPause)),
    validatePartnerMedia: (mediaId, partnerId) => dispatch(validatePartnerMediaExpiration(mediaId, partnerId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Media));
