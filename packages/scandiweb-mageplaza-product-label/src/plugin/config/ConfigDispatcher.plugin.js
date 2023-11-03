/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import MageplazaConfig from '../../query/MageplazaConfig.query';

const addProductLabelsConfigToRequest = (args, callback) => ([
    ...callback(...args),
    MageplazaConfig.getQuery()
]);

export default {
    'Store/Config/Dispatcher': {
        'member-function': {
            prepareRequest: addProductLabelsConfigToRequest
        }
    }
};
