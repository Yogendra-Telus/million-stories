import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title></title>
      <rect fill={iconfill} x="4" y="4" width="16" height="16" rx="2" />
      <path
        fill="#ffffff"
        d="M18,20.75H6A2.75,2.75,0,0,1,3.25,18V6A2.75,2.75,0,0,1,6,3.25H18A2.75,2.75,0,0,1,20.75,6V18A2.75,2.75,0,0,1,18,20.75ZM6,4.75A1.25,1.25,0,0,0,4.75,6V18A1.25,1.25,0,0,0,6,19.25H18A1.25,1.25,0,0,0,19.25,18V6A1.25,1.25,0,0,0,18,4.75Z"
      />
      <path fill="#ffffff" d="M12,16.75a.76.76,0,0,1-.75-.75V8a.75.75,0,0,1,1.5,0v8A.76.76,0,0,1,12,16.75Z" />
      <path fill="#ffffff" d="M16,12.75H8a.75.75,0,0,1,0-1.5h8a.75.75,0,0,1,0,1.5Z" />
    </svg>
  );
}
