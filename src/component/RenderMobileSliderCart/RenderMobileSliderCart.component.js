/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable react/jsx-no-bind */

import Html from 'Component/Html';

import SizeChartButton from '../../../packages/magearab-scandipwa-sizechart/src/component/SizeChartButton';
import { SlideUpCartIconComponent } from '../SlideUpCartIcon/SlideUpCartIcon.component';

/** @namespace SonbolPwa/Component/RenderMobileSliderCart/Component/RenderMobileSliderCartComponent */
export const RenderMobileSliderCartComponent = (props) => {
    const {
        product,
        renderConfigurableOptionsDiv,
        renderPrice, addProductToCart,
        setShowCartDiv,
        completeProduct
        // productName
    } = props;

    async function cartClickHandler(e) {
        setShowCartDiv();
        await addProductToCart(e);
    }

    // rgba(0, 0, 0, 0.28)

    const { name } = product;
    const short_desc = completeProduct?.short_description || null;
    const short_description_text = short_desc ? <Html content={ short_desc.html } /> : null;
    const imageUrl = completeProduct?.image?.url || null;
    return (
        <section className="mobile-cart-box">
            <div aria-hidden="true" onClick={ setShowCartDiv } className="productclosebox">
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
            <div className="Product-container">
                { imageUrl
                    ? (
                        <div className="image-container">
                            <img src={ imageUrl } alt={ name } />
                        </div>
                    ) : null }
                <div className="product-description">
                    <h3>{ name }</h3>
                    <p className="shordescr">{ short_description_text }</p>
                    <div className="pricesp">
                        <span>{ renderPrice }</span>
                    </div>
                </div>
            </div>
            <div className="Sizecahrbox">
                <div className="lablechrt">{ __('Choose Size') }</div>
                <div className="guidszie"><SizeChartButton product={ product } /></div>
            </div>
            <div className="Product-ftr">
                { renderConfigurableOptionsDiv }
            </div>
            <button onClick={ (event) => cartClickHandler(event) } aria-hidden="true" className="btnbox-shop">
                <SlideUpCartIconComponent />
            </button>
        </section>
    );
};
export default RenderMobileSliderCartComponent;
