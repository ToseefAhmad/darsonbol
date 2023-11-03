/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { Field } from 'Util/Query';

/** @namespace Vested/ScandipwaIdentity/Query/IdentityQuery/Query */
export class IdentityQueryQuery {
    getQuery() {
        return new Field('amSocialLoginButtonConfig')
            .addField('type')
            .addField('url')
            .addField('label');
    }
}
export default new IdentityQueryQuery();
