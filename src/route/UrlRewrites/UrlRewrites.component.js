import { lazy, Suspense } from 'react';

import { UrlRewrites as SourceUrlRewrites } from 'SourceRoute/UrlRewrites/UrlRewrites.component';

import {
    TYPE_CATEGORY,
    TYPE_CMS_PAGE,
    TYPE_NOTFOUND,
    TYPE_PRODUCT
} from './UrlRewrites.config';

// eslint-disable-next-line max-len
export const ProductPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "product" */ 'Route/ProductPage'));
// eslint-disable-next-line max-len
export const CategoryPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "category" */ 'Route/CategoryPage'));
export const CmsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/CmsPage'));
export const NoMatch = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "misc" */ 'Route/NoMatch'));

/** @namespace SonbolPwa/Route/UrlRewrites/Component */
export class UrlRewritesComponent extends SourceUrlRewrites {
    renderContent() {
        const { props, type } = this.props;
        const {
            id,
            history,
            location,
            match,
            productSKU,
            categoryIds,
            pageIds
        } = props;

        switch (type) {
        case TYPE_PRODUCT:
            return (
                    <ProductPage
                      history={ history }
                      location={ location }
                      match={ match }
                      productSKU={ productSKU }
                      productID={ id }
                      key={ id }
                    />
            );
        case TYPE_CMS_PAGE:
            return (
                    <CmsPage
                      history={ history }
                      location={ location }
                      match={ match }
                      pageIds={ pageIds }
                    />
            );
        case TYPE_CATEGORY:
            return (
                    <CategoryPage
                      history={ history }
                      location={ location }
                      match={ match }
                      categoryIds={ categoryIds }
                    />
            );
        case TYPE_NOTFOUND:
            return (
                    <NoMatch
                      history={ history }
                      location={ location }
                      match={ match }
                    />
            );
        default:
            return this.renderDefaultPage();
        }
    }
    render() {
        return (
            <Suspense fallback={ this.renderDefaultPage() }>
                { this.renderContent() }
            </Suspense>
        );
    }
}

export default UrlRewritesComponent;
