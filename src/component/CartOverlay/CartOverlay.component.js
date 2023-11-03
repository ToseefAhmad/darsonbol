import { CART_OVERLAY } from 'Component/Header/Header.config';
import Link from 'Component/Link';
import Overlay from 'Component/Overlay';
import {
    CartOverlay as SourceCartOverlay
} from 'SourceComponent/CartOverlay/CartOverlay.component';
import { scrollToTop } from 'Util/Browser';

import './CartOverlay.override.style';

/** @namespace SonbolPwa/Component/CartOverlay/Component */
export class CartOverlayComponent extends SourceCartOverlay {
    // TODO implement logic

    renderActions() {
        return (
            <div block="CartOverlay" elem="Actions">
                { this.renderSecureCheckoutButton() }
            </div>
        );
    }

    renderGoToCartButton() {
        return (
            <Link
              block="CartOverlay"
              elem="CartButton"
              mix={ { block: 'Button', mods: { isHollow: true } } }
              to="/cart"
              onClick={ scrollToTop }
            >
                { __('View cart') }
            </Link>
        );
    }

    renderCartAdditional() {
        const { totals: { items = [] } } = this.props;

        if (items.length < 1) {
            return null;
        }

        return (
            <div block="CartOverlay" elem="Additional">
                { this.renderDiscount() }
                { this.renderTax() }
                { this.renderTotals() }
                { this.renderOutOfStockProductsWarning() }
                { this.renderGoToCartButton() }
                { this.renderActions() }
            </div>
        );
    }

    render() {
        const { changeHeaderState } = this.props;

        return (
            <Overlay
              id={ CART_OVERLAY }
              onVisible={ changeHeaderState }
              mix={ { block: 'CartOverlay' } }
            >
                <div block="CartOverlay" elem="ContentWrapper">
                    { this.renderCartItems() }
                    { this.renderCartAdditional() }
                </div>
            </Overlay>
        );
    }
}

export default CartOverlayComponent;
