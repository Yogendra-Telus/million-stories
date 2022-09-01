import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg 
      id="Icons" 
      width={iconWidth}
      height={iconHeight}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 23.31">
        <title></title>
        <path 
          fill={iconfill}
          d="M20.13,1.82A6.62,6.62,0,0,0,12,4,6.62,6.62,0,0,0,3.87,1.82,6.41,6.41,0,0,0,.6,10.41c1.49,3.25,5.79,4,11.4,11.68,5.61-7.64,9.91-8.43,11.4-11.68A6.41,6.41,0,0,0,20.13,1.82Z"/>
      </svg>
  );
}
