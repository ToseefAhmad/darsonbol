// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './MyAccountIcon.style';

/** @namespace SonbolPwa/Component/MyAccountIcon/Component */
export class MyAccountIconComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
        isActive: PropTypes.bool
    };
    static defaultProps = {
        isActive: false
    };
    state = {
        color: 'black'
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    //     componentDidMount() {
    //         window.addEventListener('scroll', this.listenScrollEvent);
    //     }

    //   listenScrollEvent = () => {
    //       // eslint-disable-next-line no-magic-numbers
    //       if (window.scrollY > 70) {
    //           this.setState({ color: 'black' });
    //       } else {
    //           this.setState({ color: 'white' });
    //       }
    //   };
    render() {
        const { isActive } = this.props;
        // eslint-disable-next-line no-magic-numbers
        const { color } = this.state;
        return (
            <svg
              block="MyAccountIcon"
              mods={ { isActive } }
              width="22.957"
              height="22.955"
              viewBox="0 0 22.957 22.955"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                { /* eslint-disable-next-line max-len */ }
                <g transform="translate(0.5 0.5)"><path d="M10.978,0A10.978,10.978,0,1,0,21.957,10.979,10.978,10.978,0,0,0,10.978,0Zm0,3.282A3.631,3.631,0,1,1,7.348,6.915,3.631,3.631,0,0,1,10.978,3.283Zm0,15.8a8.057,8.057,0,0,1-5.247-1.935,1.547,1.547,0,0,1-.543-1.176,3.662,3.662,0,0,1,3.68-3.661h4.225a3.657,3.657,0,0,1,3.674,3.661,1.544,1.544,0,0,1-.543,1.176A8.054,8.054,0,0,1,10.976,19.086Z" transform="translate(0 -0.001)" fill="none" stroke={ color } /></g>
            </svg>

        );
    }
}

export default MyAccountIconComponent;
