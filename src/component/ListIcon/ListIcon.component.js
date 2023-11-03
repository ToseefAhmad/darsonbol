import {
    ListIcon as SourceListIcon
} from 'SourceComponent/ListIcon/ListIcon.component';

import './ListIcon.override.style';

/** @namespace SonbolPwa/Component/ListIcon/Component */
export class ListIconComponent extends SourceListIcon {
    // TODO implement logic

    render() {
        const { isActive } = this.props;

        return (
            <svg
              block="ListIcon"
              mods={ { isActive } }
              width="27"
              height="27"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id="a">
                        <rect width="21" height="21" fill="none" />
                    </clipPath>
                </defs>
                <g clipPath="url(#a)">
                    <g transform="translate(-26 -121)">
                        <g transform="translate(26 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="21" height="5" stroke="none" />
                            <rect x="0.25" y="0.25" width="20.5" height="4.5" fill="none" />
                        </g>
                    </g>
                    <g transform="translate(-26 -114)">
                        <g transform="translate(26 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="21" height="5" stroke="none" />
                            <rect x="0.25" y="0.25" width="20.5" height="4.5" fill="none" />
                        </g>
                    </g>
                    <g transform="translate(-26 -107)">
                        <g transform="translate(26 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="21" height="5" stroke="none" />
                            <rect x="0.25" y="0.25" width="20.5" height="4.5" fill="none" />
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default ListIconComponent;
