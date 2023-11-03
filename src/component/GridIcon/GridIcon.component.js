import {
    GridIcon as SourceGridIcon
} from 'SourceComponent/GridIcon/GridIcon.component';

import './GridIcon.override.style';

/** @namespace SonbolPwa/Component/GridIcon/Component */
export class GridIconComponent extends SourceGridIcon {
    // TODO implement logic
    render() {
        const { isActive } = this.props;

        return (
            <svg
              block="GridIcon"
              mods={ { isActive } }
              width="24"
              height="24"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id="b">
                        <rect width="19" height="18" fill="none" />
                    </clipPath>
                </defs>
                <g clipPath="url(#b)">
                    <g transform="translate(-26 -121)">
                        <g transform="translate(26 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="8" height="7" stroke="none" />
                            <rect x="0.25" y="0.25" width="7.5" height="6.5" fill="none" />
                        </g>
                        <g transform="translate(37 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="8" height="7" stroke="none" />
                            <rect x="0.25" y="0.25" width="7.5" height="6.5" fill="none" />
                        </g>
                    </g>
                    <g transform="translate(-26 -110)">
                        <g transform="translate(26 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="8" height="7" stroke="none" />
                            <rect x="0.25" y="0.25" width="7.5" height="6.5" fill="none" />
                        </g>
                        <g transform="translate(37 121)" fill="#e4e2e4" stroke="#5a8a89" strokeWidth="0.5">
                            <rect width="8" height="7" stroke="none" />
                            <rect x="0.25" y="0.25" width="7.5" height="6.5" fill="none" />
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}

export default GridIconComponent;
