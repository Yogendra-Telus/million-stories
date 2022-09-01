import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (

        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51.01"  width={iconWidth} height={iconHeight} >
            <rect fill={iconfill} width="51" height="8.23"/>
            <rect fill={iconfill} y="21.39" width="51" height="8.23"/>
            <rect fill={iconfill} y="42.78" width="51" height="8.23"/>
        </svg>

    )
}