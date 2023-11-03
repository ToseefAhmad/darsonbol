/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

/** @namespace Vested/ScandipwaIdentity/Plugin/LoginAccount/Component */
export class LoginAccountComponentPlugin {
    renderCreateAccountWrapper() {
        return null;
    }
}

const { renderCreateAccountWrapper } = new LoginAccountComponentPlugin();

export default {
    'Route/LoginAccount/Component': {
        'member-function': {
            renderCreateAccountWrapper: [
                {
                    position: 100,
                    implementation: renderCreateAccountWrapper
                }
            ]
        }
    }
};
