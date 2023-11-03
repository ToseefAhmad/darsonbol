/* eslint-disable max-lines */
import { Suspense } from 'react';

import CategoryProductList from 'Component/CategoryProductList';
// import CategorySort from 'Component/CategorySort';
import ContentWrapper from 'Component/ContentWrapper';
import GridIcon from 'Component/GridIcon';
import ListIcon from 'Component/ListIcon';
import {
    CategoryFilterOverlay,
    CategoryPage as SourceCategoryPage
} from 'SourceRoute/CategoryPage/CategoryPage.component';
import { isCrawler, isSSR } from 'Util/Browser';

import CategorySortModal from '../../component/CategorySortModal/CategorySortModal.component';
import MobileFilterIconComponent from '../../component/MobileFilterIcon/MobileFilterIcon.component';
import {
    GRID_LAYOUT,
    LIST_LAYOUT
} from './CategoryPage.config';

import './CategoryPage.override.style';

export {
    CategoryFilterOverlay
};

/** @namespace SonbolPwa/Route/CategoryPage/Component */
export class CategoryPageComponent extends SourceCategoryPage {
    renderFilterButton() {
        const {
            isContentFiltered,
            totalPages,
            category: { is_anchor },
            isSearchPage
        } = this.props;

        if ((!isContentFiltered && totalPages === 0) || (!is_anchor && !isSearchPage)) {
            return null;
        }

        return (
            <button
              block="CategoryPage"
              elem="Filter"
              onClick={ this.onFilterButtonClick }
            >
                <MobileFilterIconComponent />
                <span>{ __('Filters') }</span>
                { this.renderFiltersCount() }
            </button>
        );
    }
    // TODO implement logic
    renderLayoutButton(type) {
        const {
            onGridButtonClick,
            onListButtonClick,
            isMobile,
            selectedLayoutType
        } = this.props;

        // const { activeLayoutType } = this.state;
        // isActive={ activeLayoutType === GRID_LAYOUT }

        switch (type) {
        case GRID_LAYOUT:
            return (
                    <button
                      key={ type }
                      onClick={ onGridButtonClick }
                      mix={ { block: GRID_LAYOUT, mods: { isActive: selectedLayoutType === GRID_LAYOUT } } }
                      aria-label="grid"
                    >
                        <GridIcon isMobile={ isMobile } isActive={ selectedLayoutType === GRID_LAYOUT } />
                    </button>
            );
        case LIST_LAYOUT:
            return (
                    <button
                      key={ type }
                      onClick={ onListButtonClick }
                      mix={ { block: LIST_LAYOUT, mods: { isActive: selectedLayoutType === LIST_LAYOUT } } }
                      aria-label="list"
                    >
                        <ListIcon isMobile={ isMobile } isActive={ selectedLayoutType === LIST_LAYOUT } />
                    </button>
            );
        default:
            return false;
        }
    }

    renderLayoutButtons() {
        const { plpTypes } = this.props;
        /*
        * So far there is only two types of
        * the Storefront list modes
         */
        if (plpTypes.length !== 2) {
            return null;
        }

        return (
            <div block="CategoryPage" elem="LayoutButtons">
                { plpTypes.map(this.renderLayoutButton.bind(this)) }
            </div>
        );
    }
    renderCategorySort() {
        const {
            sortFields,
            selectedSort,
            onSortChange,
            isMatchingInfoFilter,
            isMobile

        } = this.props;

        const { options = {} } = sortFields;
        const updatedSortFields = Object.values(options).map(({ value: id, label }) => ({ id, label }));
        const { sortDirection, sortKey } = selectedSort;

        return (
            <CategorySortModal
              isMatchingInfoFilter={ isMatchingInfoFilter }
              onSortChange={ onSortChange }
              sortFields={ updatedSortFields }
              sortKey={ sortKey }
              sortDirection={ sortDirection }
              isMobile={ isMobile }
            />
            // <CategorySort
            //   isMatchingInfoFilter={ isMatchingInfoFilter }
            //   onSortChange={ onSortChange }
            //   sortFields={ updatedSortFields }
            //   sortKey={ sortKey }
            //   sortDirection={ sortDirection }
            // />
        );
    }
    renderMiscellaneous() {
        const { totalItems } = this.props;

        if (totalItems === 0 || !this.displayProducts()) {
            return <aside block="CategoryPage" elem="Miscellaneous" mods={ { noResults: true } } />;
        }

        return (
            <aside block="CategoryPage" elem="Miscellaneous">
                { this.renderCategorySort() }
                <div
                  block="CategoryPage"
                  elem="LayoutWrapper"
                  mods={ { isPrerendered: isSSR() || isCrawler() } }
                >
                    { this.renderLayoutButtons() }
                </div>
                { this.renderFilterButton() }
            </aside>
        );
    }
    renderFilterOverlay() {
        const {
            filters,
            selectedFilters,
            isMatchingInfoFilter,
            isSearchPage,
            isMobile
        } = this.props;

        const { category: { is_anchor } } = this.props;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderFilterPlaceholder() }>
                <CategoryFilterOverlay
                  availableFilters={ filters }
                  customFiltersValues={ selectedFilters }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                  isCategoryAnchor={ !!is_anchor }
                  isSearchPage={ isSearchPage }
                  isMobile={ isMobile }
                />
            </Suspense>
        );
    }
    renderCategoryProductList() {
        const {
            filter,
            search,
            selectedSort,
            selectedFilters,
            isMatchingListFilter,
            isCurrentCategoryLoaded,
            isMatchingInfoFilter,
            selectedLayoutType
        } = this.props;

        // const { selectedLayoutType } = this.state;

        if (!this.displayProducts()) {
            return null;
        }

        return (
            <div
              block="CategoryPage"
              elem="ProductListWrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderItemsCount(true) }
                <CategoryProductList
                  filter={ filter }
                  qsearch={ search }
                  sort={ selectedSort }
                  selectedFilters={ selectedFilters }
                  isCurrentCategoryLoaded={ isCurrentCategoryLoaded }
                  isMatchingListFilter={ isMatchingListFilter }
                  isMatchingInfoFilter={ isMatchingInfoFilter }
                    //   layout={ activeLayoutType || GRID_LAYOUT }
                  layout={ selectedLayoutType || GRID_LAYOUT }
                />
            </div>
        );
    }

    renderContent() {
        return (
            <>
                { /* {this.renderCategoryDetails()} */ }
                { this.renderCmsBlock() }
                <div className="cate-main-container">
                    <div className="filter-overlay">
                        { this.renderFilterOverlay() }
                    </div>
                    <div className="product-list">
                        { this.renderMiscellaneous() }
                        { this.renderCategoryProductList() }
                    </div>
                </div>
            </>
        );
    }
    render() {
        const hideProducts = !this.displayProducts();
        const { totalItems } = this.props;

        return (
            <main block="CategoryPage" mods={ { noResults: totalItems === 0 } }>
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper',
                      mods: { hideProducts }
                  } }
                  label="Category page"
                >
                    { this.renderCategoryDetails() }
                    { this.renderContent() }
                </ContentWrapper>
            </main>
        );
    }
}

export default CategoryPageComponent;
