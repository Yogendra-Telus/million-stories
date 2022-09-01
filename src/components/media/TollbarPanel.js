import React from 'react';
import VideoToolbar from './VideoToolbar';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';

export default function TollbarPanel({
  isSeeWhatsNextOpen,
  setIsSeeWhatsNextOpen,
  isDiveDeeperOpen,
  setIsDiveDeeperOpen,
  setIsInfoOpen,
  isInfoOpen,
  ...props
}) {
  const close = () => {
    setIsSeeWhatsNextOpen(false);
    setIsDiveDeeperOpen(false);
    setIsInfoOpen(false);
  };

  return (
    <div className={`videotabwrapper${isSeeWhatsNextOpen ? ' hide' : ''}`}>
      <VideoToolbar
        setIsDiveDeeperOpen={() => {
          MixPanel.track(MixPanelEvents.DEEP_DIVE_TRIGGERED);
          setIsDiveDeeperOpen(true);
        }}
        setIsSeeWhatsNextOpen={() => {
          MixPanel.track(MixPanelEvents.DEEP_DIVE_TRIGGERED);
          setIsSeeWhatsNextOpen(true);
        }}
        isOpen={!isDiveDeeperOpen}
        isInfoOpen={isInfoOpen}
        setIsOpen={close}
        isSeeWhatsNextOpen={isSeeWhatsNextOpen}
        setIsInfoOpen={setIsInfoOpen}
        {...props}
      />
    </div>
  );
}
