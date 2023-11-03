/* eslint-disable radix */
import { ProductPrice as SourceProductPrice } from 'SourceComponent/ProductPrice/ProductPrice.component';

/** @namespace SonbolPwa/Component/ProductPrice/Component */
export class ProductPriceComponent extends SourceProductPrice {
    renderPrice(price, label) {
        const {
            discountPercentage
        } = this.props;

        const {
            value: priceValue
        } = price;

        const { value, currency } = price;
        const { itemProp = null, content = null } = this.getCurrentPriceSchema();

        // Use <ins></ins> <del></del> to represent new price and the old (deleted) one
        const PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';

        // force unequal comparison - unsure of resulting type
        // eslint-disable-next-line
        if (priceValue == 0) {
            return null;
        }

        return (
            <PriceSemanticElementName block="ProductPrice" elem="Price">
                { this.renderPriceBadge(label) }
                <span
                  itemProp={ itemProp }
                  content={ content }
                  block="ProductPrice"
                  elem="PriceValue"
                >
                    <span className="lblprice">{ currency }</span>
                    <span className="pricevalue">{ parseInt(value) }</span>
                </span>
            </PriceSemanticElementName>
        );
    }
    renderOldPrice() {
        const {
            price: {
                originalPrice: {
                    value: originalPriceValue
                    // valueFormatted: originalPriceFormatted
                } = {}
            } = {},
            discountPercentage,
            isSchemaRequired,
            variantsCount,
            priceCurrency
        } = this.props;

        if (discountPercentage === 0 || originalPriceValue === 0) {
            return null;
        }

        return (
            <del
              block="ProductPrice"
              elem="HighPrice"
              aria-label={ __('Old product price') }
              itemProp={ isSchemaRequired && variantsCount > 1 ? { itemProp: 'highPrice' } : null }
            >
                <span className="lblpriceold">{ priceCurrency }</span>
                <span className="lblpriceold">{ parseInt(originalPriceValue) }</span>
            </del>
        );
    }
}

export default ProductPriceComponent;
