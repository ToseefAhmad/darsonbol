/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { showNotification } from 'Store/Notification/Notification.action';
import { QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { IdentityQuery } from '../../query';
import { updateSocialLogins } from './Identity.action';

/**
 * SocialLogin Dispatcher
 * @extends QueryDispatcher
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Dispatcher */
export class IdentityDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct(ONE_MONTH_IN_SECONDS);
    }

    onSuccess(data, dispatch) {
        if (data) {
            const { amSocialLoginButtonConfig } = data;

            dispatch(updateSocialLogins(amSocialLoginButtonConfig));
        }
    }

    onError([{ message }], dispatch) {
        dispatch(showNotification('error', 'Error fetching Post!', message));
    }

    prepareRequest() {
        return IdentityQuery.getQuery();
    }
}

export default new (IdentityDispatcher)();
