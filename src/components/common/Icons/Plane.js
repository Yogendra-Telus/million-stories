import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const borderfill = props.borderfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <polygon
        fill={iconfill}
        points="3.14 11.85 18.66 5.87 19.7 6.75 16.53 19.84 11.26 17.43 8.63 18.63 7.65 15.42 3.14 11.85"
      />
      <path
        fill={borderfill}
        d="M19.93,5.43a1.54,1.54,0,0,0-1.54-.26l-15.52,6A1.27,1.27,0,0,0,3,13.54l3.7,1.16,1.26,4.15a1.4,1.4,0,0,0,1,1,1.47,1.47,0,0,0,.36,0,1.41,1.41,0,0,0,1-.4l1.61-1.56,3.33,2.45a1.61,1.61,0,0,0,1,.33,1.8,1.8,0,0,0,.59-.11,1.67,1.67,0,0,0,1-1.2L20.43,6.91A1.56,1.56,0,0,0,19.93,5.43ZM16.32,19.05a.16.16,0,0,1-.1.11.15.15,0,0,1-.14,0l-5.38-4V15l3.92-3.54-1-1.11L9.68,13.91a1.59,1.59,0,0,0,.13,2.46l.83.61-1.33,1.3L8,13.88l0-.06a.57.57,0,0,0-.08-.13.44.44,0,0,0-.08-.11l-.12-.09-.12-.07-.07,0L4,12.31,19,6.6Z"
      />
    </svg>
  );
}
