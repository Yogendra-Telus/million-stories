import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.74 50.21"   width={iconWidth} height={iconHeight} >
            <ellipse  fill={iconfill}  cx="24.37" cy="12.76" rx="13.08" ry="12.76"/>
            <path  fill={iconfill}  d="M0,50.21C0,39.34,10.91,30.52,24.37,30.52s24.37,8.82,24.37,19.69Z"/>
        </svg>
    )
}