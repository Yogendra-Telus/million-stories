/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import _ from 'lodash';
import Content from './Content';

const MAX_LENGTH_BY_DEFAULT = 100;

const getTruncatedContent = (content, maxLength) => {
  let truncatedContent = null;

  if (content && content.length > maxLength) {
    truncatedContent = _.truncate(content, {
      length: Number(maxLength),
    });
  }

  return truncatedContent;
};

const TruncatedLabel = ({ maxLength = MAX_LENGTH_BY_DEFAULT, content }) => {
  const truncatedContent = getTruncatedContent(content, maxLength);
  const isContentTruncated = !_.isNull(truncatedContent);
  const [isContentCollapsed, setVisibility] = useState(isContentTruncated);

  return (
    <>
      <Content
        isContentTruncated={isContentTruncated}
        isContentCollapsed={isContentCollapsed}
        setVisibility={setVisibility}
        truncatedContent={truncatedContent}
        initialContent={content}
      />
    </>
  );
};

export default TruncatedLabel;
