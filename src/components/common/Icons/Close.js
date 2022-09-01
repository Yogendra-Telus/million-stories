import React from  'react';
export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.58 33.58" width={iconWidth} height={iconHeight} >
            <polygon fill={iconfill} points="0 27.63 27.57 0.06 33.58 6.07 5.89 33.52 0 27.63"/>
            <polygon fill={iconfill} points="5.95 0 33.52 27.57 27.51 33.58 0.06 5.89 5.95 0"/>
        </svg>
    )
}