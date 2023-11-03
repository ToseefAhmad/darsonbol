/* eslint-disable max-len */
import { UserIcon as SourceUserIcon } from 'SourceComponent/UserIcon/UserIcon.component';

/** @namespace SonbolPwa/Component/UserIcon/Component */
export class UserIconComponent extends SourceUserIcon {
    render() {
        const { isActive } = this.props;
        return (
            <svg
              block="UserIcon"
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              width="22.957"
              height="22.955"
              viewBox="0 0 22.957 22.955"
            >
                <g transform="translate(0.5 0.5)">
                    <path d="M10.978,0A10.978,10.978,0,1,0,21.957,10.979,10.978,10.978,0,0,0,10.978,0Zm0,3.282A3.631,3.631,0,1,1,7.348,6.915,3.631,3.631,0,0,1,10.978,3.283Zm0,15.8a8.057,8.057,0,0,1-5.247-1.935,1.547,1.547,0,0,1-.543-1.176,3.662,3.662,0,0,1,3.68-3.661h4.225a3.657,3.657,0,0,1,3.674,3.661,1.544,1.544,0,0,1-.543,1.176A8.054,8.054,0,0,1,10.976,19.086Z" transform="translate(0 -0.001)" fill={ isActive ? '#000' : 'none' } stroke="#000" strokeWidth="1" />

                </g>
            </svg>
        );
    }
}

export default UserIconComponent;
