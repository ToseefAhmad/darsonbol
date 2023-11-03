/* eslint-disable max-len */
import {
    ChevronIcon as SourceChevronIcon
} from 'SourceComponent/ChevronIcon/ChevronIcon.component';

import './ChevronIcon.override.style';

/** @namespace SonbolPwa/Component/ChevronIcon/Component */
export class ChevronIconComponent extends SourceChevronIcon {
    // TODO implement logic
    render() {
        const { direction } = this.props;

        return (
            <svg
              block="ChevronIcon"
              mods={ { direction } }
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.8535 13.707L11.5605 7.99997L5.8535 2.29297L4.4395 3.70697L8.7325 7.99997L4.4395 12.293L5.8535 13.707Z" />
            </svg>
            // <svg
            //   block="ChevronIcon"
            //   mods={ { direction } }
            //   xmlns="http://www.w3.org/2000/svg"
            //   width="8.705"
            //   height="16.08"
            //   viewBox="0 0 8.705 16.08"
            //   fill="none"
            // >
            //     <path d="M1461.509,34.522l-7.293-7.455,7.293-7.211" transform="translate(-1453.512 -19.148)" fill="none" stroke="#11171F" strokeLinecap="round" strokeWidth="1" />

        // </svg>
        );
    }
}

export default ChevronIconComponent;
