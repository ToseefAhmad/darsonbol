/* eslint-disable max-len */
import React from 'react';

import Link from 'Component/Link';

import EmptyWishListSvg from '../EmptyWishListSvg/EmptyWishListSvg.component';

import './EmptyWishList.style.scss';
/** @namespace SonbolPwa/Component/EmptyWishListComponent/EmptyWishList/Component/EmptyWishList */
export function EmptyWishList() {
    return (
        <section className="wishlist-container">
            <div className="empty-wishlist-icon">
                <EmptyWishListSvg />
            </div>
            <div className="empty-wishlist-content">
                <h3 className="empty-cart-heading">{ __('Your favorite list appears to be empty') }</h3>
                <p>{ __('Like a product? Click the heart to appear here') }</p>
                <Link className="continue-shopping-btn" to="/"><button><span>{ __('Continue shopping') }</span></button></Link>
            </div>
        </section>
    );
}

export default EmptyWishList;
