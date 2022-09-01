import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.62 51" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M44.44,6.12,33,40.68,25.56,25.83,25,24.69l-1.13-.59L10.25,17,44.44,6.12M50.62,0,0,16.1,22,27.61,33.79,51,50.62,0Z"/>
            <rect fill={iconfill} x="19.77" y="13.02" width="30.53" height="3.96" transform="translate(-0.69 28.28) rotate(-43.56)"/>
        </svg>
    )
}