import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g id="YouTube">
        <path
          fill={iconfill}
          d="M23.69,7.61a8.7,8.7,0,0,0-.61-2.16,2.38,2.38,0,0,0-2.24-1.67c-.69,0-1.39-.13-2.09-.13-4.47,0-8.94,0-13.4,0a23.34,23.34,0,0,0-2.51.18A2,2,0,0,0,1.18,5a10,10,0,0,0-.8,2.28,29.5,29.5,0,0,0-.08,8.9,10.85,10.85,0,0,0,.77,2.59,2.11,2.11,0,0,0,1.72,1.32,17.91,17.91,0,0,0,1.93.15c2.48.06,12.76,0,12.76,0l2.86-.09a2.82,2.82,0,0,0,3-2.31c.09-.29.17-.58.23-.87A30,30,0,0,0,23.69,7.61Zm-14,8.67V7.59L16.38,12Z"
        />
      </g>
    </svg>
  );
}
