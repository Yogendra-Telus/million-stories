import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.85 44.58" width={iconWidth} height={iconHeight} >
        <path fill={iconfill} d="M13.85,31.85H0V12.75H13.85ZM4.1,27.75H9.75V16.85H4.1Z"/>
        <path fill={iconfill} d="M30.35,43.59,9.75,31V13.65L30.35,1ZM13.85,28.65l12.4,7.61V8.34L13.85,16Z"/>
        <path fill={iconfill} d="M34.28,12.37a2.05,2.05,0,0,1-1.42-3.53L41.49.57a2.05,2.05,0,1,1,2.84,3L35.7,11.8A2.06,2.06,0,0,1,34.28,12.37Z"/>
        <path fill={iconfill} d="M42.91,44.58A2,2,0,0,1,41.49,44l-8.63-8.27a2.05,2.05,0,0,1,2.84-3l8.63,8.27a2.05,2.05,0,0,1-1.42,3.53Z"/>
        <path fill={iconfill} d="M44.8,24.35H34.3a2.05,2.05,0,1,1,0-4.1H44.8a2.05,2.05,0,1,1,0,4.1Z"/>
    </svg>
    )
}