import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.03 43.5"  width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M32.16,0a12.34,12.34,0,0,0-9.64,4.82A12.37,12.37,0,0,0,12.87,0C5.76,0,0,6.34,0,14.16,0,27.38,22.52,43.5,22.52,43.5S45,27.38,45,14.16C45,6.34,39.27,0,32.16,0Z"/>
        </svg>
    )
}