/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

export const UPDATE_SOCIAL_LOGINS = 'UPDATE_SOCIAL_LOGINS';
export const UPDATE_OTP_TAB = 'UPDATE_OTP_TAB';
export const UPDATE_OTP_VALUE = 'UPDATE_OTP_VALUE';
export const UPDATE_OTP_STEP = 'UPDATE_OTP_STEP';
export const UPDATE_PHONE_VALUE = 'UPDATE_PHONE_VALUE';
export const UPDATE_EMAIL_VALUE = 'UPDATE_EMAIL_VALUE';
export const UPDATE_FIRST_NAME_VALUE = 'UPDATE_FIRST_NAME_VALUE';
export const UPDATE_LAST_NAME_VALUE = 'UPDATE_LAST_NAME_VALUE';

/**
 * Update Social Logins
 * @param logins
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateSocialLogins */
export const updateSocialLogins = (logins) => ({
    type: UPDATE_SOCIAL_LOGINS,
    logins
});

/**
 * Update Otp Type
 * @param logins
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateOtpType */
export const updateOtpType = (optTabIndex) => ({
    type: UPDATE_OTP_TAB,
    optTabIndex
});

/**
 * Update Otp Type
 * @param logins
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateOtpValue */
export const updateOtpValue = (otpValue) => ({
    type: UPDATE_OTP_VALUE,
    otpValue
});

/**
 * Update Otp Type
 * @param otpType
 * @param index
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateOtpStep */
export const updateOtpStep = (otpType, index, token = null) => ({
    type: UPDATE_OTP_VALUE,
    otpType,
    index,
    token
});

/**
 * Update Phone Value
 * @param phoneValue
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updatePhoneValue */
export const updatePhoneValue = (phoneValue) => ({
    type: UPDATE_PHONE_VALUE,
    phoneValue
});

/**
 * Update Email Value
 * @param emailValue
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateEmailValue */
export const updateEmailValue = (emailValue) => ({
    type: UPDATE_EMAIL_VALUE,
    emailValue
});

/**
 * Update First Name Value
 * @param firstNameValue
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateFistNameValue */
export const updateFistNameValue = (firstNameValue) => ({
    type: UPDATE_FIRST_NAME_VALUE,
    firstNameValue
});

/**
 * Update Last Name Value
 * @param lastNameValue
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Identity/Action/updateLastNameValue */
export const updateLastNameValue = (lastNameValue) => ({
    type: UPDATE_LAST_NAME_VALUE,
    lastNameValue
});
