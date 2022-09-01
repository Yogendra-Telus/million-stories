import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || 'green';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill={iconfill}
        d="M12,11.72A4.74,4.74,0,1,1,16.73,7,4.73,4.73,0,0,1,12,11.72Zm0-8A3.24,3.24,0,1,0,15.23,7,3.24,3.24,0,0,0,12,3.75Z"
      />
      <path
        fill={iconfill}
        d="M20,21.75H4A1.75,1.75,0,0,1,2.25,20V19c0-3.59,5-5.74,9.75-5.74s9.75,2.15,9.75,5.74v1A1.75,1.75,0,0,1,20,21.75Zm-8-7c-4,0-8.25,1.7-8.25,4.24v1a.25.25,0,0,0,.25.25H20a.25.25,0,0,0,.25-.25V19C20.25,16.46,16,14.76,12,14.76Z"
      />
    </svg>
  );
}
