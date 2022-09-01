import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.21 39.99" width={iconWidth} height={iconHeight} >
            <path fill={iconfill} d="M15.48,40C34,40,44.2,24.61,44.2,11.27c0-.44,0-.88,0-1.31a20.55,20.55,0,0,0,5-5.23,19.86,19.86,0,0,1-5.8,1.59A10.15,10.15,0,0,0,47.85.74a20.06,20.06,0,0,1-6.41,2.45A10.1,10.1,0,0,0,24,10.09a10.29,10.29,0,0,0,.26,2.31A28.69,28.69,0,0,1,3.42,1.85,10.12,10.12,0,0,0,6.55,15.33,10,10,0,0,1,2,14.06v.13a10.11,10.11,0,0,0,8.09,9.9,10.1,10.1,0,0,1-2.66.35,9.77,9.77,0,0,1-1.89-.18,10.1,10.1,0,0,0,9.43,7A20.26,20.26,0,0,1,2.41,35.6,21.23,21.23,0,0,1,0,35.46,28.61,28.61,0,0,0,15.48,40"/>
        </svg>
    )
}