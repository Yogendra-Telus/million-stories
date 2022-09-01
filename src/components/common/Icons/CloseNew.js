import React from 'react';

export default function IconClose(props) {
  const iconfill = props.iconfill || '#000';
  const iconWidth = props.iconWidth || '23';
  const iconHeight = props.iconHeight || '23';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill={iconfill}
        d="M21.87,18.84a1,1,0,0,1,0,1.44l-1.59,1.59a1,1,0,0,1-1.44,0L12,15,5.16,21.87a1,1,0,0,1-1.44,0L2.13,20.28a1,1,0,0,1,0-1.44L9,12,2.13,5.16a1,1,0,0,1,0-1.43L3.72,2.14a1,1,0,0,1,1.44,0L12,9l6.84-6.84a1,1,0,0,1,1.44,0l1.59,1.59a1,1,0,0,1,0,1.43L15,12Z"
      />
    </svg>
  );
}
