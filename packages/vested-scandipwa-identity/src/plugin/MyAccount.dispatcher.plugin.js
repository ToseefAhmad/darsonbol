/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandiweb/scandipwa-gtm
 * @author  Ainars Sondors <info@scandiweb.com>
 */
// import { fetchMutation } from 'Util/Request';

// import IdentityQuery from '../query/Identity.query';

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccount/Dispatcher */
export class MyAccountDispatcher {
    // eslint-disable-next-line no-unused-vars
    logout = (args, callback, _instance) => {
        /* const query = IdentityQuery.getLogoutMutation();

        fetchMutation(query); */
        callback(...args);
    };
}

const {
    logout
} = new MyAccountDispatcher();

export default {
    'Store/MyAccount/Dispatcher': {
        'member-function': {
            logout
        }
    }
};
