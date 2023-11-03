import { PageBuilderReducer } from '../store/PageBuilder/index';

/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/StoreReducer/Plugin/getStaticReducers */
export const getStaticReducers = (args, callback) => ({
    ...callback(...args),
    PageBuilderReducer
});

export const config = {
    'Store/Index/getStaticReducers': {
        function: getStaticReducers
    }
};

export default config;
