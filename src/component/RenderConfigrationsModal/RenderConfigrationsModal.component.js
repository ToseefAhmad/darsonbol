/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';

import { SlideUpCartIconComponent } from '../SlideUpCartIcon/SlideUpCartIcon.component';

import './RenderConfigrationsModal.style.scss';

Modal.setAppElement('body');

Modal.defaultStyles.overlay.backgroundColor = 'rgba(243,241,241,0.5)';
/** @namespace SonbolPwa/Component/RenderConfigrationsModal/Component/RenderConfigrationsModal */
export function RenderConfigrationsModal(props) {
    const {
        renderConfigrations, closeModal, showModalBool, isMobile, addToCart,
        isVariant
    } = props;
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

    async function cartClickHandler(e) {
        const { closeModal, openShowConfigurableOptionsModalPopup } = props;
        await addToCart(e);
        await closeModal();
        await openShowConfigurableOptionsModalPopup();
    }

    const selectedStyle = isMobile ? mobileStyle : customStyles;
    return (
        <Modal style={ selectedStyle } isOpen={ showModalBool } onRequestClose={ closeModal }>
            <button onClick={ closeModal }>
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
            <div>{ renderConfigrations }</div>
            <div className="add-to-cart-btn-container">
                <button disabled={ isVariant === false } onClick={ (event) => cartClickHandler(event) } aria-hidden="true" className="btnbox-shop">
                    <SlideUpCartIconComponent />
                </button>
            </div>
        </Modal>
    );
}

export default RenderConfigrationsModal;
