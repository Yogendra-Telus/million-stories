import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.13 15.88"width={iconWidth} height={iconHeight} >
            <polygon fill={iconfill}  points="2.8 15.88 0 13.08 13.08 0 26.13 13.05 23.33 15.85 13.08 5.6 2.8 15.88"/>
        </svg>        
    )
}