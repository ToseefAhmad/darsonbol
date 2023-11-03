import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import {
    CheckoutPayment as SourceCheckoutPayment
} from 'SourceComponent/CheckoutPayment/CheckoutPayment.component';

import './CheckoutPayment.override.style';

/** @namespace SonbolPwa/Component/CheckoutPayment/Component */
export class CheckoutPaymentComponent extends SourceCheckoutPayment {
    // TODO implement logic

    render() {
        const {
            isSelected,
            method: { title }
        } = this.props;

        // disable checkbox in order to skip direct clicks on checkbox and handle clicks on entire button instead
        return (
            <li block="CheckoutPayment">
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  type="button"
                  onClick={ this.onClick }
                >
                    <Field
                      type={ FIELD_TYPE.radio }
                      attr={ {
                          id: `option-${ title }`,
                          name: `option-${ title }`,
                          checked: isSelected
                      } }
                      label={ title }
                      isDisabled={ false }
                    />
                </button>
            </li>
        );
    }
}

export default CheckoutPaymentComponent;
