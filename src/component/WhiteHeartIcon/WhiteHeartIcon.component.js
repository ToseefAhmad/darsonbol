/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
/** @namespace SonbolPwa/Component/WhiteHeartIcon/Component */
export class WhiteHeartIconComponent extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool,
        isPdp: PropTypes.bool,
        isMobile: PropTypes.bool
    };
    render() {
        const { isActive, isPdp, isMobile } = this.props;
        const renderSvg = isPdp && isMobile ? (
            <svg
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              width="25.998"
              height="23.096"
              viewBox="0 0 25.998 23.096"
              block="HeartIcon"
              fill="none"
            >
                <path d="M232.7,304.446c-1.085,8.391-12.376,14.059-12.376,14.059-13.949-8.09-12.459-15.585-12.459-15.585a6.771,6.771,0,0,1,12.459-3.254,6.771,6.771,0,0,1,12.458,3.254v0A10.015,10.015,0,0,1,232.7,304.446Z" transform="translate(-207.283 -295.978)" fill="white" stroke="black" strokeMiterLimit="10" strokeWidth="1" />
            </svg>

        ) : (
            <svg
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              width="25.998"
              height="23.096"
              viewBox="0 0 25.998 23.096"
              block="HeartIcon"
              fill="none"
            >
                <path d="M232.7,304.446c-1.085,8.391-12.376,14.059-12.376,14.059-13.949-8.09-12.459-15.585-12.459-15.585a6.771,6.771,0,0,1,12.459-3.254,6.771,6.771,0,0,1,12.458,3.254v0A10.015,10.015,0,0,1,232.7,304.446Z" transform="translate(-207.283 -295.978)" fill="white" stroke="white" strokeMiterLimit="10" strokeWidth="1" />
            </svg>
        );

        return renderSvg;
    }
}

export default WhiteHeartIconComponent;
