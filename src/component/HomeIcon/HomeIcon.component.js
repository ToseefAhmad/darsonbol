/* eslint-disable max-len */
import { HomeIcon as SourceHomeIcon } from 'SourceComponent/HomeIcon/HomeIcon.component';

/** @namespace SonbolPwa/Component/HomeIcon/Component */
export class HomeIconComponent extends SourceHomeIcon {
    render() {
        const { isActive } = this.props;
        return (
            <svg
              block="HomeIcon"
              mods={ { isActive } }
              xmlns="http://www.w3.org/2000/svg"
              width="23.322"
              height="29.109"
              viewBox="0 0 20.322 17.109"
            >
                <g transform="translate(0.516 0.541)">
                    <path d="M18.98,8.681,10.614,2.327a1.826,1.826,0,0,0-2.011,0L.317,8.681A.745.745,0,0,0,.8,10.049h.8v4.907a3.211,3.211,0,0,0,3.218,3.137H6.431a.76.76,0,0,0,.8-.8V13.347a1.684,1.684,0,0,1,1.609-1.689h1.609a1.684,1.684,0,0,1,1.609,1.689v3.941a.806.806,0,0,0,.8.8h1.609a3.211,3.211,0,0,0,3.218-3.137V10.049h.8A.768.768,0,0,0,18.98,8.681Z" transform="translate(0.025 -2.025)" fill={ isActive ? '#000' : 'none' } stroke="#11171f" strokeWidth="1" />
                </g>
            </svg>
        );
    }
}

export default HomeIconComponent;
