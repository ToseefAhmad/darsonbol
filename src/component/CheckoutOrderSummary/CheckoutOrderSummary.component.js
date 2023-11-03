import CartCoupon from 'Component/CartCoupon';
import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import ExpandableContent from 'Component/ExpandableContent';
import {
    CheckoutOrderSummary as SourceCheckoutOrderSummary
} from 'SourceComponent/CheckoutOrderSummary/CheckoutOrderSummary.component';

import appleLogo from '../../style/icons/Social-Icons/applelogo.svg';

import './CheckoutOrderSummary.override.style';

/** @namespace SonbolPwa/Component/CheckoutOrderSummary/Component */
export class CheckoutOrderSummaryComponent extends SourceCheckoutOrderSummary {
    // TODO implement logic
    renderDiscountCode() {
        const {
            totals: { coupon_code, items }
        } = this.props;

        if (!items || items.length < 1) {
            return null;
        }

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
              isArrow
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }
    renderOrderTotal() {
        const {
            totals: {
                grand_total,
                quote_currency_code
            },
            cartTotalSubPrice
        } = this.props;
        const title = __('Order total');

        if (cartTotalSubPrice) {
            return (
                <CheckoutOrderSummaryPriceLine
                  price={ grand_total }
                  currency={ quote_currency_code }
                  title={ title }
                  subPrice={ cartTotalSubPrice }
                  mods={ { isTotal: true } }
                />
            );
        }

        return this.renderPriceLine(grand_total, title, { isTotal: true });
    }
    renderDiscount() {
        const {
            totals: {
                applied_rule_ids,
                discount_amount,
                coupon_code,
                quote_currency_code
            }
        } = this.props;

        if (!applied_rule_ids) {
            return null;
        }

        const label = coupon_code ? __('Coupon code discount') : __('Discount');
        const discount = -Math.abs(discount_amount);
        return (
            <CheckoutOrderSummaryPriceLine
              quote_currency_code={ quote_currency_code }
              price={ discount }
              title={ label }
              coupon_code={ coupon_code }
            />
        );
    }

    renderTotals() {
        const { children, totals: { items = [] } } = this.props;
        return (
            <div block="CheckoutOrderSummary" elem="OrderTotals">
                <ul>
                    { this.renderSubTotal() }
                    { this.renderTax() }
                    { this.renderDiscount() }
                    { this.renderShipping() }
                    { this.renderOrderTotal() }
                    <div block="CheckoutOrderSummary" elem="ButtonWrapper" mods={ { isEmpty: items.length < 1 } }>
                        { this.renderOrderTotal() }
                        <div className="button-wrapper">
                            <div className="CartPage-CheckoutButtonWrapper btn-space">
                                <button className="CartPage-CheckoutButton Button btn-pay">
                                    <span className="btn-text">Pay</span>
                                    <span className="icon-apple"><img src={ appleLogo } alt="appleLogo" /></span>
                                </button>
                            </div>
                            { children }
                        </div>

                    </div>
                </ul>
            </div>
        );
    }

    renderContent() {
        const { isExpandable } = this.props;

        if (isExpandable) {
            return this.renderExpandableContent();
        }

        return (
            <>
                { this.renderHeading() }
                { this.renderItems() }
                { this.renderDiscountCode() }
                { this.renderTotals() }
            </>
        );
    }
}

export default CheckoutOrderSummaryComponent;
