/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
// import CartIcon from '@scandipwa/scandipwa/src/component/AddIcon';
import AddToCart from 'Component/AddToCart';
import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import { GRID_LAYOUT, /* GRID_LAYOUT */ LIST_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import {
    ProductCard as SourceProductCard
} from 'SourceComponent/ProductCard/ProductCard.component';

import ProductWishlistButton from '../../../node_modules/@scandipwa/scandipwa/src/component/ProductWishlistButton';
import ProductCartIconComponent from '../ProductCartIcon/ProductCartIcon.component';

import './ProductCard.override.style';

/** @namespace SonbolPwa/Component/ProductCard/Component */
export class ProductCardComponent extends SourceProductCard {
    // TODO implement logic

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component

    contentObject = {
        renderCardLinkWrapper: this.renderCardLinkWrapper.bind(this),
        pictureBlock: {
            picture: this.renderPicture.bind(this)
        },
        content: {
            review: this.renderReviews.bind(this),
            productPrice: this.renderPrice.bind(this),
            mainDetails: this.renderMainDetails.bind(this),
            additionalProductDetails: this.renderBrand.bind(this),
            configurableOptions: this.renderConfigurableOptions.bind(this)
        }
    };
    requiresConfiguration() {
        const {
            product: {
                type_id: type,
                options = [],
                links_purchased_separately
            }
        } = this.props;

        const configureBundleAndGrouped = type === PRODUCT_TYPE.bundle || type === PRODUCT_TYPE.grouped;
        const configureConfig = type === PRODUCT_TYPE.configurable
            // eslint-disable-next-line max-len
            && Object.keys(super.getConfigurableAttributes()).length !== Object.keys(this.getConfigurableAttributes()).length;
        const configureCustomize = options.some(({ required = false }) => required);
        const configureDownloadableLinks = PRODUCT_TYPE.downloadable && links_purchased_separately === 1;

        return configureBundleAndGrouped || configureConfig || configureCustomize || configureDownloadableLinks;
    }
    renderAddToCart() {
        const {
            layout,
            showSelectOptionsNotification,
            inStock
        } = this.props;

        if (inStock && this.requiresConfiguration()) {
            return (
                <div className="button-container">
                    <button
                      block="Button AddToCart"
                      mods={ { layout } }
                      onClick={ showSelectOptionsNotification }
                    >
                        <ProductCartIconComponent />
                    </button>
                </div>
            );
        }

        if (!inStock) {
            return (
                <div block="ProductCard" elem="OutOfStock">
                    <p>
                        { __('Out of stock') }
                    </p>
                </div>
            );
        }

        return this.renderAddToCartButton(layout);
    }

    renderAddToCartButton(layout = GRID_LAYOUT) {
        const {
            addToCart,
            inStock,
            quantity,
            getActiveProduct,
            device: { isMobile },
            product,
            productName,
            isLoading
        } = this.props;

        return (
            <AddToCart
              mix={ { block: this.className, elem: 'AddToCart' } }
              addToCart={ addToCart }
              isDisabled={ !inStock }
              isIconEnabled
              layout={ layout }
              quantity={ quantity }
              product={ getActiveProduct() }
              renderConfigurableOptionsDiv={ this.renderConfigurableOptions() }
              isMobile={ isMobile }
              renderPrice={ this.renderPrice() }
              completeProduct={ product }
              productName={ productName }
              isProductLoading={ isLoading }
              baseImageUrl={ product?.image?.url }
            />
        );
    }

    renderProductCompareButton() {
        const {
            hideCompareButton
        } = this.props;

        if (hideCompareButton) {
            return null;
        }

        return null;
        // return this.renderCompareButton();
    }

    renderWishlistButton() {
        const { magentoProduct, isWishlistEnabled } = this.props;

        if (magentoProduct.length === 0 || !isWishlistEnabled) {
            return null;
        }

        return (
            <ProductWishlistButton
              magentoProduct={ magentoProduct }
              mix={ {
                  block: this.className,
                  elem: 'WishListButton'
              } }
            />
        );
    }
    renderProductCardWishlistButton() {
        const { hideWishlistButton, isWishlistEnabled } = this.props;

        if (hideWishlistButton || !isWishlistEnabled) {
            return null;
        }

        return this.renderWishlistButton();
    }

    renderProductActions() {
        return (
            <div block="ProductCard" elem="ProductActions">
                { this.renderProductCardWishlistButton() }
                { this.renderProductCompareButton() }
            </div>
        );
    }

    renderPicture(mix = {}) {
        const { product: { id, name }, thumbnail } = this.props;
        const { linkTo } = this.props;
        this.sharedComponent = (
            <Link to={ linkTo }>
                <Image
                  imageRef={ this.imageRef }
                  src={ thumbnail }
                  alt={ name }
                  ratio="custom"
                  mix={ { block: 'ProductCard', elem: 'Picture', mix } }
                  isPlaceholder={ !id }
                />
            </Link>
        );

        return (
            <>
                { this.sharedComponent }
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                />
            </>
        );
    }

    renderCardContent() {
        const { renderContent } = this.props;
        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return (
            this.renderCardLinkWrapper((
                <>
                    <div block="ProductCard" elem="FigureReview">
                        <figure block="ProductCard" elem="Figure">
                            { this.renderProductActions() }
                            { this.renderPicture() }
                            { /* { this.renderConfigurableOptions() } */ }
                        </figure>
                    </div>
                    <div block="ProductCard" elem="Content">
                        { this.renderName(false) }
                        { this.renderAddToCart() }
                        { this.renderPrice() }
                    </div>
                </>
            ))
        );
    }

    renderCardLinkWrapper(children, mix = {}) {
        const { product: { url } } = this.props;
        // linkTo
        if (!url) {
            return (
                <div
                  block="ProductCard"
                  elem="Link"
                >
                    { children }
                </div>
            );
        }

        return (
            <div
              block="ProductCard"
              elem="Link"
                //   to="#"
              onClick={ this.registerSharedElement }
              mix={ mix }
              aria-hidden="true"
            >
                { children }
            </div>
        );
    }

    renderCardListContent() {
        const {
            children, layout, renderContent
        } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return this.renderCardLinkWrapper((
            <div block="ProductCard" elem="Link">
                <div block="ProductCard" elem="FigureReview">
                    <figure block="ProductCard" elem="Figure">
                        { this.renderPicture() }
                    </figure>
                </div>
                <div block="ProductCard" elem="Content" mods={ { layout } }>
                    <div block="ProductCard" elem="MainInfo">
                        { /* { this.renderReviews() } */ }
                        { this.renderBrand() }
                        { this.renderMainDetails() }
                        <div block="ProductCard" elem="AttributeWrapper">
                            { this.renderPrice() }
                            { /* { this.renderConfigurableOptions() } */ }
                        </div>
                    </div>
                    <div block="ProductCard" elem="ActionWrapper">
                        { this.renderAddToCart() }
                        { this.renderProductActions() }
                    </div>
                    <div block="ProductCard" elem="AdditionalContent">
                        { children }
                    </div>
                </div>
            </div>
        ));
    }
    render() {
        const {
            children,
            mix,
            isLoading,
            layout
        } = this.props;

        if (layout === LIST_LAYOUT) {
            return (
                <li
                  block="ProductCard"
                  mods={ { layout } }
                  mix={ mix }
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderCardListContent() }
                </li>
            );
        }

        return (
            <li
              block="ProductCard"
              mods={ { layout } }
              mix={ mix }
            >
                <Loader isLoading={ isLoading } />
                { this.renderCardContent() }
                <div block="ProductCard" elem="AdditionalContent">
                    { children }
                </div>
            </li>
        );
    }
}

export default ProductCardComponent;
