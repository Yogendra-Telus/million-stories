/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import IconAdd from '../../Icons/Add';
import IconAdded from '../../Icons/Added';

const Content = ({ isContentTruncated, isContentCollapsed, truncatedContent, initialContent, setVisibility }) => {
  const content = isContentCollapsed ? truncatedContent : initialContent;

  const handleToggle = () => {
    setVisibility(!isContentCollapsed);
  };

  return (
    <p className="descriptionContent">
      {content}
      {isContentTruncated && (
        <span onClick={handleToggle}>
          {isContentCollapsed ? (
            <IconAdd iconHeight="10" iconWidth="10" iconfill="#000" />
          ) : (
            <IconAdded iconHeight="10" iconWidth="10" iconfill="#000" />
          )}
        </span>
      )}
    </p>
  );
};

export default Content;
