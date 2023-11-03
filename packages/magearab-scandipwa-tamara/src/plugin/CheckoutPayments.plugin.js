/*
 * Copyright (c) 2022. Shaymaa Saied
 */


/** @namespace MagearabScandipwaTamara/Plugin/CheckoutPaymentsPlugin/Component */
class CheckoutPaymentsPlugin {

    aroundPaymentRenderMap = (originalMember, instance) => ({
        ...originalMember,
        [CHECKOUT_CARD]: this.renderCheckoutComCardPayment.bind(instance)
    });
}
