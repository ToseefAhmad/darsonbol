/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable max-lines */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Link from 'Component/Link';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import { GRID_LAYOUT } from 'Route/CategoryPage/CategoryPage.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { MixType } from 'Type/Common.type';
import { LayoutType } from 'Type/Layout.type';
import { ProductType } from 'Type/ProductList.type';
import { ADD_TO_CART } from 'Util/Product';
import {
    getMaxQuantity, getMinQuantity, getName, getProductInStock
} from 'Util/Product/Extract';
import { magentoProductTransform } from 'Util/Product/Transform';

import tickIcon from '../../style/icons/pdp/tick.png';
import AddToCart from './AddToCart.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace SonbolPwa/Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cartId: state.CartReducer.id
});

/** @namespace SonbolPwa/Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    fallbackAddToCart: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/* @namespace SonbolPwa/Component/AddToCart/Container */
export class AddToCartContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.objectOf(PropTypes.number)]),
        cartId: PropTypes.string,
        showNotification: PropTypes.func.isRequired,
        addToCart: PropTypes.func,
        fallbackAddToCart: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool,
        // eslint-disable-next-line react/require-default-props
        renderConfigurableOptionsDiv: PropTypes.func,
        isIconEnabled: PropTypes.bool,
        mix: MixType,
        layout: LayoutType,
        // eslint-disable-next-line react/require-default-props
        isMobile: PropTypes.bool,
        // eslint-disable-next-line no-dupe-keys
        product: PropTypes.object,
        renderPrice: PropTypes.func,
        completeProduct: PropTypes.object,
        productName: PropTypes.string,
        isProductLoading: PropTypes.bool,
        isVariant: PropTypes.bool
    };

    static defaultProps = {
        quantity: 1,
        cartId: '',
        mix: {},
        layout: GRID_LAYOUT,
        isIconEnabled: true,
        isDisabled: false,
        addToCart: null
    };

    openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        });
    }
    containerFunctions = {
        addProductToCart: this.addProductToCart.bind(this),
        setShowCartDiv: this.setShowCartDiv.bind(this),
        showProductModal: this.showProductModal.bind(this),
        openModal: this.openModal.bind(this)
    };

    globalValidationMap = [
        this.validateStock.bind(this),
        this.validateQuantity.bind(this),
        this.validateCustomizable.bind(this),
        this.validateByType.bind(this)
    ];

    typeValidationMap = {
        [PRODUCT_TYPE.bundle]: this.validateBundle.bind(this),
        [PRODUCT_TYPE.downloadable]: this.validateDownloadable.bind(this),
        [PRODUCT_TYPE.configurable]: this.validateConfigurable.bind(this),
        [PRODUCT_TYPE.grouped]: this.validateGroup.bind(this)
    };

    showProductModal() {
        const { isModalOpen } = this.state;
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
                <Modal style={ selectedStyle } onRequestClose={ this.closeModal } isOpen={ isModalOpen }>
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

    handleViewShoppingCart() {
        <Redirect to="/" />;
    }

    async addProductToCart(e) {
        const { product, addToCart } = this.props;
        if ((!product || Object.keys(product).length === 0) && !addToCart) {
            return;
        }
        e.preventDefault();
        this.setState({ isAdding: true });

        if (!this.validate()) {
            return;
        }

        if (typeof addToCart === 'function') {
            try {
                await addToCart();
                this.openModal();
            } finally {
                // if (this.validate()) {
                //     this.openModal();
                // }
                this.setState({ isAdding: false });
            }
        } else {
            const {
                quantity,
                cartId,
                fallbackAddToCart
            } = this.props;
            const magentoProduct = magentoProductTransform(ADD_TO_CART, product, quantity);

            try {
                await fallbackAddToCart({
                    products: magentoProduct,
                    cartId
                });
            } finally {
                this.setState({ isAdding: false });
            }
        }

        this.setState({ isAdding: false });
    }

    validate() {
        // eslint-disable-next-line fp/no-let
        let isValid = true;
        this.globalValidationMap.forEach((step) => {
            if (!step()) {
                isValid = false;
            }
        });

        return isValid;
    }

    __construct(props) {
        super.__construct(props);
        this.state = {
            showCartDiv: false,
            isModalOpen: false,
            isAdding: false

        };
        this.setShowCartDiv = this.setShowCartDiv.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showProductModal = this.showProductModal.bind(this);
    }

    setShowCartDiv() {
        const doesShow = !this.state.showCartDiv;
        this.setState({
            showCartDiv: doesShow
        });
    }

    validateStock() {
        const { product, showNotification } = this.props;
        const inStock = getProductInStock(product);

        if (!inStock) {
            const name = getName(product);
            showNotification('info', __('Sorry! The product %s is out of stock!', name));
        }

        return inStock;
    }

    validateQuantity() {
        const {
            product, quantity, showNotification, product: { type_id: typeId }
        } = this.props;
        const minQty = getMinQuantity(product);
        const maxQty = getMaxQuantity(product);
        const inRange = quantity >= minQty && quantity <= maxQty;
        const isValid = typeId === PRODUCT_TYPE.grouped || inRange;

        if (!isValid) {
            if (quantity < minQty) {
                showNotification('info', __('Sorry! Minimum quantity for this product is %s!', minQty));
            } else {
                showNotification('info', __('Sorry! Maximum quantity for this product is %s!', maxQty));
            }
        }

        return isValid;
    }

    validateByType() {
        const { product: { type_id } = {} } = this.props;
        const { [type_id]: typeValidationFn } = this.typeValidationMap;

        if (!typeValidationFn) {
            return true;
        }

        return typeValidationFn();
    }

    validateBundle() {
        return true;
    }

    validateCustomizable() {
        return true;
    }

    validateDownloadable() {
        return true;
    }

    validateGroup() {
        return true;
    }

    validateConfigurable() {
        return true;
    }

    containerProps() {
        const {
            isDisabled,
            isIconEnabled,
            mix,
            layout,
            renderConfigurableOptionsDiv,
            isMobile,
            product,
            renderPrice,
            completeProduct,
            productName,
            isProductLoading,
            isVariant
        } = this.props;

        const {
            isAdding,
            showCartDiv,
            isModalOpen
        } = this.state;

        return {
            isDisabled,
            isIconEnabled,
            mix,
            layout,
            isAdding,
            renderConfigurableOptionsDiv,
            isMobile,
            showCartDiv,
            product,
            renderPrice,
            completeProduct,
            productName,
            isProductLoading,
            isVariant,
            isModalOpen
        };
    }

    render() {
        return (
            <AddToCart
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
