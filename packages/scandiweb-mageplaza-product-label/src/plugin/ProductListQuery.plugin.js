/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import MageplazaLabelQuery from '../query/MageplazaLabel.query';

const _getProductInterfaceFields = (args, callback, instance) => ([
    ...callback.apply(instance, args),
    MageplazaLabelQuery.getQuery()
]);

export default {
    'Query/ProductList/Query': {
        'member-function': {
            _getProductInterfaceFields
        }
    }
};
