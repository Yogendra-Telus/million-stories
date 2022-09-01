import React from 'react';

export default function Icon(props) {
  const iconfill = props.iconfill || 'orangered';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 46.97 27.46"
      width={iconWidth}
      height={iconHeight}
    >
      <polygon fill={iconfill} points="23.49 27.46 0 1.61 1.77 0 23.49 23.9 45.2 0 46.97 1.61 23.49 27.46" />
    </svg>
  );
}
