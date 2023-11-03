/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable max-len */
import paymentMethods from '../../style/icons/logos/paymentmethod.png';

import './PaymentMethodsFooter.style';
/** @namespace SonbolPwa/Component/PaymentMethodsFooter/Component/PaymentMethodsFooter */
export function PaymentMethodsFooter(props) {
    const { isMobile } = props;
    return (
        <>
            <div className="footer-wrapper">
                <div className="footer-title">
                    { isMobile ? <span className="footer-title__name">{ __('Payment method') }</span> : <span className="footer-title__name">{ __('Accepted Payment Methods') }</span> }
                </div>
                <div className="footer-content">
                    <img src={ paymentMethods } alt="payment-methods" />
                </div>
            </div>
            <div className="footer-bottom">
                <span className="footer-bottom__title">
                    { __('2022 Alrights are Reserved by SONBOL') }
                </span>
            </div>
        </>
    );
}

export default PaymentMethodsFooter;
