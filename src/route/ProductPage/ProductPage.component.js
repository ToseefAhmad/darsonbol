/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import { lazy, Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader/Loader.component';
import ProductActions from 'Component/ProductActions';
import ProductLinks from 'Component/ProductLinks';
import NoMatchHandler from 'Route/NoMatchHandler';
import {
    ProductPage as SourceProductPage
} from 'SourceRoute/ProductPage/ProductPage.component';
import { RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';

import PaymentMethodsFooter from '../../component/PaymentMethodsFooter/PaymentMethodsFooter.component';

import './ProductPage.override.style.scss';

export const ProductGallery = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-gallery" */
    'Component/ProductGallery'
));

/** @namespace SonbolPwa/Route/ProductPage/Component */
export class ProductPageComponent extends SourceProductPage {
    componentDidMount() {
        document.body.classList.add('product__view');
    }
    componentWillUnmount() {
        document.body.classList.remove('product__view');
    }
    renderProductPageContent() {
        const {
            getLink,
            dataSource,
            areDetailsLoaded,
            activeProduct,
            setActiveProduct,
            useEmptyGallerySwitcher,
            parameters,
            isVariant,
            isMobile,
            navigationState: { name },
            totals
        } = this.props;

        return (
            <>
                <Suspense fallback={ <Loader /> }>
                    <ProductGallery
                      product={ activeProduct }
                      areDetailsLoaded={ areDetailsLoaded }
                      isWithEmptySwitcher={ useEmptyGallerySwitcher }
                      showLoader={ isVariant }
                    />
                </Suspense>
                <ProductActions
                  totals={ totals }
                  isMobile={ isMobile }
                  pageName={ name }
                  isVariant={ isVariant }
                  getLink={ getLink }
                  product={ dataSource }
                  parameters={ parameters }
                  areDetailsLoaded={ areDetailsLoaded }
                  setActiveProduct={ setActiveProduct }
                />
            </>
        );
    }

    renderAdditionalSections() {
        const {
            areDetailsLoaded,
            isMobile
        } = this.props;

        return (
            <>
                { this.renderProductTabs() }
                <ProductLinks
                  isMobile={ isMobile }
                  linkType={ RELATED }
                  title={ __('Recommended for you') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
                <ProductLinks
                  isMobile={ isMobile }
                  linkType={ UPSELL }
                  title={ __('You might also like') }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </>
        );
    }
    render() {
        const { navigationState, isMobile } = this.props;
        const { name } = navigationState;

        return (
    <NoMatchHandler>
        <main
          block="ProductPage"
          aria-label="Product page"
          itemScope
          itemType="http://schema.org/Product"
        >
            <ContentWrapper
              wrapperMix={ { block: 'ProductPage', elem: 'Wrapper' } }
              label={ __('Main product details') }
            >
                { this.renderProductPageContent() }
            </ContentWrapper>
            { this.renderAdditionalSections() }
            { (name === 'pdp' && isMobile) ? <PaymentMethodsFooter isMobile={ isMobile } /> : null }
            { this.renderReviewPopup() }
        </main>
    </NoMatchHandler>
        );
    }
}

export default ProductPageComponent;
