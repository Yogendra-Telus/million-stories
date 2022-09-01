import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <rect fill={iconfill} width="24" height="24" rx="6" />
      <path
        fill="#ffffff"
        d="M1.79,11.85s3.79,1.65,4.89,7.79a4.18,4.18,0,0,0,4.54,0s1.61-7.66,11-14.7a2.52,2.52,0,0,0-1.55-1.23A41.32,41.32,0,0,0,9.3,13.43s-.48-1.24-3.44-3.65C5.86,9.78,3.93,9.36,1.79,11.85Z"
      />
    </svg>
  );
}
