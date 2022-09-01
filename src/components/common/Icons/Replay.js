import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.41 43.12"  width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M11.34,34.66V8.47l21.22,13Zm4-19V27.44l9.57-6Z"/>
            <path fill={iconfill} d="M20.21,43.12A20.23,20.23,0,0,1,0,22.91H3.66A16.55,16.55,0,1,0,20.21,6.37V2.71a20.21,20.21,0,0,1,0,40.41Z"/>
            <polygon fill={iconfill} points="23.02 9.32 15.35 4.65 23 0 23.02 9.32"/>
        </svg>
    )
}