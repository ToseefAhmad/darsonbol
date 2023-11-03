/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import Overlay from 'Component/Overlay';
import {
    CategoryFilterOverlay as SourceCategoryFilterOverlay
} from 'SourceComponent/CategoryFilterOverlay/CategoryFilterOverlay.component';

import { CATEGORY_FILTER_OVERLAY_ID } from './CategoryFilterOverlay.config';

import './CategoryFilterOverlay.override.style';

/** @namespace SonbolPwa/Component/CategoryFilterOverlay/Component */
export class CategoryFilterOverlayComponent extends SourceCategoryFilterOverlay {
    // TODO implement logic

    renderDefaultFilters() {
        const { customFiltersValues } = this.props;
        const hasValues = Object.entries(customFiltersValues).length !== 0;
        return (
            <>
                { this.renderHeading() }
                { hasValues
                    ? (
                        <div block="CategoryFilterOverlay" elem="ResetSection">
                        { this.renderResetAttributes() }
                        { this.renderResetButton() }
                        </div>
                    ) : null }

                { this.renderFilters() }
            </>
        );
    }

    render() {
        const {
            onVisible,
            onHide,
            totalPages,
            isProductsLoading,
            isContentFiltered,
            isCategoryAnchor,
            isSearchPage,
            isMobile,
            onSeeResultsClick
        } = this.props;

        // show CategoryFilterOverlay for 1. categories marked as `anchor` in Magento admin 2. Search page
        if ((!isProductsLoading && totalPages === 0 && !isContentFiltered) || (!isCategoryAnchor && !isSearchPage)) {
            return (
                <div block="CategoryFilterOverlay" />
            );
        }

        return (
            <Overlay
              onVisible={ onVisible }
              onHide={ onHide }
              mix={ { block: 'CategoryFilterOverlay' } }
              id={ CATEGORY_FILTER_OVERLAY_ID }
              isRenderInPortal={ false }
            >
                <div block="CategoryFilterOverlay" elem="Wrapper">
                    { isMobile ? (
                        <div className="filterhead">
                            <div className="txtfilhd">{ __('Filter By') }</div>
                            <div className="txtfiltracors" onClick={ onSeeResultsClick }>
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
                    ) : null }
                    { this.renderContent() }
                    { this.renderLoader() }
                </div>
            </Overlay>
        );
    }
}

export default CategoryFilterOverlayComponent;
