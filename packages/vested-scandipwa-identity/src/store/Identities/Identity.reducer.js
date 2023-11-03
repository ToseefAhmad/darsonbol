/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import {
    UPDATE_EMAIL_VALUE, UPDATE_FIRST_NAME_VALUE, UPDATE_LAST_NAME_VALUE,
    UPDATE_OTP_STEP, UPDATE_OTP_TAB, UPDATE_OTP_VALUE, UPDATE_PHONE_VALUE, UPDATE_SOCIAL_LOGINS
} from './Identity.action';

export const initialState = {
    logins: [],
    isLoading: true,
    optTabIndex: 0,
    otpValue: '',
    activePhoneStep: 0,
    activeEmailStep: 0,
    phoneValue: '',
    emailValue: '',
    token: null,
    firstNameValue: '',
    lastNameValue: ''
};

/** @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Reducer/IdentityReducer */
export const IdentityReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case UPDATE_SOCIAL_LOGINS:
        const { logins } = action;

        return {
            ...state,
            logins,
            isLoading: false
        };
    case UPDATE_OTP_TAB:
        const { optTabIndex } = action;

        return {
            ...state,
            optTabIndex
        };
    case UPDATE_OTP_VALUE:
        const { otpValue } = action;

        return {
            ...state,
            otpValue
        };
    case UPDATE_OTP_STEP:
        const { otpType, index, token } = action;

        switch (otpType) {
        case 'phone':
            return {
                ...state,
                activePhoneStep: index,
                token
            };
        default:
            return {
                ...state,
                activeEmailStep: index,
                token
            };
        }
    case UPDATE_PHONE_VALUE:
        const { phoneValue } = action;

        return {
            ...state,
            phoneValue
        };
    case UPDATE_EMAIL_VALUE:
        const { emailValue } = action;

        return {
            ...state,
            emailValue
        };
    case UPDATE_FIRST_NAME_VALUE:
        const { firstNameValue } = action;

        return {
            ...state,
            firstNameValue
        };
    case UPDATE_LAST_NAME_VALUE:
        const { lastNameValue } = action;

        return {
            ...state,
            lastNameValue
        };
    default:
        return state;
    }
};

export default IdentityReducer;
