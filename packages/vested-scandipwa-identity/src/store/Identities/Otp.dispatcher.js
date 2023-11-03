import { CHECKOUT, MY_ACCOUNT } from 'Component/Header/Header.config';
import {
    updateCustomerDetails,
    updateCustomerSignInStatus,
    updateIsLoading
} from 'Store/MyAccount/MyAccount.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { setAuthorizationToken } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getGuestQuoteId, setGuestQuoteId } from 'Util/Cart';
import { prepareQuery } from 'Util/Query';
import { executePost, fetchMutation, getErrorMessage } from 'Util/Request';

import IdentityQuery from '../../query/Identity.query';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const ProductCompareDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductCompare/ProductCompare.dispatcher'
);

export const CUSTOMER = 'customer';

export const ONE_MONTH_IN_SECONDS = 2628000;

/**
 * My account actions
 * @class MyAccount
 * @namespace Vested/ScandipwaIdentity/Store/Identities/Otp/Dispatcher */
export class OtpDispatcher {
    forceLogoutRedirectPages = [
        CHECKOUT,
        MY_ACCOUNT
    ];

    async requestCustomerData(dispatch) {
        const query = IdentityQuery.getCustomerQuery();
        // eslint-disable-next-line fp/no-let
        let customerData = {};

        await executePost(prepareQuery([query])).then(
            /** @namespace Vested/ScandipwaIdentity/Store/Identities/Otp/Dispatcher/OtpDispatcher/requestCustomerData/executePost/then */
            ({ customer }) => {
                dispatch(updateCustomerDetails(customer));
                BrowserDatabase.setItem(customer, CUSTOMER, ONE_MONTH_IN_SECONDS);
                customerData = customer;
            },
            /** @namespace Vested/ScandipwaIdentity/Store/Identities/Otp/Dispatcher/OtpDispatcher/requestCustomerData/executePost/then/dispatch/catch */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );

        return customerData;
    }

    async isEmailAvailable(email, dispatch) {
        const query = IdentityQuery.getIsEmailAvailableQuery(email);
        // eslint-disable-next-line fp/no-let
        let isAvailable = true;

        await executePost(prepareQuery([query])).then(
            /** @namespace Vested/ScandipwaIdentity/Store/Identities/Otp/Dispatcher/OtpDispatcher/isEmailAvailable/executePost/then */
            ({ isEmailAvailable: { is_email_available } }) => {
                isAvailable = is_email_available;
            },
            /** @namespace Vested/ScandipwaIdentity/Store/Identities/Otp/Dispatcher/OtpDispatcher/isEmailAvailable/executePost/then/dispatch/catch */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );

        return isAvailable;
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccountDispatcher
    createAccount(options = {}, dispatch) {
        const { customer: { email }, password } = options;
        const mutation = MyAccountQuery.getCreateAccountMutation(options);
        dispatch(updateIsLoading(true));

        return fetchMutation(mutation).then(
            (data) => {
                const { createCustomer: { customer } } = data;
                const { confirmation_required } = customer;

                if (confirmation_required) {
                    dispatch(updateIsLoading(false));

                    return CONFIRMATION_REQUIRED;
                }

                return this.signIn({ email, password }, dispatch);
            },

            (error) => {
                dispatch(updateIsLoading(false));
                dispatch(showNotification('error', getErrorMessage(error)));
                return false;
            }
        );
    } */

    /**
     * Sign in action
     * @param {identity_type: Enum, identity: String, resend: Bool}  options={}
     * @memberof MyAccountDispatcher
     */
    async sendOtp(options = {}, dispatch) {
        const mutation = IdentityQuery.getSendOtpMutation(options);

        dispatch(updateIsLoading(true));

        const result = await fetchMutation(mutation);
        const { agCustomerLoginSendOtp: { success, message } } = result;

        if (success) {
            dispatch(showNotification('success', __('We send OTP to you!')));
        } else {
            dispatch(showNotification('error', __(message)));
            dispatch(updateIsLoading(false));
            return false;
        }

        dispatch(updateIsLoading(false));

        return true;
    }

    /**
     * Sign in action
     * @param {identity_type: Enum, identity: String, otp: String} options={}
     * @memberof MyAccountDispatcher
     */
    async verifyOtp(options = {}, dispatch) {
        dispatch(updateIsLoading(true));

        const verifyRes = {
            isSuccess: true,
            needToReview: true,
            customerData: {},
            token: null
        };

        const mutation = IdentityQuery.getVerifyOtpMutation(options);

        const result = await fetchMutation(mutation);
        const { agCustomerVerifyOtpAndLogin: { token, message, customer_data } } = result;

        if (!token) {
            dispatch(showNotification('error', __(message ?? '')));
            dispatch(updateIsLoading(false));
            verifyRes.isSuccess = false;
            return verifyRes;
        }

        verifyRes.customerData = customer_data;
        verifyRes.token = token;

        dispatch(updateIsLoading(false));
        dispatch(showNotification('success', __('You are successfully logged in!')));

        // eslint-disable-next-line no-magic-numbers
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
            (!customer_data.firstname.toString()
                .trim() && !customer_data.lastname.trim())
            // || !customer_data.mobilenumber
            || /^(\d+)@/.test(customer_data.email)
        ) {
            verifyRes.needToReview = true;
        } else {
            verifyRes.needToReview = false;
            setAuthorizationToken(token);
            await this.completeLoginProcess(token, dispatch);
        }

        return verifyRes;
    }

