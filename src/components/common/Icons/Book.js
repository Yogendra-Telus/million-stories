import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill={iconfill}
        d="M15,14.51a.75.75,0,0,1-.24-1.46,15.37,15.37,0,0,1,3.16-.68.74.74,0,0,1,.82.67.74.74,0,0,1-.66.82,14.25,14.25,0,0,0-2.84.61A.67.67,0,0,1,15,14.51Z"
      />
      <path
        fill={iconfill}
        d="M9,14.51a.67.67,0,0,1-.24,0,14.25,14.25,0,0,0-2.84-.61A.75.75,0,0,1,5.25,13a.77.77,0,0,1,.83-.67,15.37,15.37,0,0,1,3.16.68A.75.75,0,0,1,9,14.51Z"
      />
      <path
        fill={iconfill}
        d="M15,10.51a.75.75,0,0,1-.24-1.46,15.37,15.37,0,0,1,3.16-.68.74.74,0,0,1,.82.67.74.74,0,0,1-.66.82,14.25,14.25,0,0,0-2.84.61A.67.67,0,0,1,15,10.51Z"
      />
      <path
        fill={iconfill}
        d="M9,10.51a.67.67,0,0,1-.24,0,14.25,14.25,0,0,0-2.84-.61A.75.75,0,0,1,5.25,9a.77.77,0,0,1,.83-.67,15.37,15.37,0,0,1,3.16.68A.75.75,0,0,1,9,10.51Z"
      />
      <path
        fill={iconfill}
        d="M12,20.75a.75.75,0,0,1-.38-.1A14.19,14.19,0,0,0,4,18.6a1.74,1.74,0,0,1-1.71-1.75V5a1.77,1.77,0,0,1,.54-1.26A1.72,1.72,0,0,1,4,3.25a16.79,16.79,0,0,1,8,2,16.79,16.79,0,0,1,8-2,1.67,1.67,0,0,1,1.25.49A1.77,1.77,0,0,1,21.75,5V16.85A1.74,1.74,0,0,1,20,18.6a14.21,14.21,0,0,0-7.66,2A.75.75,0,0,1,12,20.75Zm-8-16a.22.22,0,0,0-.16.07A.25.25,0,0,0,3.75,5V16.85A.25.25,0,0,0,4,17.1a15.72,15.72,0,0,1,8,2,15.72,15.72,0,0,1,8-2,.25.25,0,0,0,.24-.25V5a.25.25,0,0,0-.08-.18A.26.26,0,0,0,20,4.75a15.49,15.49,0,0,0-7.64,2,.81.81,0,0,1-.74,0A15.49,15.49,0,0,0,4,4.75Z"
      />
      <path fill={iconfill} d="M12,20.75a.75.75,0,0,1-.75-.75V6.13a.75.75,0,1,1,1.5,0V20A.75.75,0,0,1,12,20.75Z" />
    </svg>
  );
}
