/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/prop-types */
import React from 'react';

import Truck from '../../style/icons/cartPage/Truck.png';

/** @namespace SonbolPwa/Component/ProgressBar/Component/ProgressBar */
export function ProgressBar(props) {
    const { bgcolor, completed, remainingAmount } = props;
    const fillerWidth = (completed < 100) ? completed : 100;
    const containerStyles = {
        height: 10,
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: 50
    };

    const fillerStyles = {
        height: '100%',
        width: `${fillerWidth}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    };

    return (
        <>
            <div className="maibboxprograssbar" style={ containerStyles }>
                <div className="prograssbar-dev" style={ fillerStyles } />
                <div className="iconbar">
                    <img src={ Truck } alt="truck" />
                </div>
            </div>
            { completed < 100 ? <span>{ __('Add products worth (%s) to get free shipping', parseInt(remainingAmount)) }</span> : <span>{ __('Now you can enjoy free shipping') }</span> }
        </>
    );
}

export default ProgressBar;
