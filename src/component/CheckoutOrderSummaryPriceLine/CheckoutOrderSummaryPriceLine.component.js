import {
    CheckoutOrderSummaryPriceLine as SourceCheckoutOrderSummaryPriceLine
} from 'SourceComponent/CheckoutOrderSummaryPriceLine/CheckoutOrderSummaryPriceLine.component';

import './CheckoutOrderSummaryPriceLine.override.style';

/** @namespace SonbolPwa/Component/CheckoutOrderSummaryPriceLine/Component/formatPrice */
export const formatPrice = (price, currency = 'USD') => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(language, { style: 'currency', currency }).format(price);
};

/** @namespace SonbolPwa/Component/CheckoutOrderSummaryPriceLine/Component */
export class CheckoutOrderSummaryPriceLineComponent extends SourceCheckoutOrderSummaryPriceLine {
    // TODO implement logic
    renderSubPrice() {
        const { subPrice, currency } = this.props;

        if (!subPrice) {
            return null;
        }

        return (
            <span>
                { __('Excl. tax: %s', formatPrice(subPrice, currency)) }
            </span>
        );
    }
    renderPrice() {
        const { price, currency, quote_currency_code } = this.props;
        const currenyCode = quote_currency_code || currency;
        return (
            <span className="price">
                { formatPrice(price, currenyCode) }
            </span>
        );
    }
    renderCoupon() {
        const { coupon_code } = this.props;

        if (!coupon_code) {
            return null;
        }

        return (
        <b className="coupon">
            { ` ${ coupon_code.toUpperCase() }:` }
        </b>
        );
    }
    renderTitle() {
        const { title } = this.props;

        return (
        <p block="CheckoutOrderSummary" elem="Text">
            { title }
            { this.renderCoupon() }
        </p>
        );
    }

    render() {
        const {
            price,
            mods,
            children
        } = this.props;

        if (!price) {
            return null;
        }

        return (
            <li block="CheckoutOrderSummary" elem="SummaryItem" mods={ mods }>
                { this.renderTitle() }
                <hr block="CheckoutOrderSummary" elem="SummaryDivider" />
                <div block="CheckoutOrderSummary" elem="Price">
                    <span className="price-wrapper">
                        { this.renderPrice() }
                    </span>
                    { this.renderSubPrice() }
                </div>
                { children }
            </li>
        );
    }
}

export default CheckoutOrderSummaryPriceLineComponent;
