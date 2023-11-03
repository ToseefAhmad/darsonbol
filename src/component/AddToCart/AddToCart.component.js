/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
import Modal from 'react-modal';

import {
    AddToCart as SourceAddToCart
} from 'SourceComponent/AddToCart/AddToCart.component';

import ProductCartIconComponent from '../ProductCartIcon/ProductCartIcon.component';
import RenderMobileSliderCartComponent from '../RenderMobileSliderCart/RenderMobileSliderCart.component';

import './AddToCart.override.style';

Modal.setAppElement('body');

/** @namespace SonbolPwa/Component/AddToCart/Component */
export class AddToCartComponent extends SourceAddToCart {
    // TODO implement logic

    renderCartIcon() {
        const { isIconEnabled } = this.props;

        if (!isIconEnabled) {
            return null;
        }

        return <ProductCartIconComponent />;
    }

    render() {
        const mobileStyle = {
            content: {
                top: 'auto',
                left: '50%',
                right: 'auto',
                padding: '20px 20px',
                bottom: '0',
                marginRight: '-50%',
                transform: 'translate(-50%, 0%)',
                maxWidth: '428px',
                width: '100%',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px'
            }
        };
        const {
            mix,
            addProductToCart,
            layout,
            isDisabled,
            isAdding,
            renderConfigurableOptionsDiv,
            isMobile,
            setShowCartDiv,
            showCartDiv,
            product,
            renderPrice,
            completeProduct,
            productName,
            isVariant,
            isModalOpen,
            showProductModal
            // isProductLoading
        } = this.props;
        // const { type_id } = product;
        const showActualCartDiv = !!showCartDiv;
        const buttonContainer = (isMobile && !isVariant) ? (
            <div className="configrationOption-conatiner">
                { renderConfigurableOptionsDiv }
                { product?.id ? (
                    <div className="btnbox-shop">
                        <button
                          onClick={ setShowCartDiv }
                        //   block="Button MobileAddToCart"
                        //   mix={ mix }
                        //   mods={ { layout } }
                        //   disabled={ isDisabled || isAdding }
                        >
                            { /* { this.renderCartIcon() } */ }
                            { <ProductCartIconComponent /> }
                            { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                            { /* <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span> */ }
                        </button>
                        { isModalOpen ? showProductModal() : null }
                    </div>
                ) : null }
            </div>
        ) : (
            <div className="configrationOption-conatiner">
                { isModalOpen ? showProductModal() : null }
                { renderConfigurableOptionsDiv }
                { product?.id ? (
                    <button
                      onClick={ addProductToCart }
                      block="Button AddToCart"
                      mix={ mix }
                      mods={ { layout } }
                      disabled={ isDisabled || isAdding }
                    >
                        { this.renderCartIcon() }
                        { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                        <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span>
                    </button>
                ) : null }
            </div>
        );

        if (showActualCartDiv) {
            return (
                <div className="mobilecartbox_shop">
                    <Modal style={ mobileStyle } isOpen={ showCartDiv } onRequestClose={ setShowCartDiv }>
                        <RenderMobileSliderCartComponent
                          isVariant={ isVariant }
                          setShowCartDiv={ setShowCartDiv }
                          addProductToCart={ addProductToCart }
                          renderPrice={ renderPrice }
                          renderConfigurableOptionsDiv={ renderConfigurableOptionsDiv }
                          product={ product }
                          renderCartIcon={ this.renderCartIcon() }
                          completeProduct={ completeProduct }
                          productName={ productName }
                        />
                    </Modal>
                </div>
            );
        }

        return buttonContainer;
    }
}

export default AddToCartComponent;
