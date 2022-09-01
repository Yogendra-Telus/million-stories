import React from 'react';

export default function IconUser(props) {
  const iconfill = props.iconfill || 'orangered';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 40.1"
      width={iconWidth}
      height={iconHeight}
    >
      <polygon fill={iconfill} points="20.03 40.1 0 18.06 5.46 12.05 20.03 28.09 45.54 0 51 6.01 20.03 40.1" />
    </svg>
  );
}
