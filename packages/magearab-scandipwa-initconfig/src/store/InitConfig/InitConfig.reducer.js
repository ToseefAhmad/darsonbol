/*
*
*
*
* */

import BrowserDatabase from '@scandipwa/scandipwa/src/util/BrowserDatabase';

import { UPDATE_INIT_CONFIG } from './InitConfig.action';

/** @namespace  MagearabScandipwaInitconfig/Store/InitConfig/Reducer/filterInitConfig */
export const filterInitConfig = (initConfig) => Object.entries(initConfig).reduce(
    (acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc),
    {}
);

export const {
    configuration
} = BrowserDatabase.getItem('initConfig') || {
    configuration: {}
};
/** @namespace  MagearabScandipwaInitconfig/Store/InitConfig/Reducer/getInitialState */
export const getInitialState = () => ({
    initConfig: {
        Configurations: {}
    }
});

/** @namespace  MagearabScandipwaInitconfig/Store/InitConfig/Reducer/InitConfigReducer */
export const InitConfigReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        initConfig
    } = action;

    switch (type) {
    case UPDATE_INIT_CONFIG:
        return {
            ...state,
            initConfig
            // Should be updated manually as filteredStoreConfig does not contain header_logo_src when it is null
            // and header_logo_src takes old value
        };
    default:
        return state;
    }
};
export default InitConfigReducer;
