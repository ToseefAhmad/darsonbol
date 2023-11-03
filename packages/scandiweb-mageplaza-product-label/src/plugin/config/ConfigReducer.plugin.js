/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { UPDATE_CONFIG } from 'SourceStore/Config/Config.action';

const addProductLabelsConfigToState = (args, callback) => ({
    ...callback(...args),
    mpProductLabelsConfig: {}
});

const getProductLabelsConfigFromAction = (args, callback) => {
    const [, action] = args;
    const { type, config: { mpProductLabelsConfig } = {} } = action;

    if (type !== UPDATE_CONFIG) {
        return callback(...args);
    }

    return {
        ...callback(...args),
        mpProductLabelsConfig
    };
};

export default {
    'Store/Config/Reducer/getInitialState': {
        function: addProductLabelsConfigToState
    },
    'Store/Config/Reducer/ConfigReducer': {
        function: getProductLabelsConfigFromAction
    }
};
