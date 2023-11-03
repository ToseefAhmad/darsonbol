/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { IdentityReducer } from '../store/Identities';

/** @namespace Vested/ScandipwaIdentity/Plugin/IdentityReducer/Plugin */
export class IdentityReducerPlugin {
    getReducers = (args, callback, instance) => ({
        ...callback.apply(instance, args),
        IdentityReducer
    });
}

const { getReducers } = new IdentityReducerPlugin();

export const config = {
    'Store/Index/getStaticReducers': {
        function: getReducers
    }
};

export default config;
