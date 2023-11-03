/* eslint-disable max-len */
import { CartIcon as SourceCartIcon } from 'SourceComponent/CartIcon/CartIcon.component';

/** @namespace SonbolPwa/Component/CartIcon/Component */
export class CartIconComponent extends SourceCartIcon {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    // __construct(props) {
    //     super.__construct(props);
    //     this.state = {
    //         color: 'black'
    //     };
    // }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    // componentDidMount() {
    //     const { isMobile } = this.props;
    //     if (!isMobile) {
    //         window.addEventListener('scroll', this.listenScrollEvent);
    //     } else if (isMobile) {
    //         this.setState({
    //             color: 'black'
    //         });
    //     }
    // }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    //     componentWillUnmount() {
    //         window.removeEventListener('scroll', this.listenScrollEvent);
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
        // const { color } = this.state;
        return (
            <svg
              block="CartIcon mini-cart"
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              width="16.797"
              height="26"
              viewBox="0 0 16.797 26"
            >
                <g transform="translate(0.5 0.5)">
                    <path d="M205.659,16.972a.449.449,0,0,0-.446-.434h-3.474a.289.289,0,0,0-.288.291v.431a1.074,1.074,0,0,0,.2.5.868.868,0,1,1-1.418-.036.962.962,0,0,0,.207-.49v-.4a.29.29,0,0,0-.288-.291H196.43a.289.289,0,0,0-.288.291v.4a.962.962,0,0,0,.207.49.867.867,0,1,1-1.418.036,1.048,1.048,0,0,0,.2-.5v-.431a.29.29,0,0,0-.288-.291h-3.472a.449.449,0,0,0-.446.434l-.528,17.594a.418.418,0,0,0,.421.434h14.954a.418.418,0,0,0,.421-.434Zm-10.026,1.444a.217.217,0,0,0,.217-.217V12.878a2.439,2.439,0,1,1,4.878,0V18.2a.217.217,0,0,0,.434,0V12.878a2.872,2.872,0,1,0-5.745,0V18.2A.217.217,0,0,0,195.634,18.416Z" transform="translate(-190.391 -10)" fill={ isActive ? '#000' : 'none' } stroke="black" strokeWidth="1" />
                </g>
            </svg>
        );
    }
}

export default CartIconComponent;
