/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import MageplazaLabelQuery from '../../query/MageplazaLabel.query';

const addProductLabelDataToProduct = (args, callback) => ([
    ...callback(...args),
    MageplazaLabelQuery.getQuery()
]);

export default {
    'Query/ProductList/Query': {
        'member-function': {
            _getProductInterfaceFields: addProductLabelDataToProduct
        }
    }
};

