/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-len */
// import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './WishList.style.scss';

/** @namespace SonbolPwa/Component/WishListIcon/Component */
export class WishListIconComponent extends PureComponent {
    render() {
        // eslint-disable-next-line react/prop-types
        const { isActive } = this.props;
        return (
            // eslint-disable-next-line react/destructuring-assignment
            <svg
              block="WishListIcon"
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="25.998"
              height="23.096"
              viewBox="0 0 25.998 23.096"
            >
                <path d="M232.7,304.446c-1.085,8.391-12.376,14.059-12.376,14.059-13.949-8.09-12.459-15.585-12.459-15.585a6.771,6.771,0,0,1,12.459-3.254,6.771,6.771,0,0,1,12.458,3.254v0A10.015,10.015,0,0,1,232.7,304.446Z" transform="translate(-207.283 -295.978)" fill={ isActive ? '#000' : 'none' } stroke="#000" strokeMiterLimit="10" strokeWidth="1" />
            </svg>
        );
    }
}

export default WishListIconComponent;
