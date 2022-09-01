import React from  'react';

export default function IconUser (props) {
    const iconfill = props.iconfill || 'orangered'
    const iconWidth = props.iconWidth || '40'
    const iconHeight = props.iconHeight || '40'
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.99 42.97"  width={iconWidth} height={iconHeight} >
            <polygon fill={iconfill} points="3.96 18.5 0 18.5 0 0 18.45 0 18.45 3.96 3.96 3.96 3.96 18.5"/>
            <polygon fill={iconfill} points="42.99 18.48 39.03 18.48 39.03 3.98 24.5 3.98 24.5 0.02 42.99 0.02 42.99 18.48"/>
            <polygon fill={iconfill} points="42.99 42.98 24.5 42.98 24.5 39.02 39.03 39.02 39.03 24.48 42.99 24.48 42.99 42.98"/>
            <polygon fill={iconfill} points="18.45 42.95 0 42.95 0 24.5 3.96 24.5 3.96 38.99 18.45 38.99 18.45 42.95"/>
        </svg>
    )
}