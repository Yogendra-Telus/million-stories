import React from 'react';

export default function IconEdit(props) {
  const iconfill = props.iconfill || '#333';
  const iconWidth = props.iconWidth || '40';
  const iconHeight = props.iconHeight || '40';
  return (
    <svg width={iconWidth} height={iconHeight} viewBox="0 0 26 23">
      <g id="edit-icon" clipPath="url(#clip-edit-icon)">
        <rect width="26" height="23" fill="#f1f1f1" fillOpacity="0" />
        <path
          id="Path_99"
          data-name="Path 99"
          d="M-270.067,79.373l1.426-1.426a.358.358,0,0,1,.61.254V84.68a2.14,2.14,0,0,1-2.139,2.139h-15.686a2.14,2.14,0,0,1-2.139-2.139V68.994a2.14,2.14,0,0,1,2.139-2.139h12.188a.359.359,0,0,1,.254.611l-1.426,1.426a.353.353,0,0,1-.254.1h-10.762V84.68h15.686V79.622A.35.35,0,0,1-270.067,79.373Zm6.978-8.993-11.7,11.7-4.028.446a1.841,1.841,0,0,1-2.032-2.032l.446-4.028,11.7-11.7a2.6,2.6,0,0,1,3.685,0l1.925,1.925a2.61,2.61,0,0,1,0,3.69Zm-4.4,1.377-2.589-2.589-8.28,8.284-.325,2.91,2.91-.325Zm2.888-3.552-1.925-1.925a.465.465,0,0,0-.659,0l-1.377,1.377,2.589,2.589,1.377-1.377A.475.475,0,0,0-264.6,68.206Z"
          transform="translate(287.994 -64)"
          fill={iconfill}
        />
      </g>
    </svg>
  );
}
