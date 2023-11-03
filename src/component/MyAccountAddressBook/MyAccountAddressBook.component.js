/* eslint-disable max-len */
import AddressBlockComponent from 'Component/AddressBlock';
import {
    MyAccountAddressBook as SourceMyAccountAddressBook
} from 'SourceComponent/MyAccountAddressBook/MyAccountAddressBook.component';
import { getDefaultAddressLabel } from 'Util/Address';

import './MyAccountAddressBook.override.style';

/** @namespace SonbolPwa/Component/MyAccountAddressBook/Component */
export class MyAccountAddressBookComponent extends SourceMyAccountAddressBook {
    // TODO implement logic

    renderActions() {
        const { showCreateNewPopup } = this.props;
        return (
            <button
              block="Button"
              mix={ { block: 'MyAccountAddressBook', elem: 'Button' } }
              mods={ { isHollow: true } }
              onClick={ showCreateNewPopup }
            >
                <span className="plus-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                    >
                        <path d="M6,0a.667.667,0,0,1,.667.667V5.333h4.667a.667.667,0,1,1,0,1.333H6.667v4.667a.667.667,0,1,1-1.333,0V6.667H.667a.667.667,0,1,1,0-1.333H5.333V.667A.667.667,0,0,1,6,0Z" fill="#131415" />
                    </svg>

                </span>
                { ' ' }
                <span className="add-new-address">{ __('Add new address') }</span>
            </button>
        );
    }

    renderAddress(address, index) {
        const addressNumber = index + 1;
        const postfix = getDefaultAddressLabel(address);

        return (
            <AddressBlockComponent
              title={ __('Address #%s', addressNumber) }
              showActions
              defaultLabel={ postfix }
              address={ address }
              key={ addressNumber }
            />
        );
    }
    render() {
        return (
            <div block="MyAccountAddressBook">
                { this.renderAddressList() }
                { this.renderActions() }
                { this.renderPopup() }
            </div>
        );
    }
}

export default MyAccountAddressBookComponent;
