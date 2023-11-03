/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import {
    CartCoupon as SourceCartCoupon
} from 'SourceComponent/CartCoupon/CartCoupon.component';

import './CartCoupon.override.style.scss';
/** @namespace SonbolPwa/Component/CartCoupon/Component */
export class CartCouponComponent extends SourceCartCoupon {
    render() {
        const { isLoading, couponCode, mix } = this.props;

        return (
            <div
              block="CartCoupon"
              mix={ mix }
            >
                <Form
                  onSubmit={ this.handleFormSubmit }
                  returnAsObject
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderTitle() }
                    { (couponCode
                        ? this.renderRemoveCoupon()
                        : this.renderApplyCoupon()
                    ) }
                </Form>
            </div>
        );
    }
}
export default CartCouponComponent;
