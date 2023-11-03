/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
import PropTypes from 'prop-types';

import Loader from 'Component/Loader';
import {
    ProductWishlistButton as SourceProductWishlistButton
} from 'SourceComponent/ProductWishlistButton/ProductWishlistButton.component';

// import HeartIcon from '../HeartIcon/HeartIcon.component';
import WhiteHeartIconComponent from '../WhiteHeartIcon/WhiteHeartIcon.component';

/** @namespace SonbolPwa/Component/ProductWishlistButton/Component */
export class ProductWishlistButtonComponent extends SourceProductWishlistButton {
    static propTypes = {
        isInWishlist: PropTypes.bool,
        isSignedIn: PropTypes.bool,
        isPdp: PropTypes.bool,
        isMobile: PropTypes.bool
    };

    static defaultProps = {
        isPdp: false
    };
    getTitle() {
        const { isInWishlist, isSignedIn } = this.props;

        if (!isSignedIn) {
            return __('Please sign in first!');
        }

        if (isInWishlist) {
            return __('Remove from Wishlist');
        }

        return __('Add to Wishlist');
    }

    onClick(e) {
        const {
            magentoProduct,
            isInWishlist,
            addToWishlist,
            removeFromWishlist
        } = this.props;

        e.preventDefault();

        if (!isInWishlist) {
            return addToWishlist(magentoProduct);
        }

        return removeFromWishlist(magentoProduct);
    }

    renderButton() {
        const {
            isInWishlist, isDisabled, mix, isPdp, isMobile
        } = this.props;

        return (
            <button
              block="ProductWishlistButton"
              elem="Button"
              mods={ { isInWishlist, isDisabled } }
              mix={ { block: 'Button', mix } }
              title={ this.getTitle() }
              onClick={ this.onClick }
            >
                <WhiteHeartIconComponent isMobile={ isMobile } isPdp={ isPdp } isActive={ isInWishlist } />
            </button>
        );
    }

    renderLoader() {
        const { isLoading } = this.props;

        return (
            <Loader isLoading={ isLoading } />
        );
    }

    renderContent() {
        return (
            <div block="ProductWishlistButton">
                { this.renderButton() }
                { this.renderLoader() }
            </div>
        );
    }

    render() {
        const { magentoProduct } = this.props;
        if (Array.isArray(magentoProduct) && magentoProduct.length > 0) {
            return this.renderContent();
        }

        return null;
    }
}

export default ProductWishlistButtonComponent;
