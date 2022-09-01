import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as Constants from '../../../config/Constants';
import MixPanel from '../MixPanel/MixPanel';
import MixPanelEvents from '../MixPanel/MixPanelEvents';
import trackEventAsync from '../../../api/MixPanelApi';

class ListViewDesktop extends Component {
  getItemDetails = (url, series, topics) => {
    let items = [];
    let itemType;
    if (url.indexOf(_.lowerCase(Constants.MENU_TYPE.SERIES)) !== -1) {
      itemType = _.lowerCase(Constants.MENU_TYPE.SERIES);
      items = series;
    } else if (url.indexOf(_.lowerCase(Constants.MENU_TYPE.TOPICS)) !== -1) {
      itemType = _.lowerCase(Constants.MENU_TYPE.TOPICS);
      items = topics;
    }
    return { itemType, items };
  };

  render() {
    const { series, tools } = this.props.data.menu;
    const { displayType, topicMap } = this.props;
    return (
      <>
        {displayType === Constants.MENU_TYPE.SERIES && (
          <div className="news-details">
            {series && series.items && series.items.length ? (
              series.items.map(item => (
                <Fragment key={item.id}>
                  <h3>
                    <a className="linkPointer" href={`/${_.lowerCase(displayType)}/${item.seoUrl}/${item.id}`}>
                      {item.seriesName}
                    </a>
                  </h3>
                  <p>{item.description}</p>
                </Fragment>
              ))
            ) : (
              <p>No series found</p>
            )}
          </div>
        )}
        {displayType === Constants.MENU_TYPE.TOPICS && (
          <div className="news-details topics-menu">
            {topicMap && topicMap.length ? (
              topicMap.map(item => {
                const { parentTopic, childTopics } = item;
                return (
                  <Fragment key={parentTopic.id}>
                    <div>
                      <h3>
                        <a
                          className="linkPointer"
                          href={`/${_.lowerCase(displayType)}/${parentTopic.seoUrl}/${parentTopic.id}`}
                        >
                          {parentTopic.topicName}
                        </a>
                      </h3>
                      <div className="flyout-second-menu">
                        {childTopics &&
                          childTopics.length > 0 &&
                          childTopics.map(childTp => (
                            <div>
                              <h3>
                                <a
                                  className="linkPointerChild"
                                  href={`/${_.lowerCase(displayType)}/${childTp.seoUrl}/${childTp.id}`}
                                >
                                  {childTp.topicName}
                                </a>
                              </h3>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <p>No topics found</p>
            )}
          </div>
        )}
        {displayType === Constants.MENU_TYPE.TOOLS && (
          <div className="news-details">
            {tools && tools.items && tools.items.length ? (
              tools.items.map(item => (
                <Fragment key={item.id}>
                  <h3>
                    <a
                      className="linkPointer"
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
                  <p>{item.description}</p>
                </Fragment>
              ))
            ) : (
              <p>No tools found</p>
            )}
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(ListViewDesktop);
