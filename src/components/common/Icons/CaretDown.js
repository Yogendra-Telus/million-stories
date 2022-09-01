import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.13 15.88" width={iconWidth} height={iconHeight} >
            <polygon fill={iconfill} points="13.05 15.88 0 2.83 2.8 0.03 13.05 10.28 23.33 0 26.13 2.8 13.05 15.88"/>
        </svg>
    )
}