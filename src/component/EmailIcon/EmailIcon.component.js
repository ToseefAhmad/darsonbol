// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './EmailIcon.style';

/** @namespace SonbolPwa/Component/EmailIcon/Component */
export class EmailIconComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    render() {
        return (
            <svg
              block="EmailIcon"
              height="16.196"
              width="22.055"
              viewBox="0 0 22.055 16.196"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                { /* eslint-disable-next-line max-len */ }
                <path d="M19.47,68H2.585A2.587,2.587,0,0,0,0,70.585V81.612A2.587,2.587,0,0,0,2.585,84.2H19.47a2.587,2.587,0,0,0,2.585-2.585V70.585A2.587,2.587,0,0,0,19.47,68Zm.862,13.612a.862.862,0,0,1-.862.862H2.585a.862.862,0,0,1-.862-.862V70.585a.862.862,0,0,1,.862-.862H19.47a.862.862,0,0,1,.862.862Z" transform="translate(0 -68)" fill="#505459" />
                { /* eslint-disable-next-line max-len */ }
                <path d="M39.083,92.937l-9.261,5.888-9.261-5.888-1.04,1.2,10.3,6.549,10.3-6.549Z" transform="translate(-19.522 -92.937)" fill="#505459" />
            </svg>

        );
    }
}

export default EmailIconComponent;
