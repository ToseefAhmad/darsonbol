/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

/** @namespace Vested/ScandipwaIdentity/Plugin/UrlHandler/Plugin */
export class UrlHandlerPlugin {
    getBypassCacheHosts = (args, callback, instance) => ([
        ...callback.apply(instance, args),
        '(?!^.*sociallogin/login/.*)',
        '(?!^.*sociallogin/endpoint/.*)'
    ]);
}

const { getBypassCacheHosts } = new UrlHandlerPlugin();

export const config = {
    'SW/Handler/UrlHandler/getBypassCacheHosts': {
        function: [
            {
                position: 92,
                implementation: getBypassCacheHosts
            }
        ]
    }
};

export default config;
