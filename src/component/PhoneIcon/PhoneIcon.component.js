// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './PhoneIcon.style';

/** @namespace SonbolPwa/Component/PhoneIcon/Component */
export class PhoneIconComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    render() {
        return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.9"
              height="20.928"
              viewBox="0 0 20.9 20.928"
            >
                <path
                  // eslint-disable-next-line max-len
                  d="M3.311,7.053A1.54,1.54,0,0,1,3.7,6.217L6.839,3.081q.366-.314.549.1L9.922,7.942a.684.684,0,0,1-.131.81L8.642,9.9a1.3,1.3,0,0,0-.366.81,3.989,3.989,0,0,0,.81,2.012,17.183,17.183,0,0,0,1.594,2.091l.81.835c.244.244.557.545.942.9a15.775,15.775,0,0,0,1.894,1.411,4.239,4.239,0,0,0,2.077.875,1.138,1.138,0,0,0,.836-.34L18.6,17.14a.574.574,0,0,1,.783-.1l4.574,2.691a.382.382,0,0,1,.209.274.334.334,0,0,1-.1.3l-3.136,3.136a1.536,1.536,0,0,1-.835.391,6.322,6.322,0,0,1-2.888-.353,13.067,13.067,0,0,1-2.978-1.424q-1.372-.888-2.548-1.8T9.793,18.681l-.679-.654q-.261-.261-.692-.719t-1.5-1.8A26.243,26.243,0,0,1,5.062,12.88,15.32,15.32,0,0,1,3.7,9.967,6.2,6.2,0,0,1,3.311,7.053Z"
                  transform="translate(-3.268 -2.947)"
                  fill="#505459"
                />
            </svg>

        );
    }
}

export default PhoneIconComponent;
