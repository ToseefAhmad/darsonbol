/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';

import { BILLING_STEP, DETAILS_STEP, SHIPPING_STEP } from 'Route/Checkout/Checkout.config';

import { LOGIN_STEP } from '../route/Checkout/Checkout.config';

export const PaymentMethodType = PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string
});

export const PaymentMethodsType = PropTypes.arrayOf(
    PaymentMethodType
);

export const ShippingMethodType = PropTypes.shape({
    amount: PropTypes.number,
    available: PropTypes.bool,
    base_amount: PropTypes.number,
    carrier_code: PropTypes.string,
    carrier_title: PropTypes.string,
    error_message: PropTypes.string,
    method_code: PropTypes.string,
    method_title: PropTypes.string,
    price_excl_tax: PropTypes.number,
    price_incl_tax: PropTypes.number
});

export const ShippingMethodsType = PropTypes.arrayOf(
    ShippingMethodType
);

export const StoreType = PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    pickup_location_code: PropTypes.string,
    postcode: PropTypes.string,
    region: PropTypes.string,
    street: PropTypes.string
});

export const CheckoutStepType = PropTypes.oneOf([
    LOGIN_STEP,
    BILLING_STEP,
    SHIPPING_STEP,
    DETAILS_STEP
]);
