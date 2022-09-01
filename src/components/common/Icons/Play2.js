import React from 'react';

export default function Icon(props) {
  const iconfill = props.iconfill || 'orangered';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  const { onClick } = props;
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.47 35.13"
      width={iconWidth}
      height={iconHeight}
    >
      <title>Play</title>
      <polygon
        fill={iconfill}
        onClick={onClick}
        points="23 14.07 6.03 3.69 0 0 0 7.06 0 28 0 35.13 6.05 31.37 23.02 20.81 28.47 17.42 23 14.07"
      />
    </svg>
  );
}