    async completeLoginProcess(token, dispatch) {
        await this.requestCustomerData(dispatch);

        ProductCompareDispatcher.then(
            ({ default: dispatcher }) => dispatcher.assignCompareList(dispatch)
        );

        const cartDispatcher = (await CartDispatcher).default;
        const guestCartToken = getGuestQuoteId();
        // if customer is authorized, `createEmptyCart` mutation returns customer cart token
        const customerCartToken = await cartDispatcher.createGuestEmptyCart(dispatch);

        if (guestCartToken && guestCartToken !== customerCartToken) {
            // merge guest cart id and customer cart id using magento capabilities
            await cartDispatcher.mergeCarts(guestCartToken, customerCartToken, dispatch);
        }

        setGuestQuoteId(customerCartToken);
        await cartDispatcher.updateInitialCartData(dispatch);

        WishlistDispatcher.then(
            ({ default: dispatcher }) => dispatcher.updateInitialWishlistData(dispatch)
        );

        dispatch(updateCustomerSignInStatus(true));
        dispatch(hideActiveOverlay());
    }

    /**
     * Update Customer Information
     * @param {firstname: String, lastname: String, email: String, mobilenumber: String}  options={}
     * @param dispatch
     * @param token
     * @memberof MyAccountDispatcher
     */
    async updateCustomerInformation(options = {}, dispatch, token) {
        dispatch(updateIsLoading(true));

        if (!/^(\d+)@/.test(options.email)) {
            const isAvailable = await this.isEmailAvailable(options.email, dispatch);
            console.warn(isAvailable);
            if (!isAvailable) {
                dispatch(
                    showNotification(
                        'error',
                        __('The email address already used in other account, please use other one!')
                    )
                );
                dispatch(updateIsLoading(false));
                return false;
            }
        }

        setAuthorizationToken(token);

        const mutation = IdentityQuery.getUpdateInformationMutation(options);

        const result = await fetchMutation(mutation);
        const { agCustomerInfoUpdate: { message, success } } = result;

        if (success) {
            dispatch(showNotification('success', __('Thank you for completing your information...')));
            dispatch(updateCustomerSignInStatus(true));
            dispatch(hideActiveOverlay());
        } else {
            dispatch(showNotification('error', __(message)));
            dispatch(updateIsLoading(false));
            return false;
        }

        await this.requestCustomerData(dispatch);

        dispatch(updateIsLoading(false));

        return true;
    }
}

export default new OtpDispatcher();
