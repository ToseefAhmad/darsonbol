/* eslint-disable max-len */
import { PureComponent } from 'react';

import { DirectionType } from 'Type/Direction.type';

import { RIGHT } from './BreadcrumbChevronIcon.config';

import './BreadcrumbChevronIcon.style.scss';
/** @namespace SonbolPwa/Component/BreadcrumbChevronIcon/Component */
export class BreadcrumbChevronIconComponent extends PureComponent {
    static propTypes = {
        direction: DirectionType
    };

    static defaultProps = {
        direction: RIGHT
    };
    render() {
        const { direction } = this.props;

        return (
                <svg
                  block="BreadcrumbChevronIcon"
                  mods={ { direction } }
                  xmlns="http://www.w3.org/2000/svg"
                  width="8.705"
                  height="16.08"
                  viewBox="0 0 8.705 16.08"
                  fill="none"
                >
                    <path d="M1461.509,34.522l-7.293-7.455,7.293-7.211" transform="translate(-1453.512 -19.148)" fill="none" stroke="#11171F" strokeLinecap="round" strokeWidth="1" />

                </svg>
        );
    }
}

export default BreadcrumbChevronIconComponent;
