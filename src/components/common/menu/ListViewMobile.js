/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import * as Constants from '../../../config/Constants';
import MixPanel from '../MixPanel/MixPanel';
import MixPanelEvents from '../MixPanel/MixPanelEvents';
import trackEventAsync from '../../../api/MixPanelApi';

const ListViewMobile = ({ displayType, topicMap, data, ...props }) => {
  const { series, tools } = data;
  return (
    <>
      {displayType === Constants.MENU_TYPE.TOPICS && topicMap && topicMap.length && (
        <div className="fly-out-menu">
          {topicMap &&
            topicMap.length &&
            topicMap.map(item => {
              const { parentTopic, childTopics } = item;
              return (
                <Fragment key={parentTopic.id}>
                  <div>
                    <h3>
                      <span
                        onClick={() => {
                          props.setMenuState(!props.displayMenu, undefined);
                          props.history.push(`/${_.lowerCase(displayType)}/${parentTopic.seoUrl}/${parentTopic.id}`);
                        }}
                      >
                        {parentTopic.topicName}
                      </span>
                    </h3>
                    <div style={{ marginBottom: childTopics.length ? `${childTopics.length}rem` : `1 rem` }}>
                      {childTopics &&
                        childTopics.length > 0 &&
                        childTopics.map(childTp => (
                          <div style={{ marginLeft: '5%' }} key={childTp.id}>
                            <h3 style={{ marginBottom: '1rem' }}>
                              <span
                                onClick={() => {
                                  props.setMenuState(!props.displayMenu, undefined);
                                  props.history.push(`/${_.lowerCase(displayType)}/${childTp.seoUrl}/${childTp.id}`);
                                }}
                              >
                                {childTp.topicName}
                              </span>
                            </h3>
                          </div>
                        ))}
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      )}
      {displayType === Constants.MENU_TYPE.SERIES && series && series.items && series.items.length && (
        <div className="fly-out-menu">
          {series.items.map(item => (
            <h3>
              <span
                key={item.id}
                onClick={() => {
                  props.setMenuState(!props.displayMenu, undefined);
                  props.history.push(`/${_.lowerCase(displayType)}/${item.seoUrl}/${item.id}`);
                }}
              >
                {item.seriesName}
              </span>
            </h3>
          ))}
        </div>
      )}
      {displayType === Constants.MENU_TYPE.TOOLS && tools && tools.items && tools.items.length && (
        <div className="fly-out-menu">
          {tools.items.map(item => (
            <>
              <h3 key={item.id}>
                <a
                  href={`${item.url}`}
                  onClick={() => {
                    MixPanel.track(MixPanelEvents.VISIT_TOOL, {
                      toolUrl: item.url,
                      toolId: item.id,
                      toolName: item.name,
                    });
                    trackEventAsync(Constants.EVENT_TYPE.TOOL_CLICKS, item.id);
                  }}
                >
                  {item.name}
                </a>
              </h3>
            </>
          ))}
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    data: state.menu,
  };
}

export default connect(mapStateToProps)(withRouter(ListViewMobile));
