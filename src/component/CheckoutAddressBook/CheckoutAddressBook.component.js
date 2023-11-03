import {
    CheckoutAddressBook as SourceCheckoutAddressBook
} from 'SourceComponent/CheckoutAddressBook/CheckoutAddressBook.component';
import { getDefaultAddressLabel } from 'Util/Address';

import CheckoutAddressBlock from '../CheckoutAddressBlock';

import './CheckoutAddressBook.override.style';

/** @namespace SonbolPwa/Component/CheckoutAddressBook/Component */
export class CheckoutAddressBookComponent extends SourceCheckoutAddressBook {
    // TODO implement logic

    renderAddress(address, index) {
        const { onAddressSelect, selectedAddressId } = this.props;
        const addressNumber = index + 1;
        const { id } = address;
        const postfix = getDefaultAddressLabel(address);

        return (
            <CheckoutAddressBlock
              onClick={ onAddressSelect }
              isSelected={ selectedAddressId === id }
              title={ __('Address #%s', addressNumber) }
              defaultLabel={ postfix }
              address={ address }
              key={ id }
            />
        );
    }
}

export default CheckoutAddressBookComponent;
