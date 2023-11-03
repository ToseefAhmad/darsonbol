/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { Field } from 'Util/Query';

/** @namespace Vested/ScandipwaIdentity/Query/Identity/Query */
export class IdentityQuery {
    getQuery() {
        return new Field('amSocialLoginButtonConfig')
            .addField('type')
            .addField('url')
            .addField('label');
    }

    getIsEmailAvailableQuery(email) {
        return new Field('isEmailAvailable')
            .addArgument('email', 'String!', email)
            .addField('is_email_available');
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
     * @param {{identity_type: enum, identity: string, otp: string}} options A object containing different aspects of query, each item can be omitted
     * @return {Field}
     * @memberof MyAccount
     */
    getVerifyOtpMutation(options) {
        const { identity_type, identity, otp } = options;

        return new Field('agCustomerVerifyOtpAndLogin')
            .addArgument('input', 'AgCustomerVerifyOtpAndLoginInput!', { identity_type, identity, otp })
            .addFieldList([
                'message',
                'token',
                this._getCustomerDataField()
            ]);
    }

    _getCustomerDataField() {
        return new Field('customer_data')
            .addFieldList([
                'firstname',
                'lastname',
                'mobilenumber',
                'email'
            ]);
    }

    getCustomerQuery() {
        return this._getCustomerField();
    }

    _getCustomerField() {
        return new Field('customer')
            .addFieldList(this._getCustomerFields());
    }

    _getCustomerFields() {
        return [
            'created_at',
            'confirmation_required',
            'group_id',
            'mobilenumber',
            'prefix',
            'firstname',
            'middlename',
            'lastname',
            'suffix',
            'email',
            'default_billing',
            'default_shipping',
            'taxvat',
            'id',
            'is_subscribed',
            this._getAddressesField()
        ];
    }

    _getAddressesField() {
        return new Field('addresses')
            .addFieldList(this._getAddressFields());
    }

    _getRegionField() {
        return new Field('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields() {
        return [
            'region_code',
            'region',
            'region_id'
        ];
    }

    _getAddressFields() {
        return [
            'id',
            'customer_id',
            'country_id',
            'street',
            'telephone',
            'postcode',
            'city',
            'firstname',
            'lastname',
            'middlename',
            'prefix',
            'suffix',
            'default_shipping',
            'default_billing',
            'vat_id',
            this._getRegionField()
        ];
    }

    getLogoutMutation() {
        return new Field('logout')
            .addField('status');
    }

    getUpdateInformationMutation(options) {
        return new Field('agCustomerInfoUpdate')
            .addArgument('input', 'AgCustomerInfoUpdateInput!', options)
            .addFieldList([
                'success',
                'message',
                new Field('customer_data').addFieldList([
                    'firstname',
                    'lastname',
                    'mobilenumber',
                    'email'
                ])
            ]);
    }
}
export default new IdentityQuery();
