import React from  'react';
export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.83 40.92" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M8.13,16.61a2,2,0,0,1-2-2,8.53,8.53,0,0,1,8.52-8.52,2,2,0,0,1,0,4,4.56,4.56,0,0,0-4.56,4.56A2,2,0,0,1,8.13,16.61Z"/>
            <path fill={iconfill} d="M14.85,4A10.89,10.89,0,1,1,4,14.85,10.9,10.9,0,0,1,14.85,4m0-4A14.85,14.85,0,1,0,29.7,14.85,14.85,14.85,0,0,0,14.85,0Z"/>
            <path fill={iconfill} d="M35.07,40.92A5.7,5.7,0,0,1,31,39.23l-10-10a2,2,0,0,1,2.8-2.8l10,10a1.8,1.8,0,0,0,2.54-2.54l-10-10A2,2,0,0,1,29.1,21l10,10.05a5.76,5.76,0,0,1-4.07,9.83Z"/>
        </svg>
    )
}