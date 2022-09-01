import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.96 43.59" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M13.85,31.85H0V12.75H13.85ZM4.1,27.75H9.75V16.85H4.1Z"/>
            <path fill={iconfill} d="M30.35,43.59,9.75,31V13.65L30.35,1ZM13.85,28.65l12.4,7.61V8.34L13.85,16Z"/>
            <path fill={iconfill} d="M3.93,42.73a2,2,0,0,1-1.46-.61,2.05,2.05,0,0,1,0-2.9L41.46.59a2.05,2.05,0,0,1,2.89,2.92l-39,38.62A2,2,0,0,1,3.93,42.73Z"/>
        </svg>
    )
}