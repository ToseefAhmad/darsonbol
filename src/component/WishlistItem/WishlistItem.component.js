// import EditIcon from 'Component/EditIcon';
import ProductCard from 'Component/ProductCard';
import { /* GRID_LAYOUT */ LIST_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import {
    WishlistItem as SourceWishlistItem
} from 'SourceComponent/WishlistItem/WishlistItem.component';

/** @namespace SonbolPwa/Component/WishlistItem/Component */
export class WishlistItemComponent extends SourceWishlistItem {
    renderRemove() {
        const { removeItem } = this.props;

        return (
            <button
              block="WishlistItem"
              elem="Remove"
              onClick={ removeItem }
              aria-label={ __('Remove') }
            >
                { __('Removal') }
                { /* <CloseIcon /> */ }
            </button>
        );
    }
    renderAddToCartButton() {
        const {
            addToCart,
            isEditingActive,
            isMobile,
            inStock
        } = this.props;

        if (!inStock) {
            return null;
        }

        const mods = isMobile ? { isEditingActive } : {};

        return (
            <button
              block="Button"
              mods={ { isHollow: isMobile } }
              mix={ { block: 'WishlistItem', elem: 'AddToCart', mods } }
              onClick={ addToCart }
            >
                { __('Add to cart') }
            </button>
        );
    }

    renderContentMobile(renderMethods) {
        const {
            isEditingActive
        } = this.props;

        return (
            <div block="WishlistItem" elem="SelectWrapper">
                    { this.renderSelectCheckbox() }
                    <div block="WishlistItem" elem="ContentWrapper" mods={ { isEditingActive } }>
                        { this.renderCardDataMobile(renderMethods) }
                        { this.renderCardFooterMobile() }
                    </div>
            </div>
        );
    }

    renderContent(renderMethods) {
        // const { redirectToProductPage } = this.props;

        const {
            content: { productPrice, configurableOptions },
            pictureBlock: { picture: renderPicture },
            renderCardLinkWrapper
        } = renderMethods;

        // const { isMobile } = this.props;

        // if (isMobile) {
        //     return this.renderContentMobile(renderMethods);
        // }

        return (
            <>
                <div block="WishlistItem" elem="FigureWrapper">
                    { renderCardLinkWrapper(
                        <figure mix={ { block: 'ProductCard', elem: 'Figure' } }>
                            { renderPicture({ block: 'WishlistItem', elem: 'Picture' }) }
                        </figure>
                    ) }
                </div>
                { /* { this.renderOptions() } */ }
                <div block="WishlistItem" elem="Content">
                    { this.renderName() }
                    { /* { this.renderRating() }
                    { this.renderBrand() } */ }
                    <div block="WishlistItem" elem="RowWrapper">
                        { this.renderPrice(productPrice) }
                        <div className="wishlist-config-options">
                            { configurableOptions() }
                        </div>
                        { this.renderQuantityFieldInput() }
                    </div>
                    { /* { this.renderCommentField() } */ }
                    <div block="WishlistItem" elem="ActionWrapper">
                        { this.renderRemove() }
                        { this.renderAddToCartButton() }
                        { this.renderOutOfStockMessage() }
                        { /* <div
                          aria-hidden="true"
                          block="WishlistItem"
                          elem="EditIcon"
                          onClick={ redirectToProductPage }
                        >
                            <EditIcon />
                        </div> */ }
                    </div>
                </div>
            </>
        );
    }
    render() {
        const { isLoading, isRemoving } = this.props;
        const product = this.getWishlistProduct();

        if (!product) {
            return null;
        }

        return (
            <ProductCard
              layout={ LIST_LAYOUT }
              product={ product }
              mix={ { block: 'WishlistItem', elem: 'ProductCard' } }
              isLoading={ isLoading || isRemoving }
              renderContent={ this.renderContent }
              hideWishlistButton
              hideCompareButton
            />
        );
    }
}

export default WishlistItemComponent;
