/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import Loader from 'Component/Loader';
import {
    MyAccountMyWishlist as SourceMyAccountMyWishlist
} from 'SourceComponent/MyAccountMyWishlist/MyAccountMyWishlist.component';

import EmptyWishListComponent from '../EmptyWishListComponent/EmptyWishList.component';

import './MyAccountMyWishlist.override.style';

/** @namespace SonbolPwa/Component/MyAccountMyWishlist/Component */
export class MyAccountMyWishlistComponent extends SourceMyAccountMyWishlist {
    renderNoProductsFound() {
        return (
            <div block="MyAccountMyWishlist" elem="NoProducts">
                { /* <p>{ __('Wishlist is empty!') }</p> */ }
                <EmptyWishListComponent />
            </div>
        );
    }
    renderContent() {
        const {
            isWishlistLoading,
            isWishlistEmpty,
            isLoading
        } = this.props;

        if (isWishlistEmpty && !isWishlistLoading) {
            return this.renderNoProductsFound();
        }

        return (
            <div block="MyAccountMyWishlist" elem="Products" ref={ this.productsRef }>
                <Loader isLoading={ isLoading } />
                { this.renderProducts() }
            </div>
        );
    }
    render() {
        const { isWishlistEmpty } = this.props;
        return (
            <div block="MyAccountMyWishlist">
                { !isWishlistEmpty && this.renderActionBar() }
                { this.renderContent() }
                { !isWishlistEmpty && this.renderShareWishlist() }
            </div>
        );
    }
}

export default MyAccountMyWishlistComponent;
