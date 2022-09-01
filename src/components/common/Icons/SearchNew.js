import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill={iconfill}
        d="M9.3,18.14A8.94,8.94,0,1,1,18.24,9.2,8.95,8.95,0,0,1,9.3,18.14Zm0-15.89a6.95,6.95,0,1,0,6.94,7A7,7,0,0,0,9.3,2.25Z"
      />
      <path
        fill={iconfill}
        d="M22.64,23.74a1,1,0,0,1-.71-.29l-7.77-7.89a1,1,0,0,1,0-1.41,1,1,0,0,1,1.41,0l7.77,7.89a1,1,0,0,1-.71,1.69Z"
      />
    </svg>
  );
}
