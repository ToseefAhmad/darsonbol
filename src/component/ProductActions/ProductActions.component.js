/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
/* eslint-disable max-len */
import history from '@scandipwa/scandipwa/src/util/History';
import Modal from 'react-modal';

import AddToCart from 'Component/AddToCart';
import Link from 'Component/Link';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import {
    ProductActions as SourceProductActions
} from 'SourceComponent/ProductActions/ProductActions.component';
import { isCrawler, isSSR } from 'Util/Browser';

import SizeChartButton from '../../../packages/magearab-scandipwa-sizechart/src/component/SizeChartButton';
import tickIcon from '../../style/icons/pdp/tick.png';
import CartIconComponent from '../CartIcon/CartIcon.component';
import ChevronIconComponent from '../ChevronIcon/ChevronIcon.component';
import ProductCartIconComponent from '../ProductCartIcon/ProductCartIcon.component';
import RenderConfigrationsModal from '../RenderConfigrationsModal/RenderConfigrationsModal.component';
import TabbyLogoSvg from '../TabbyLogoSvg/TabbyLogoSvg.component';
import TamaraLogoSvg from '../TamaraLogoSvg/TamaraLogoSvg.component';

import './ProductActions.override.style';

/** @namespace SonbolPwa/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
    __construct(props) {
        super.__construct(props);
        this.state = {
            showConfigurableOptionsModal: false,
            showConfigurableOptionsModalPopup: false
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.openShowConfigurableOptionsModalPopup = this.openShowConfigurableOptionsModalPopup.bind(this);
        this.closeShowConfigurableOptionsModalPopup = this.closeShowConfigurableOptionsModalPopup.bind(this);
    }

    openShowConfigurableOptionsModalPopup() {
        this.setState({
            showConfigurableOptionsModalPopup: true
        });
    }

    closeShowConfigurableOptionsModalPopup() {
        this.setState({
            showConfigurableOptionsModalPopup: false
        });
    }

    handleOpenModal() {
        this.setState({ showConfigurableOptionsModal: true });
    }

    handleCloseModal() {
        this.setState({ showConfigurableOptionsModal: false });
    }
    // TODO implement logic
    renderCartIcon() {
        return <ProductCartIconComponent />;
    }

    handleProductAddedToCart() {
        const { showConfigurableOptionsModalPopup } = this.state;
        const { product, isMobile } = this.props;
        const customStyles = {
            content: {
                top: '25%',
                left: '50%',
                right: 'auto',
                padding: '20px 20px',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '991px',
                width: '100%'
            }
        };
        const mobileStyle = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                padding: '5px 5px',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '90%',
                width: '100%',
                borderTopLeftRadius: '5px'
            }
        };
        const { name, image, price_range } = product;
        const imageObject = image?.url || this.props.baseImageUrl;
        // const { url } = imageObject;
        // const imageUrl = url || null;
        const { maximum_price } = price_range;
        const { final_price } = maximum_price;
        const { currency, value } = final_price;
        const selectedStyle = isMobile ? mobileStyle : customStyles;
        return (
            <div className="cart-product-container">
                <Modal style={ selectedStyle } onRequestClose={ this.closeShowConfigurableOptionsModalPopup } isOpen={ showConfigurableOptionsModalPopup }>
                    <div className="product-popup">
                        <div className="tick-icon-container">
                            <img src={ tickIcon } alt="tick-icon" />
                        </div>
                        <div className="product-detail">
                            <div className="product-image-container">
                                <img src={ imageObject } alt="product" />
                            </div>
                            <div className="product-description">
                                <p className="title">
                                    <span className="added-text">{ __('added') }</span>
                                    { name }
                                </p>
                                <p className="price">
                                    <span className="currency">{ currency }</span>
                                    <span className="price">{ value }</span>
                                </p>
                                <p className="text">{ __('bag set') }</p>
                            </div>
                        </div>
                        <div className="cart-back-btn">
                            <button onClick={ this.handleContinueShoppingClick.bind(this) } className="shopping-btn">{ __('Continue shopping') }</button>
                            <button className="cart-page-btn"><Link to="/checkout/shipping">{ __('View the shopping bag') }</Link></button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
    handleContinueShoppingClick() {
        this.closeModal();
    }

    renderAddToCartButton(layout = GRID_LAYOUT) {
        const {
            addToCart,
            inStock,
            quantity,
            getActiveProduct,
            isVariant,
            isMobile,
            pageName
        } = this.props;
        const button = (isVariant && pageName === 'pdp') ? (
            <AddToCart
              mix={ { block: this.className, elem: 'AddToCart' } }
              addToCart={ addToCart }
              isDisabled={ !inStock }
              isIconEnabled
              layout={ layout }
              quantity={ quantity }
              product={ getActiveProduct() }
              isVariant={ isVariant }
              isMobile={ isMobile }
            />
        ) : (
            <button
              onClick={ this.handleOpenModal }
              block="Button AddToCart"
            >
                { this.renderCartIcon() }
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                <span>{ __('Add to cart') }</span>
            </button>
        );
        const { showConfigurableOptionsModal, showConfigurableOptionsModalPopup } = this.state;
        return (
            <>
                { button }
                { showConfigurableOptionsModalPopup ? this.handleProductAddedToCart() : null }
                { showConfigurableOptionsModal ? (
                    <RenderConfigrationsModal
                      openShowConfigurableOptionsModalPopup={ this.openShowConfigurableOptionsModalPopup }
                      isVariant={ isVariant }
                      addToCart={ addToCart }
                      isMobile={ isMobile }
                      showModalBool={ showConfigurableOptionsModal }
                      renderConfigrations={ this.renderConfigurableOptions() }
                      closeModal={ this.handleCloseModal }
                    />
                ) : null }
            </>
        );
    }

    renderAddToCartActionBlock() {
        return (
            <div
              block="ProductActions"
              elem="AddToCartWrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                <span className="product-action-qty">
                    { __('Quantity') }
                    :
                </span>
                { this.renderQuantityChanger() }
                { this.renderAddToCartButton() }
            </div>
        );
    }

    renderLocation() {
        return (
            <div block="ProductActions" elem="LocationAction">
                <span>اطلبها الآن لتحصل عليها</span>
                <Link
                  to="location"
                  key="location"
                  block="ProductActions"
                  elem="Button Location"
                  mods={ { type: 'location' } }
                  aria-label={ __('Location') }
                >
                    <span>{ __('Change Region') }</span>
                </Link>
            </div>
        );
    }

    renderPaymentMethods() {
        return (
            <section className="product-action-payment-option">
                <div className="pdp-payment-option-content">
                    <Link className="pdp-payment__link" to="/">
                        { __('Pay a linkprice today') }
                        <TabbyLogoSvg />
                    </Link>
                </div>
                <p>{ __('or') }</p>
                <div className="pdp-payment-option-content">
                    <Link className="pdp-payment__link" to="/">
                        { __('Divide it in batches') }
                        <TamaraLogoSvg />
                    </Link>
                </div>
            </section>
        );
    }

    renderDesktop() {
        const { product } = this.props;
        return (
            <>
                <div block="ProductActions" elem="ActionButtons">
                    { this.renderWishlistButton() }
                </div>
                { this.renderName() }
                { this.renderShortDescription() }
                { this.renderTierPrices() }
                { this.renderProductAlerts() }
                { this.renderPriceWithGlobalSchema() }
                <div block="ProductActions" elem="ActionsBlock">
                    { this.renderLocation() }
                    <div block="ProductActions" elem="ActionsBody">
                        { this.renderConfigurableOptions() }
                        <div className="desktop-pdp-sizechart">
                            <SizeChartButton product={ product } />
                        </div>
                        { this.renderCustomAndBundleOptions() }
                        { this.renderGroupedOptions() }
                        { this.renderDownloadableSamples() }
                        { this.renderDownloadableLinks() }
                    </div>
                    { this.renderAddToCartActionBlock() }
                    { /* CUSTOM FUNCTION TO ADD INSTALLMENTS OPTIONS ETC. */ }
                    { this.renderPaymentMethods() }
                </div>
            </>
        );
    }

    renderAddToCartMobile() {
        return (
            <div
              block="ProductActions"
              elem="AddToCartFixed"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderPriceWithGlobalSchema() }
                { this.renderQuantityChanger() }
                { this.renderAddToCartButton() }
                { /* { this.renderWishlistButton() } */ }
            </div>
        );
    }

    renderWishlistButton() {
        const { magentoProduct, isWishlistEnabled, device: { isMobile } } = this.props;

        if (magentoProduct.length === 0 || !isWishlistEnabled) {
            return null;
        }

        return (
            <ProductWishlistButton
              isPdp
              isMobile={ isMobile }
              magentoProduct={ magentoProduct }
              mix={ {
                  block: this.className,
                  elem: 'WishListButton'
              } }
            />
        );
    }

    handleClick() {
        history.goBack ? history.goBack() : history.go('/');
    }

    renderMinicartItemsQty() {
        const { totals } = this.props;
        const { items_qty } = totals;
        if (!items_qty) {
            return null;
        }

        return (
            <span
              aria-label="Items in cart"
              block="Header"
              elem="MinicartItemCount"
            >
                { items_qty }
            </span>
        );
    }
    renderTopHeader() {
        const { product: { name, short_description } } = this.props;
        const description = short_description ? short_description.html : null;
        return (
            <section className="PDP_Header_section">
                <div
                  onClick={ this.handleClick }
                  aria-hidden="true"
                  className="Back_button"
                >
                    <ChevronIconComponent direction="left" />
                </div>
                <div className="promomsg_view">
                    <div className="proname">{ name }</div>
                    <div className="protxt">{ description }</div>
                </div>
                <div className="Product_Actions">
                    <div className="Mini_Cart_button">
                        <Link to="/SA_ar/cart">
                            <CartIconComponent />
                        </Link>
                        { this.renderMinicartItemsQty() }
                    </div>
                    <div className="PDP_Wishlist_Button">
                        { this.renderWishlistButton() }
                    </div>
                </div>
            </section>
        );
    }

    renderMobile() {
        const { product: { type_id: type } } = this.props;
        const { product } = this.props;
        const isWithoutPriceTotal = type === PRODUCT_TYPE.grouped;

        return (
            <>
                { this.renderTopHeader() }
                { this.renderName() }
                { this.renderShortDescription() }
                { this.renderTierPrices() }
                <div block="ProductActions" elem="ActionsWrapper" mods={ { isWithoutPriceTotal } }>
                    { this.renderPriceWithGlobalSchema() }
                </div>
                { this.renderProductAlerts() }
                <div className="configration-wrapper">
                    { this.renderConfigurableOptions() }
                    <div className="mobile-pdp-sizechart">
                        <SizeChartButton product={ product } />
                    </div>
                </div>
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderLocation() }
                { this.renderPaymentMethods() }
                { this.renderAddToCartMobile() }
            </>
        );
    }
}

export default ProductActionsComponent;
