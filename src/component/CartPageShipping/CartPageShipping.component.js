/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
/** @namespace SonbolPwa/Component/CartPageShipping/Component */
import { useState } from 'react';
import Modal from 'react-modal';

import ShippingCartPageChevronIconComponent from '../BreadcrumbChevronIcon/BreadcrumbChevronIcon.component';

// import RenderShippingMethodsComponent from '../RenderShippingMethodsComponent/RenderShippingMethodsComponent.component';
import './CartPageShipping.style.scss';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(243,241,241,0.5)';

/** @namespace SonbolPwa/Component/CartPageShipping/Component/CartPageShippingComponent */
export function CartPageShippingComponent(props) {
    const [isShippingCountryModalOpen, setShippingCountryModalOpen] = useState(false);
    const { isMobile } = props;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            padding: '20px 20px',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '428px',
            width: '100%',
            borderRadius: '24px'
        }
    };
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
    const selectedStyle = isMobile ? mobileStyle : customStyles;
    return (
        <div className="shipping-wrapper">
            <div className="shipping-heading">
                <span className="shipping-heading__text">Delivery to</span>
                <span className="shipping-heading__text-bold">Riyadh</span>
            </div>
            <button onClick={ () => setShippingCountryModalOpen(true) } className="shipping-options-button">
                <ShippingCartPageChevronIconComponent direction="top" />
            </button>
            <div className="shipping link">Expected in two days</div>
            { isShippingCountryModalOpen ? (
                <Modal style={ selectedStyle } isOpen={ isShippingCountryModalOpen } onRequestClose={ () => setShippingCountryModalOpen(false) }>
                    <section className="city-selector">
                        <div className="close-city-btn-container">
                            <button onClick={ () => setShippingCountryModalOpen(false) }>
                                <div className="filterhead">
                                    <div className="txtfilhd"><b>{ __('Select configurable options to add product to cart') }</b></div>
                                    <div className="txtfiltracors">
                                        { __('Close') }
                                        <svg
                                          version="1.1"
                                          id="Layer_1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlnsXlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          width="16"
                                          height="30"
                                          viewBox="0 0 17 18"
                                          xmlSpace="preserve"
                                        >
                                            <g>
                                                <path d="M10.6,17l-2.5-4.7L5.7,17H0.6l4.7-7.9L0.9,1.5h4.9l2.4,4.6l2.4-4.6h4.9l-4.4,7.7L16,17H10.6z" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>

                            </button>
                        </div>
                        <div className="shipping-city__content-wrapper">
                            <div className="shipping-city">
                                <div className="shipping-city__field">
                                    <span className="Shipping-city__title hover">{ __('Riyadh') }</span>
                                    <input className="Shipping-city__btn select" type="radio" value="Riyadh" name="city" />
                                </div>
                                <div className="shipping-city__field">
                                    <span className="Shipping-city__title">{ __('Dammam') }</span>
                                    <input className="Shipping-city__btn" type="radio" value="Dammam" name="city" />
                                </div>
                                <div className="shipping-city__field">
                                    <span className="Shipping-city__title">{ __('Mecca') }</span>
                                    <input className="Shipping-city__btn" type="radio" value="Mecca" name="city" />
                                </div>
                                <div className="shipping-city__field">
                                    <span className="Shipping-city__title">{ __('Jeddah') }</span>
                                    <input className="Shipping-city__btn" type="radio" value="Jeddah" name="city" />
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal>
            ) : null }
        </div>
    );
}

export default CartPageShippingComponent;
