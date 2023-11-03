/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Helvijs Sebris <info@scandiweb.com>
 * @copyright Copyright (c) 2021 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { IdentityDispatcher } from '../store/Identities';

/** @namespace Vested/ScandipwaIdentity/Plugin/Router/Container */
export class RouterContainerPlugin {
    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;
        const original = callback.apply(instance, args);

        return {
            ...original,
            init: (options) => {
                original.init(options);
                IdentityDispatcher.handleData(dispatch);
            }
        };
    };
}

const { mapDispatchToProps } = new RouterContainerPlugin();

export default {
    'Component/Router/Container/mapDispatchToProps': {
        function: mapDispatchToProps
    }
};
