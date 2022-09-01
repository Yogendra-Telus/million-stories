import React from 'react';

export default function IconAdd(props) {
  const iconfill = props.iconfill || '#ffffff';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38.99 38.99"
      width={iconWidth}
      height={iconHeight}
    >
      <polygon
        fill={iconfill}
        points="38.99 15.25 23.74 15.25 23.74 0 15.41 0 15.34 15.25 0 15.25 0 23.58 15.31 23.65 15.25 38.99 23.74 38.99 23.74 23.68 38.99 23.74 38.99 15.25"
      />
    </svg>
  );
}
