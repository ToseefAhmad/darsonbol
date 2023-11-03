/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { MyAccountQuery as SourceMyAccountQuery } from 'Query/MyAccount.query';
import { Field } from 'Util/Query';

/** @namespace Vested/ScandipwaIdentity/Query/MyAccount/Query */
export class MyAccountQuery extends SourceMyAccountQuery {
    getLogoutMutation() {
        return new Field('logout')
            .addField('status');
    }

    /**
     * Get SendOtp mutation
     * @param {{identity_type: enum, identity: string, resend: bool}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getSendOtpMutation(options) {
        const { identity_type, identity, resend } = options;

        return new Field('agCustomerLoginSendOtp')
            .addArgument('input', 'AgCustomerLoginSendOtpInput!', { identity_type, identity, resend })
            .addField('message')
            .addField('resend')
            .addField('success');
    }

    /**
     * Get VerifyOtp mutation
     * @param {{identity_type: enum, identity: string, resend:bool}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getVerifyOtpMutation(options) {
        const { identity_type, identity, otp } = options;

        return new Field('agCustomerVerifyOtpAndLogin')
            .addArgument('input', 'AgCustomerVerifyOtpAndLoginInput!', { identity_type, identity, otp })
            .addField('message')
            .addField('token')
            .addField('success');
    }
}
export default new MyAccountQuery();
