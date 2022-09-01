import React from 'react';

export default function IconUser(props) {
  const iconfill = props.iconfill || 'white';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45.03 43.5"
      width={iconWidth}
      height={iconHeight}
    >
      <path
        fill={iconfill}
        d="M32.16,4c4.92,0,8.91,4.58,8.91,10.2,0,7.39-10.57,18.15-18.55,24.39C14.53,32.31,4,21.55,4,14.16,4,8.54,8,4,12.87,4a8.32,8.32,0,0,1,6.55,3.33l3.1,3.86,3.09-3.86A8.32,8.32,0,0,1,32.16,4m0-4a12.34,12.34,0,0,0-9.64,4.82A12.37,12.37,0,0,0,12.87,0C5.76,0,0,6.34,0,14.16,0,27.38,22.52,43.5,22.52,43.5S45,27.38,45,14.16C45,6.34,39.27,0,32.16,0Z"
      />
    </svg>
  );
}
