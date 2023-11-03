// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './WhatsAppIcon.style';

/** @namespace SonbolPwa/Component/WhatsAppIcon/Component */
export class WhatsAppIconComponent extends PureComponent {
    // static propTypes = {
    //     // TODO: implement prop-types
    //     // eslint-disable-next-line react/require-default-props
    //     isActive: PropTypes.bool
    // };

    render() {
        return (
            <svg
              block="WhatsAppIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="22.68"
              height="22.681"
              viewBox="0 0 22.68 22.681"
            >
                <path
                  // eslint-disable-next-line max-len
                  d="M19.284,5.546A11.243,11.243,0,0,0,1.595,19.109L0,24.931l5.959-1.564a11.2,11.2,0,0,0,5.371,1.367h.005A11.347,11.347,0,0,0,22.681,13.494a11.283,11.283,0,0,0-3.4-7.948ZM11.335,22.84a9.325,9.325,0,0,1-4.759-1.3l-.339-.2L2.7,22.263l.942-3.448-.223-.354a9.36,9.36,0,1,1,17.36-4.966,9.446,9.446,0,0,1-9.447,9.346Zm5.123-7c-.278-.142-1.661-.82-1.919-.911s-.446-.142-.633.142-.724.911-.891,1.1-.329.213-.608.071a7.644,7.644,0,0,1-3.822-3.341c-.289-.5.289-.461.825-1.534a.52.52,0,0,0-.025-.491C9.315,10.74,8.753,9.358,8.52,8.8c-.228-.547-.461-.471-.633-.481s-.349-.01-.537-.01a1.04,1.04,0,0,0-.749.349A3.156,3.156,0,0,0,5.62,11,5.5,5.5,0,0,0,6.764,13.9a12.549,12.549,0,0,0,4.8,4.243c1.782.77,2.481.835,3.372.7a2.876,2.876,0,0,0,1.893-1.337,2.349,2.349,0,0,0,.162-1.337C16.924,16.051,16.737,15.98,16.459,15.843Z"
                  transform="translate(0 -2.25)"
                  fill="#505459"
                />
            </svg>

        );
    }
}

export default WhatsAppIconComponent;
