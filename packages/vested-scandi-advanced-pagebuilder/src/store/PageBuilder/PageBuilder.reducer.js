import {
    UPDATE_CURRENT_INDEX,
    UPDATE_CURRENT_PAGE_IDENTIFIERS,
    UPDATE_DIRECTION, UPDATE_IS_LOADING, UPDATE_IS_PAGE_LOADED
} from './PageBuilder.action';

export const initialState = {
    currentPageIdentifiers: '',
    currentTabIndex: 0,
    direction: 'ltr',
    isLoading: true,
    isPageLoaded: false
};

/** @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Reducer/PageBuilderReducer */
export const PageBuilderReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_CURRENT_PAGE_IDENTIFIERS:
        const { currentPageIdentifiers } = action;

        return {
            ...state,
            currentPageIdentifiers
        };
    case UPDATE_CURRENT_INDEX:
        const { index } = action;

        return {
            ...state,
            currentTabIndex: index
        };
    case UPDATE_DIRECTION:
        const { direction } = action;
        return {
            ...state,
            direction
        };
    case UPDATE_IS_LOADING:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    case UPDATE_IS_PAGE_LOADED:
        const { isPageLoaded } = action;

        return {
            ...state,
            isPageLoaded
        };
    default:
        return state;
    }
};

export default PageBuilderReducer;
