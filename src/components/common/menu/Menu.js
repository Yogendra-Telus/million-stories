/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deviceType } from 'react-device-detect';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ContactModal from '../../ContactUs/ContactModal';
import actionCreator from '../../../store/actions/MenuActions';
import LeftNav from './LeftNav';
import ListViewDesktop from './ListViewDesktop';

const filterTopics = topics => {
  const topicsMap = [];
  const filterParents = _.filter(topics, item => item.parentId === 0);
  if (filterParents && filterParents.length) {
    _.forEach(filterParents, item => {
      const childTopics = _.filter(topics, child => child.parentId === item.id);
      topicsMap.push({ parentTopic: item, childTopics });
    });
  }
  return topicsMap;
};

const Menu = ({ type: menuActionType, displayType, displayMenu, loadMenuOverlay, ...props }) => {
  const [entityType, setEntityType] = useState(displayType);
  const topicMap =
    props.topics && props.topics.items && props.topics.items.length ? filterTopics(props.topics.items) : [];
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };
  useEffect(() => {
    switch (menuActionType) {
      case 'LOAD_MENU_OVERLAY':
        setEntityType(displayType);
        break;
      default:
        break;
    }
  }, [menuActionType, displayType]);

  if (_.isEmpty(props.series) && _.isEmpty(props.topics) && _.isEmpty(props.tools)) {
    loadMenuOverlay();
  }

  const handleMouseOver = selectedType => {
    setEntityType(selectedType);
  };

  const menuClassName = menuState => {
    if (!menuState) {
      return 'flyout-menu slide-out';
    }
    return 'flyout-menu slide-in';
  };

  return (
    <div>
      {displayMenu && (
        <div className={menuClassName(displayMenu)}>
          <div className="flyout-menu-container">
            <LeftNav
              topicMap={topicMap}
              toggleUser={props.toggleUser}
              toggleSignUp={props.toggleSignUp}
              handleMouseOver={handleMouseOver}
              displayType={entityType}
              setMenuState={props.setMenuState}
              displayMenu={displayMenu}
              handleContactModal={handleContactModal}
            />
            <div className="menu-details">
              {!(deviceType === 'mobile') && <ListViewDesktop topicMap={topicMap} displayType={entityType} />}
            </div>
          </div>
          <div className="bottom-bg" />
        </div>
      )}
      <ContactModal isContactModalOpen={isContactModalOpen} handleContactModal={handleContactModal} />
    </div>
  );
};

export default connect(
  state => state.menu,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(Menu);
