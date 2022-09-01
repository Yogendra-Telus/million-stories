import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 50.69" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M51,25.5A25.5,25.5,0,1,0,21.52,50.69V32.87H15V25.5h6.48V19.88c0-6.39,3.8-9.92,9.63-9.92a39.11,39.11,0,0,1,5.71.5v6.27H33.64c-3.17,0-4.16,2-4.16,4V25.5h7.08l-1.13,7.37H29.48V50.69A25.51,25.51,0,0,0,51,25.5Z"/>
        </svg>
    )
}