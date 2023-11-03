/* eslint-disable radix */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable max-len */
import CartCoupon from 'Component/CartCoupon';
import CartItem from 'Component/CartItem';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary/CheckoutOrderSummary.container';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import {
    CartPage as SourceCartPage
} from 'SourceRoute/CartPage/CartPage.component';

import CartPageShipping from '../../component/CartPageShipping';
import PaymentMethodsFooter from '../../component/PaymentMethodsFooter/PaymentMethodsFooter.component';
import ProgressBar from '../../component/ProgressBar/ProgressBar.component';
import emptyBag from '../../style/icons/cartPage/empty-bag.svg';

import './CartPage.override.style';

/** @namespace SonbolPwa/Route/CartPage/Component */
export class CartPageComponent extends SourceCartPage {
    // TODO implement logic

    // GENERAL FUNCTIONALTY

    renderDiscountCode() {
        const {
            totals: { coupon_code, items }
        } = this.props;

        if (!items || items.length < 1) {
            return null;
        }

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'CartPage', elem: 'Discount' } }
              isArrow
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    // GENERAL FUNCTIONALTY -------------------------- END

    // Rendering In Mobile Functions

    renderMobile() {
        const {
            totals: {
                items
            }
        } = this.props;
        const emptyCart = items.length ? '' : 'empty-cart-bag';
        return (
            <div block="CartPage" elem="Static" className={ emptyCart }>
                { this.renderHeading() }
                { /* { this.renderDiscountCode() } */ }
                <div block="CartPage" elem="Floating">
                    { this.renderTotals() }
                </div>
                { this.renderCartItems() }
                { /* { this.renderDiscountCode() } */ }
                { this.renderPromo() }
            </div>
        );
    }

    renderHeading() {
        return (
            <h1 block="CartPage" elem="Heading">
                { __('Cart') }
            </h1>
        );
    }

    renderCartItems() {
        const {
            totals: {
                items,
                quote_currency_code
            },
            onCartItemLoading
        } = this.props;

        if (!items) {
            return <Loader isLoading />;
        }

        if (items.length < 1) {
            return (
                <>
                    <div block="CartPage" elem="emptyCart">
                        <img block="CartPage" elem="emptyBag" src={ emptyBag } alt="empty cart" />
                        <p block="CartPage" elem="emptyCartString">{ __('There are no products in cart.') }</p>
                        <p block="CartPage" elem="emptyCartMessage">{ __('Make sure your bag is full of the outfits you love') }</p>
                    </div>
                    <div block="CartPage" elem="shopNow">
                        <Link block="CartPage" elem="btn-link" to="/">
                            <span>{ __('Shop now') }</span>
                        </Link>
                    </div>
                </>
            );
        }

        return (
            <div block="CartPage" elem="Items" aria-label="List of items in cart">
                { items.map((item) => (
                    <CartItem
                      key={ item.item_id }
                      item={ item }
                      currency_code={ quote_currency_code }
                      onCartItemLoading={ onCartItemLoading }
                      showLoader
                      isEditing
                      updateCrossSellsOnRemove
                    />
                )) }
            </div>
        );
    }

    renderTotals() {
        return (
            <article
              block="CartPage"
              elem="Summary"
              mix={ { block: 'FixedElement', elem: 'Bottom' } }
            >
                { this.renderSummary() }
            </article>
        );
    }

    renderSummary() {
        const {
            totals,
            onCouponCodeUpdate
        } = this.props;

        return (
            <CheckoutOrderSummary
              totals={ totals }
                // eslint-disable-next-line react/jsx-no-bind
              renderCmsBlock={ () => this.renderPromo(true) }
              onCouponCodeUpdate={ onCouponCodeUpdate }
              showItems={ false }
            >
                { this.renderSecureCheckoutButton() }
            </CheckoutOrderSummary>
        );
    }

    renderPromo() {
        const {
            totals: {
                items
            }
        } = this.props;
        const content = items.length
            ? (
                <div block="CartPage" elem="Promo">
                    { this.renderPromoContent() }
                </div>
            )
            : null;

        return content;
    }

    renderPromoContent() {
        const { cart_content: { cart_cms } = {} } = window.contentConfiguration;

        if (cart_cms) {
            return <CmsBlock identifier={ cart_cms } />;
        }

        return (
            <figure
              block="CartPage"
              elem="PromoBlock"
            >
                <figcaption block="CartPage" elem="PromoText">
                    { __('Free shipping on order 49$ and more.') }
                </figcaption>
            </figure>
        );
    }

    // MOBILE FUNCTIONALITY ------------------------------------------------- END

    // Render Desktop Functionality

    renderDesktop() {
        const {
            totals: {
                items
            }
        } = this.props;

        return (
            <>
                <div block="CartPage" elem="Static">
                    { items.length ? this.renderHeading() : null }
                    { this.renderCartItems() }
                    { /* { this.renderDiscountCode() } */ }
                </div>
                { this.renderTotalsSection() }
            </>
        );
    }

    // renderProgressBar() {
    //     const { totals } = this.props;
    //     const { grand_total } = totals;
    //     const total = 300;
    //     const remainingAmount = 300 - grand_total;
    //     const percentage = (grand_total / total) * 100;
    //     return (
    //         <section className="progress-bar-container">
    //             <div>
    //                 <ProgressBar bgcolor="#5A8A89" completed={ percentage } />
    //             </div>
    //             { percentage < 100 ? <span>{ __('Add products worth (%s) to get free shipping', parseInt(remainingAmount)) }</span> : <span>Now you Can Enjoy free Shipping</span> }
    //         </section>
    //     );
    // }

    // RENDER FUNCTIONALITY --------------------------- END

    render() {
        const {
            totals: {
                items
            },
            device: { isMobile }
        } = this.props;
        // ! calculations for progress bar

        const { totals } = this.props;
        const { grand_total } = totals;
        const total = 300;
        const remainingAmount = 300 - grand_total;
        const percentage = (grand_total / total) * 100;

        // ! End
        const emptyCart = items.length ? '' : 'wrraper-empty-cart-bag';
        return (
            <main block="CartPage" aria-label="Cart Page">
                <ContentWrapper
                  wrapperMix={ { block: 'CartPage', elem: 'Wrapper', className: emptyCart } }
                  label="Cart page details"
                >
                    { items.length
                        ? (
                            <div className="CartPage-shipping__wrapper">
                                <CartPageShipping isMobile={ isMobile } />
                            </div>
                        )
                        : null }

                    <section className="progress-bar-container">
                        <div>
                            <ProgressBar bgcolor="#5A8A89" completed={ percentage } remainingAmount={ remainingAmount } />
                        </div>
                    </section>

                    { this.renderMainContent() }
                </ContentWrapper>
                { this.renderCrossSellProducts() }
                <div className="section-wrapper">
                    <PaymentMethodsFooter />
                </div>
            </main>
        );
    }
}

export default CartPageComponent;
