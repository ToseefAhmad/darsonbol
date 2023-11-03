/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { updateCustomerSignInStatus } from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccount/State */
export class MyAccountStatePlugin {
    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;

        return {
            ...callback.apply(instance, args),
            updateIsSignedIn: (state) => dispatch(updateCustomerSignInStatus(state)),
            showNotification: (type, message) => dispatch(showNotification(type, message))
        };
    };
}

export const { mapDispatchToProps } = new MyAccountStatePlugin();

export const config = {
    'Route/MyAccount/Container/mapDispatchToProps': {
        function: [
            {
                position: 100,
                implementation: mapDispatchToProps
            }
        ]
    }
};

export default config;
