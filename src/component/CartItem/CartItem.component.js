import {
    CartItem as SourceCartItem
} from 'SourceComponent/CartItem/CartItem.component';

import TrashIcon from '../TrashIcon/TrashIcon.component';

import './CartItem.override.style';

/** @namespace SonbolPwa/Component/CartItem/Component */
export class CartItemComponent extends SourceCartItem {
    // TODO implement logic

    renderOverlayDeleteButton() {
        const { handleRemoveItem, isMobileLayout } = this.props;

        return (
            <button
              block="CartItem"
              id="RemoveItem"
              name="RemoveItem"
              elem="Delete"
              mods={ { isMobileLayout } }
              aria-label="Remove item from cart"
              onClick={ handleRemoveItem }
            >
                <TrashIcon />
                <span block="CartItem" elem="DeleteButtonText" mods={ { isMobileLayout } }>
                    { __('Delete') }
                </span>
            </button>
        );
    }

    renderMobileContent() {
        const { isMobileLayout, isProductInStock } = this.props;

        return (
            <div block="CartItem" elem="Wrapper" mods={ { isMobileLayout, isProductOutOfStock: !isProductInStock } }>
                { this.renderImage() }
                <div className="CartItems__wrapper">
                    <div block="CartItem" elem="CartItemRows">
                        <div block="CartItem" elem="ProductInfo" mods={ { isMobileLayout } }>
                            { this.renderTitle() }
                        </div>
                    </div>
                    <div block="CartItem" elem="ProductActions" mods={ { isMobileLayout } }>
                        { this.renderQuantityChangeField() }
                        { this.renderOverlayDeleteButton() }
                        { this.renderProductPrice() }
                    </div>
                </div>
            </div>
        );
    }

    renderDesktopContent() {
        return (
            <div block="CartItem" elem="Wrapper" mods={ { isCart: true } }>
                <div block="CartItem" elem="ProductInfo">
                    { this.renderImage() }
                    { this.renderTitle() }
                </div>
                <div
                  block="CartItem"
                  elem="ProductActions"
                >
                    { this.renderProductPrice() }
                    { this.renderQuantityChangeField() }
                    { this.renderOverlayDeleteButton() }
                </div>
            </div>
        );
    }

    renderDesktopSummary() {
        return (
            <div block="CartItem" elem="Wrapper" mods={ { isSummary: true } }>
                { this.renderImage() }
                <div block="CartItem" elem="ProductActions">
                    { this.renderQuantity() }
                </div>
                <div block="CartItem" elem="CartItemRows">
                    <div block="CartItem" elem="ProductInfo">
                        { this.renderTitle() }
                        { this.renderProductPrice() }
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItemComponent;
