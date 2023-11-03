import ChevronIcon from 'Component/ChevronIcon';
import {
    MyAccountTabListItem as SourceMyAccountTabListItem
} from 'SourceComponent/MyAccountTabListItem/MyAccountTabListItem.component';

import './MyAccountTabListItem.override.style';

/** @namespace SonbolPwa/Component/MyAccountTabListItem/Component */
export class MyAccountTabListItemComponent extends SourceMyAccountTabListItem {
    // TODO implement logic
    render() {
        const { children, tabEntry: [, { tabName }], isActive } = this.props;

        return (
            <li
              block="MyAccountTabListItem"
              mods={ { isActive } }
            >
                <button
                  block="MyAccountTabListItem"
                  elem="Button"
                  onClick={ this.changeActiveTab }
                  role="link"
                >
                    { tabName }
                    <ChevronIcon />
                </button>
                { children }
            </li>
        );
    }
}

export default MyAccountTabListItemComponent;
