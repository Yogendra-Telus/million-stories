import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.47 35.13" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M4,7.06l17,10.39L4,28V7.06M0,0V35.13l6.05-3.76L23,20.81l5.45-3.39L23,14.07,6,3.69,0,0Z"/>
        </svg>
    )
}