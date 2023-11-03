/**
 * landingPages: [],
 *     currentTabIndex: 0,
 *     currentPageBuilderRendered: [],
 *     direction: 'ltr',
 *     isLoading: true,
 *     isPageLoaded: false
 */

export const UPDATE_CURRENT_PAGE_IDENTIFIERS = 'UPDATE_CURRENT_PAGE_IDENTIFIERS';
export const UPDATE_CURRENT_INDEX = 'UPDATE_CURRENT_INDEX';
export const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
export const UPDATE_IS_PAGE_LOADED = 'UPDATE_IS_PAGE_LOADED';

/**
 * updateCurrentPageIdentifiers
 * @param currentPageIdentifiers
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Action/updateCurrentPageIdentifiers */
export const updateCurrentPageIdentifiers = (currentPageIdentifiers) => ({
    type: UPDATE_CURRENT_PAGE_IDENTIFIERS,
    currentPageIdentifiers
});

/**
 * updateCurrentIndex
 * @param index
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Action/updateCurrentIndex */
export const updateCurrentIndex = (index) => ({
    type: UPDATE_CURRENT_INDEX,
    index
});

/**
 * updateDirection
 * @param direction
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Action/updateDirection */
export const updateDirection = (direction) => ({
    type: UPDATE_DIRECTION,
    direction
});

/**
 * updateIsLoading
 * @param isLoading
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Action/updateIsLoading */
export const updateIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING,
    isLoading
});

/**
 * updateIsPageLoaded
 * @param isPageLoaded
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Action/updateIsPageLoaded */
export const updateIsPageLoaded = (isPageLoaded) => ({
    type: UPDATE_IS_PAGE_LOADED,
    isPageLoaded
});
