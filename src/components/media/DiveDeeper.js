import React from 'react';
import PlayIcon from '../common/Icons/Play2';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';
import trackEventAsync from '../../api/MixPanelApi';
import { EVENT_TYPE } from '../../config/Constants';

export default function DiveDeeper({ tools = [], isOpen, currMediaTitle, videoId }) {
  return (
    <div className={`expandedsearch${!isOpen ? ' active' : ''}`}>
      <p>WE ALSO FOUND THESE RESOURCES YOU&apos;LL LOVE:</p>
      {tools.map(item => (
        <div className="secondary-action" key={item.id}>
          <h3>{item.name}</h3>
          <button
            className=""
            onClick={() => {
              MixPanel.track(MixPanelEvents.VISIT_TOOL, {
                source: 'DEEP_DIVE',
                videoId,
                videoName: currMediaTitle,
                toolName: item.name,
                toolUrl: item.url,
                toolId: item.id,
              });
              trackEventAsync(EVENT_TYPE.TOOL_CLICKS, videoId);
              window.open(`${item.url}`, '_blank');
            }}
          >
            <PlayIcon iconWidth="20" iconHeight="20" iconfill="#F1F1F1" />
          </button>
        </div>
      ))}
    </div>
  );
}
