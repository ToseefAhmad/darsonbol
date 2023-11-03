/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import PropTypes from 'prop-types';

import { ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { HistoryType } from 'Type/Router.type';
import { getAuthorizationToken, setAuthorizationToken } from 'Util/Auth';
import isMobile from 'Util/Mobile';
import { convertQueryStringToKeyValuePairs } from 'Util/Url';

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccount/Container */
export class MyAccountOverlayContainerPlugin {
    // eslint-disable-next-line react/static-property-placement
    propTypes = (originalMember) => ({
        ...originalMember,
        history: HistoryType.isRequired,
        showNotification: PropTypes.func.isRequired
    });

    redirectIfNotSignedIn = (args, callback, instance) => {
        const {
            isSignedIn,
            requestCustomerData,
            history: {
                location: { search }
            },
            history,
            updateIsSignedIn
        } = instance.props;

        const { token } = convertQueryStringToKeyValuePairs(search);

        if (token) {
            setAuthorizationToken(token);
            updateIsSignedIn(true);
            requestCustomerData();
            history.push(`${ ACCOUNT_URL }`);
        }

        if (isMobile.any()) { // do not redirect on mobile
            return;
        }

        if (!isSignedIn && !getAuthorizationToken()) {
            history.push('/');
        }
    };
}

// eslint-disable-next-line react/forbid-foreign-prop-types
export const { propTypes, redirectIfNotSignedIn } = new MyAccountOverlayContainerPlugin();

export const config = {
    'Route/MyAccount/Container': {
        'static-member': {
            propTypes: [
                {
                    position: 100,
                    implementation: propTypes
                }
            ]
        },
        'member-function': {
            redirectIfNotSignedIn: [
                {
                    position: 100,
                    implementation: redirectIfNotSignedIn
                }
            ]
        }
    }
};

export default config;
