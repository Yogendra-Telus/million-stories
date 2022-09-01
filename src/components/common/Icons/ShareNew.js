import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg id="Icons" width={iconWidth} height={iconHeight} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g id="Share">
        <path
          fill={iconfill}
          d="M23.93,18.69a6.75,6.75,0,0,1,0,1.62,4.42,4.42,0,0,1-1.48,2.55,4.6,4.6,0,0,1-4,1.06A4.31,4.31,0,0,1,16,22.49a4.42,4.42,0,0,1-1.19-3.1.3.3,0,0,0-.2-.33l-3.44-1.72L7.56,15.56a4.43,4.43,0,0,1-2.62,1.06,4.4,4.4,0,0,1-2.29-.42A4.59,4.59,0,0,1,.17,13.3c-.07-.21-.12-.43-.17-.65V11.34c0-.08,0-.16.05-.24A4.66,4.66,0,0,1,1.77,8.33,4.52,4.52,0,0,1,5.14,7.4a4.55,4.55,0,0,1,2.43,1l7-3.47a.35.35,0,0,0,.23-.39,4,4,0,0,1,.43-1.95,4.49,4.49,0,0,1,1.12-1.47A4.25,4.25,0,0,1,18,.19L18.74,0H20c.1,0,.21,0,.31.06a4.78,4.78,0,0,1,2.54,1.5A4.36,4.36,0,0,1,24,4.1a4.72,4.72,0,0,1-.26,2.16,4.69,4.69,0,0,1-2.15,2.45,4.58,4.58,0,0,1-2.91.47,4.35,4.35,0,0,1-2.06-.87.29.29,0,0,0-.35,0C14,9.39,11.8,10.51,9.57,11.6c-.27.14-.4.28-.34.57a.05.05,0,0,0,0,0l7,3.51a.27.27,0,0,0,.34-.05,4.25,4.25,0,0,1,2.27-.9,4.65,4.65,0,0,1,2.24.3,4.57,4.57,0,0,1,2.19,1.83A3.59,3.59,0,0,1,23.93,18.69Z"
        />
      </g>
    </svg>
  );
}
