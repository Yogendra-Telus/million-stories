import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.88 26.13"width={iconWidth} height={iconHeight} >
            <polygon fill={iconfill} points="2.83 26.13 0.03 23.33 10.28 13.08 0 2.8 2.8 0 15.88 13.08 2.83 26.13"/>
        </svg>
    )
}