import {
    CheckoutPayments as SourceCheckoutPayments
} from 'SourceComponent/CheckoutPayments/CheckoutPayments.component';

import './CheckoutPayments.override.style';

/** @namespace SonbolPwa/Component/CheckoutPayments/Component */
export class CheckoutPaymentsComponent extends SourceCheckoutPayments {
    // TODO implement logic
    renderContent() {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <p>{ __('The error occurred during initializing payment methods. Please try again later!') }</p>
            );
        }

        return (
            <>
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
            </>
        );
    }
}

export default CheckoutPaymentsComponent;
