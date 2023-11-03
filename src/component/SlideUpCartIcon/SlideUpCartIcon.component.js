/* eslint-disable max-len */
import { PureComponent } from 'react';

import './SlideUpCartIconOverride.style.scss';

/** @namespace SonbolPwa/Component/SlideUpCartIcon/Component */
export class SlideUpCartIconComponent extends PureComponent {
    render() {
        return (
            <div className="btn-content__wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="24"
                  viewBox="0 0 20 25"
                >
                    <g transform="translate(-155 -761.967)">
                        <g transform="translate(157 763.967)">
                            <g transform="translate(0)">
                                <g transform="translate(0)">
                                    <path d="M68.817,16.439l-.89-11.218a1.4,1.4,0,0,0-1.392-1.289H64.777V3.853a3.853,3.853,0,0,0-7.707,0v.079H55.311A1.4,1.4,0,0,0,53.92,5.22l-.891,11.221a3.246,3.246,0,0,0,3.236,3.494H65.58a3.246,3.246,0,0,0,3.236-3.5ZM58.237,3.853a2.686,2.686,0,0,1,5.371,0v.079H58.237ZM67.105,18.1a2.057,2.057,0,0,1-1.525.666H56.266a2.078,2.078,0,0,1-2.072-2.236l.89-11.221a.229.229,0,0,1,.227-.21H57.07V6.538a.584.584,0,0,0,1.168,0V5.1h5.371V6.538a.584.584,0,0,0,1.168,0V5.1h1.758a.229.229,0,0,1,.227.212l.89,11.218A2.057,2.057,0,0,1,67.105,18.1Z" transform="translate(-53.02)" fill="white" stroke="none" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <span className="btn-text">
                    { __('Add to cart') }
                </span>
            </div>
        );
    }
}
