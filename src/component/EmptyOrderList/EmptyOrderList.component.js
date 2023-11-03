import Link from '@scandipwa/scandipwa/src/component/Link';
import React from 'react';

import emptyOrder from '../../style/icons/AccountPage/emptyOrder.png';

import './EmptyOrderList.style';
/** @namespace SonbolPwa/Component/EmptyOrderList/Component/EmptyOrderList */
export function EmptyOrderList() {
    return (
        <section className="empty-orderlist-container">
            <div className="empty-order-list-container">
                <img src={ emptyOrder } alt="empty-order" />
            </div>
            <div className="emptylist-content">
                <div className="no-request">
                    { __('There are no requests') }
                </div>
                <div className="emptytext">
                    { __('Dont miss the chance and shop from our unique collections') }
                </div>
                <div className="emptylist-button">
                    <Link to="/">{ __('shop now') }</Link>
                </div>
            </div>
        </section>
    );
}

export default EmptyOrderList;
