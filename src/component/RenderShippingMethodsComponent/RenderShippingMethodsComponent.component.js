/** @namespace SonbolPwa/Component/RenderShippingMethodsComponent/Component/RenderShippingMethodsComponent */
import './RenderShippingMethods.override.style.scss';

/** @namespace SonbolPwa/Component/RenderShippingMethodsComponent/Component/RenderShippingMethodsComponent */
export function RenderShippingMethodsComponent() {
    return (
        <div className="shipping-popup__wrapper">
            <div className="shipping-popup__top">
                top blured area
            </div>
            <div className="shipping-popup__bottom">
                <div className="shipping-popup__content">
                    <div className="shipping-popup__search">
                        <div className="shipping-popup__text">Search</div>
                        <div className="shipping-popup__icon">CLose button</div>
                    </div>
                    <div className="shipping-popup__city-selector">
                        <div className="shipping-popup__city-heading">select required city </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RenderShippingMethodsComponent;
