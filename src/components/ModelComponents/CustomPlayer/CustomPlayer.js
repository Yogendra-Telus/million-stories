/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactJWPlayer from 'react-jw-player';
import { isIOS, isSafari } from 'react-device-detect';
import _ from 'lodash';
import CustomControls from './CustomControls';
import CustomPlayerPortal from '../CustomPlayerPortal';
import MixPanel from '../../common/MixPanel/MixPanel';
import MixPanelEvents from '../../common/MixPanel/MixPanelEvents';
import AppConfig from '../../../config/AppConfig';
import trackEventAsync from '../../../api/MixPanelApi';
import { EVENT_TYPE } from '../../../config/Constants';
import { HeaderContext } from '../../../providers/HeaderProvider/HeaderProvider';
import MenuContext from '../../../providers/MenuProvider';

const CustomPlayer = ({ activeVideo, subtitles, ...props }) => {
  const panelEl = useRef(null);
  const fullScreen = useRef(null);
  const volume = useRef(null);
  const topEl = useRef(null);
  const imgEl = useRef(null);

  useEffect(() => {
    imgEl.current && props.setPlayerEl(imgEl);
  }, [imgEl.current]);

  const [event25Recorded, setEvent25Recorded] = useState(undefined);
  const [event50Recorded, setEvent50Recorded] = useState(undefined);
  const [event75Recorded, setEvent75Recorded] = useState(undefined);
  const [event100Recorded, setEvent100Recorded] = useState(undefined);
  const [isPlayerRenderd, setIsPlayerRendered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOpenFullScreen, setIsOpenFullScreen] = useState(false);
  const [langSubs, setLangSubs] = useState('');
  const [time, setTime] = useState(null);
  const { setHideHeader } = useContext(HeaderContext);
  const menuContext = useContext(MenuContext);

  const findJWPlayer = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const result = Array.from(mutation.addedNodes).find(item => {
          if (item.classList) return item.classList.contains('video-panel') || item.classList.contains('jw-controls');
          return false;
        });
        if (result) {
          const element = document.getElementsByClassName('jw-spacer')[0];
          panelEl.current = element;
          const fullScreenIcon = document.getElementsByClassName('jw-icon-fullscreen')[0];
          fullScreen.current = fullScreenIcon;
          const volumeIcon = document.getElementsByClassName('jw-icon-volume')[0];
          volume.current = volumeIcon;
          const topPlayer = document.getElementsByClassName('jw-top')[0];
          topEl.current = topPlayer;
          const imgPlayer = document.getElementsByClassName('jwplayer')[0];
          imgEl.current = imgPlayer;
          if (panelEl.current && fullScreen.current) setIsPlayerRendered(true);
        }
      } else if (mutation.type === 'attributes' && mutation.target.id === 'player') {
        const playing = mutation.target.classList.contains('jw-state-playing');
        const inactive = mutation.target.classList.contains('jw-flag-user-inactive');
        const buffering = mutation.target.classList.contains('jw-state-buffering');
        const fullScreenActive = mutation.target.classList.contains('jw-flag-fullscreen');

        if (fullScreenActive) {
          setIsFullScreen(true);
          setIsOpenFullScreen(true);
        } else {
          setIsFullScreen(false);
        }

        if (inactive && (playing || buffering)) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }
      }
    });
  };

  const jwPlayerObserver = new MutationObserver(findJWPlayer);

  useEffect(() => {
    jwPlayerObserver.observe(document.querySelector('#player'), {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
  });

  useEffect(() => {
    if (event100Recorded) {
      const currentPlaylist = props.children.props.videos;
      const currentIndexVideo = currentPlaylist.findIndex(item => item.id === activeVideo.id);
      const nextVideo = currentPlaylist[currentIndexVideo + 1];
      if (props.children.props.playlistId) {
        const currentIdPlaylist = props.children.props.playlistId;
        if (currentPlaylist.length > currentIndexVideo + 1) {
          props.history.push(`/Media/${nextVideo.seoUrl}?video=${nextVideo.id}&playlist=${currentIdPlaylist}`);
        }
      } else if (currentPlaylist.length > currentIndexVideo + 1) {
        if (nextVideo) {
          props.history.push(`/Media/${nextVideo.seoUrl}?video=${nextVideo.id}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event100Recorded]);

  useEffect(() => {
    const result = localStorage.getItem('changeLanguageSubtitles');
    setLangSubs(result);
  }, []);

  const getPercentVideo = (cur, full) => (cur * 100) / full;
  const trackVideoPlayingTime = (e, mediaDetails) => {
    props.UpdateCurrentMediaTime(e.currentTime);
    setTime(e.currentTime);
    if (!event25Recorded && Math.floor(getPercentVideo(e.currentTime, e.duration)) === 25) {
      MixPanel.track(MixPanelEvents.WATCHED_VIDEO_PERCENT_25, {
        id: (mediaDetails && mediaDetails.id) || '',
        title: (mediaDetails && mediaDetails.name) || '',
        mediaType: (mediaDetails && mediaDetails.mediaType) || '',
        partner: (mediaDetails && mediaDetails.source) || '',
      });
      trackEventAsync(EVENT_TYPE.VW_25, mediaDetails.id);
      setEvent25Recorded(true);
    }

    if (!event50Recorded && Math.floor(getPercentVideo(e.currentTime, e.duration)) === 50) {
      MixPanel.track(MixPanelEvents.WATCHED_VIDEO_PERCENT_50, {
        id: (mediaDetails && mediaDetails.id) || '',
        title: (mediaDetails && mediaDetails.name) || '',
        mediaType: (mediaDetails && mediaDetails.mediaType) || '',
        partner: (mediaDetails && mediaDetails.source) || '',
      });

      trackEventAsync(EVENT_TYPE.VW_50, mediaDetails.id);
      setEvent50Recorded(true);
    }

    if (!event75Recorded && Math.floor(getPercentVideo(e.currentTime, e.duration)) === 75) {
      MixPanel.track(MixPanelEvents.WATCHED_VIDEO_PERCENT_75, {
        id: (mediaDetails && mediaDetails.id) || '',
        title: (mediaDetails && mediaDetails.name) || '',
        mediaType: (mediaDetails && mediaDetails.mediaType) || '',
        partner: (mediaDetails && mediaDetails.source) || '',
      });

      trackEventAsync(EVENT_TYPE.VW_75, mediaDetails.id);
      setEvent75Recorded(true);
    }

    if (!event100Recorded && Math.floor(getPercentVideo(e.currentTime, e.duration)) === 100) {
      MixPanel.track(MixPanelEvents.WATCHED_VIDEO_PERCENT_100, {
        id: (mediaDetails && mediaDetails.id) || '',
        title: (mediaDetails && mediaDetails.name) || '',
        mediaType: (mediaDetails && mediaDetails.mediaType) || '',
        partner: (mediaDetails && mediaDetails.source) || '',
      });
      trackEventAsync(EVENT_TYPE.VW_100, mediaDetails.id);
      setEvent100Recorded(true);
    }
  };

  const onSaveLocalStorage = e => {
    if (e.target.className === 'jw-reset-text jw-settings-content-item jw-settings-item-active') {
      const languageSubtitles = e.target.innerText;
      localStorage.setItem('changeLanguageSubtitles', languageSubtitles);
    }
  };
  const jwControlsBar = document.getElementsByClassName('jw-controls')[0];
  jwControlsBar && jwControlsBar.addEventListener('click', onSaveLocalStorage);

  const subs = subtitles.map(item => {
    // eslint-disable-next-line no-param-reassign
    if (item.label === langSubs) item.default = true;
    return item;
  });

  // eslint-disable-next-line no-unused-vars
  const playlist = [
    {
      file: props.videoUrl,
      image: props.thumbnail,
      tracks: subs,
    },
  ];

  useEffect(() => () => props.curTime(time), [time]);

  const onReady = () => {
    const player = window.jwplayer('player');
    player.setConfig([
      {
        autostart: true,
      },
    ]);

    if (_.isNumber(props.time)) {
      player.seek(props.time);
    }

    if (menuContext) {
      player && player.pause();
    }

    if (isIOS) {
      // eslint-disable-next-line no-unused-expressions
      player && player.play();
    }
    if (props.isPause) {
      player && player.pause();
    }
  };

  useEffect(() => {
    isOpenFullScreen && !isFullScreen && onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  const checkedPause = () => {
    if (!menuContext) {
      props.getIsPause(true);
    }
  };

  return (
    <div id="player">
      {props.videoUrl && (
        <ReactJWPlayer
          id="player"
          playerId="player"
          playerScript={AppConfig.JWPlayerScript}
          playlist={playlist}
          onTime={e => trackVideoPlayingTime(e, activeVideo)}
          onReady={onReady}
          onPause={checkedPause}
          onPlay={() => props.getIsPause(false)}
          onResume={() => props.getIsPause(false)}
        />
      )}
      {isPlayerRenderd && activeVideo && (
        <CustomPlayerPortal el={panelEl.current}>
          <CustomControls activeVideo={activeVideo} {...props} />
        </CustomPlayerPortal>
      )}
      {isPlayerRenderd && activeVideo && (
        <CustomPlayerPortal el={topEl.current}>
          <div className="media-title">{activeVideo.name}</div>
        </CustomPlayerPortal>
      )}
      {isPlayerRenderd && activeVideo && (
        <CustomPlayerPortal el={fullScreen.current}>
          <svg
            id="Layer_1"
            className="custom-icon"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42.99 42.97"
          >
            <polygon points="3.96 18.5 0 18.5 0 0 18.45 0 18.45 3.96 3.96 3.96 3.96 18.5" />
            <polygon points="42.99 18.48 39.03 18.48 39.03 3.98 24.5 3.98 24.5 0.02 42.99 0.02 42.99 18.48" />
            <polygon points="42.99 42.98 24.5 42.98 24.5 39.02 39.03 39.02 39.03 24.48 42.99 24.48 42.99 42.98" />
            <polygon points="18.45 42.95 0 42.95 0 24.5 3.96 24.5 3.96 38.99 18.45 38.99 18.45 42.95" />
          </svg>
        </CustomPlayerPortal>
      )}
      {isPlayerRenderd && activeVideo && (
        <CustomPlayerPortal el={volume.current}>
          <svg
            id="Layer_1"
            className="custom-icon"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 46.85 44.58"
            width={25}
            height={25}
          >
            <path d="M13.85,31.85H0V12.75H13.85ZM4.1,27.75H9.75V16.85H4.1Z" />
            <path d="M30.35,43.59,9.75,31V13.65L30.35,1ZM13.85,28.65l12.4,7.61V8.34L13.85,16Z" />
            <path d="M34.28,12.37a2.05,2.05,0,0,1-1.42-3.53L41.49.57a2.05,2.05,0,1,1,2.84,3L35.7,11.8A2.06,2.06,0,0,1,34.28,12.37Z" />
            <path d="M42.91,44.58A2,2,0,0,1,41.49,44l-8.63-8.27a2.05,2.05,0,0,1,2.84-3l8.63,8.27a2.05,2.05,0,0,1-1.42,3.53Z" />
            <path d="M44.8,24.35H34.3a2.05,2.05,0,1,1,0-4.1H44.8a2.05,2.05,0,1,1,0,4.1Z" />
          </svg>
        </CustomPlayerPortal>
      )}

      {props.children}
    </div>
  );
};

export default withRouter(CustomPlayer);
