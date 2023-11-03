/* eslint-disable max-len */
import {
    MyAccountOrderTotals as SourceMyAccountOrderTotals
} from 'SourceComponent/MyAccountOrderTotals/MyAccountOrderTotals.component';
import { formatPrice } from 'Util/Price';

/** @namespace SonbolPwa/Component/MyAccountOrderTotals/Component */
export class MyAccountOrderTotalsComponent extends SourceMyAccountOrderTotals {
    renderTax(tax) {
        const { colSpanPriceCount, colSpanLabelCount } = this.props;
        const { amount: { value, currency }, title, rate } = tax;
        return (
            <div key={ `${title}-${rate}` }>
                <span colSpan={ colSpanLabelCount }>{ `${title} (${rate})` }</span>
                <span colSpan={ colSpanPriceCount }>{ formatPrice(value, currency) }</span>
            </div>
        );
    }
    renderTaxes() {
        const { total: { taxes } } = this.props;
        return taxes.map(this.renderTax.bind(this));
    }
    renderPriceLine(title, price, currency, mix = {}, key) {
        const {
            total: { grand_total: { currency: defaultCurrency } },
            colSpanLabelCount,
            colSpanPriceCount
        } = this.props;

        return (
            <div mix={ mix } key={ key }>
                <span colSpan={ colSpanLabelCount }>
                { title }
                { ' ' }
                    <span className="dots-box" />
                </span>
                <span colSpan={ colSpanPriceCount }>{ formatPrice(price, currency || defaultCurrency) }</span>
            </div>
        );
    }
    renderContent() {
        const {
            total: {
                subtotal: {
                    value: subtotalPrice
                },
                shipping_handling: {
                    total_amount: {
                        value: shippingHandlingPrice
                    }
                },
                grand_total: {
                    value: grandTotalPrice
                },
                total_tax: {
                    value: totalTaxPrice
                },
                base_grand_total: {
                    value: baseGrandTotalPrice,
                    currency: baseGrandTotalCurrency
                }
            }
        } = this.props;

        const grandTotalMix = { block: 'MyAccountOrderTotals', elem: 'GrandTotal-WithoutTax' };
        const grandTotalMixWithTax = { block: 'MyAccountOrderTotals', elem: 'GrandTotal-WithTax' };

        return (
            <>
                { this.renderPriceLine(__('Subtotal'), subtotalPrice) }
                { this.renderDiscounts() }
                { this.renderPriceLine(__('Shipping & Handling'), shippingHandlingPrice) }
                { this.renderPriceLine(
                    __('Grand Total (Excl.Tax)'),
                    grandTotalPrice - totalTaxPrice,
                    null,
                    grandTotalMix
                ) }
                { this.renderTaxes() }
                { this.renderPriceLine(__('Tax'), totalTaxPrice) }
                { this.renderPriceLine(__('Grand Total to be Charged'), baseGrandTotalPrice, baseGrandTotalCurrency) }
                { this.renderPriceLine(__('Grand Total (Incl.Tax)'), grandTotalPrice, null, grandTotalMixWithTax) }
            </>
        );
    }

    render() {
        const { total } = this.props;

        if (!total) {
            return null;
        }

        return (
            <div
              block="MyAccountOrderTotals"
              elem="Wrapper"
            >
                { this.renderContent() }
            </div>
        );
    }
}

export default MyAccountOrderTotalsComponent;
