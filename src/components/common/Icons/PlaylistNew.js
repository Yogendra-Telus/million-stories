import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.19 24">
      <path fill={iconfill} d="M18.37,3.58h-16a.75.75,0,0,1,0-1.5h16a.75.75,0,0,1,0,1.5Z" />
      <path fill={iconfill} d="M18.37,8.58h-16a.75.75,0,1,1,0-1.5h16a.75.75,0,0,1,0,1.5Z" />
      <path fill={iconfill} d="M10.37,13.58h-8a.75.75,0,1,1,0-1.5h8a.75.75,0,0,1,0,1.5Z" />
      <path fill={iconfill} d="M8.37,18.58h-6a.75.75,0,0,1,0-1.5h6a.75.75,0,0,1,0,1.5Z" />
      <path
        fill={iconfill}
        d="M17.82,21.92a5.75,5.75,0,0,1,0-11.5h0a5.75,5.75,0,0,1,0,11.5Zm0-10a4.25,4.25,0,1,0,4.25,4.25,4.25,4.25,0,0,0-4.25-4.25Z"
      />
      <path fill={iconfill} d="M17.82,18.92a.75.75,0,0,1-.75-.75v-4a.75.75,0,0,1,1.5,0v4A.76.76,0,0,1,17.82,18.92Z" />
      <path fill={iconfill} d="M19.82,16.92h-4a.75.75,0,0,1,0-1.5h4a.75.75,0,0,1,0,1.5Z" />
    </svg>
  );
}
