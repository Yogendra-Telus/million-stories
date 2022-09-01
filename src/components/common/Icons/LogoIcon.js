import React from  'react';

export default function Icon (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="fava-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.54 36.6" width={iconWidth} height={iconHeight} >
           <title></title>
            <path fill={iconfill} d="M19.77,18.3s6.05-8.59,13.5-8.59a11.77,11.77,0,0,1,5.26,1.35L40,9.53h0a19.33,19.33,0,0,0-27.32,0L0,22.94,13.66,36.6,25.75,24.19A27.23,27.23,0,0,1,19.77,18.3ZM52.88,0,40.8,12.41a27.31,27.31,0,0,1,6,5.89s-6,8.59-13.5,8.59A11.73,11.73,0,0,1,28,25.54l-1.49,1.53h0a19.33,19.33,0,0,0,27.32,0L66.54,13.66Z"/>
        </svg>
    )
}