// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './RulerIcon.style';

/** @namespace SonbolPwa/Component/RulerIcon/Component */
export class RulerIconComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    render() {
        return (
            <svg
              block="RulerIcon"
              height="17"
              width="17.001"
              viewBox="0 0 17 17.001"
              xmlns="http://www.w3.org/2000/svg"
            >
                { /* eslint-disable-next-line max-len */ }
                <path d="M3.634,8.1,8.1,3.635,6.638,2.17,4.59,4.218a.263.263,0,0,1-.372,0l-.372-.372a.263.263,0,0,1,0-.372L5.893,1.425,4.776.308a1.053,1.053,0,0,0-1.49,0L.308,3.287a1.053,1.053,0,0,0,0,1.49Zm12.9-3.878a1.6,1.6,0,0,0,0-2.256l-1.5-1.5a1.6,1.6,0,0,0-2.256,0L11.246,1.994,15,5.753ZM10.495,2.746.633,12.606.01,16.173a.7.7,0,0,0,.816.815l3.568-.626L14.253,6.5Zm6.2,9.477-1.117-1.117-2.048,2.048a.263.263,0,0,1-.372,0l-.372-.372a.264.264,0,0,1,0-.372l2.048-2.048L13.365,8.9,8.9,13.364l3.327,3.327a1.053,1.053,0,0,0,1.49,0l2.979-2.978a1.053,1.053,0,0,0,0-1.49Z" transform="translate(0 0.001)" fill="#5a8a89" />
            </svg>
        );
    }
}

export default RulerIconComponent;
