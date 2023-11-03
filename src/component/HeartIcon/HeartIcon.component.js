/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable max-len */
import { HeartIcon as SourceHeartIcon } from 'SourceComponent/HeartIcon/HeartIcon.component';

/** @namespace SonbolPwa/Component/HeartIcon/Component */
export class HeartIconComponent extends SourceHeartIcon {
    state = {
        color: 'black'
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    // componentDidMount() {
    //     window.addEventListener('scroll', this.listenScrollEvent);
    // }

    // listenScrollEvent = () => {
    //     // eslint-disable-next-line no-magic-numbers
    //     if (window.scrollY > 70) {
    //         this.setState({ color: 'black' });
    //     } else {
    //         this.setState({ color: 'white' });
    //     }
    // };

    render() {
        const { isActive } = this.props;
        const { color } = this.state;
        return (
            <svg
                mods={{ isActive }}
                xmlns="http://www.w3.org/2000/svg"
                width="25.998"
                height="23.096"
                viewBox="0 0 25.998 23.096"
                block="HeartIcon"
                fill="none"
            >
                <path d="M232.7,304.446c-1.085,8.391-12.376,14.059-12.376,14.059-13.949-8.09-12.459-15.585-12.459-15.585a6.771,6.771,0,0,1,12.459-3.254,6.771,6.771,0,0,1,12.458,3.254v0A10.015,10.015,0,0,1,232.7,304.446Z" transform="translate(-207.283 -295.978)" fill="none" stroke={color} strokeMiterLimit="10" strokeWidth="1" />
            </svg>
        );
    }
}
export default HeartIconComponent;
