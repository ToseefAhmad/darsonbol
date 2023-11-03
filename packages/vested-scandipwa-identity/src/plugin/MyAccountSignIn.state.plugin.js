/* eslint-disable max-len */
/* eslint-disable react/sort-comp */
/**
 * @category  ScandiPWA
 * @package   Vested_ScandipwaIdentity
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

// import history from '@scandipwa/scandipwa/src/util/History';
import { PureComponent } from 'react';

import { showNotification } from 'Store/Notification/Notification.action';

export const OtpDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../store/Identities/Otp.dispatcher'
);

export const OtpLoginSteps = {
    phone: [
        'Enter your phone',
        'Verify OTP',
        'Review your data'
    ],
    email: [
        'Enter your email',
        'Verify OTP',
        'Review your data'
    ]
};

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccountSignIn/State */
export class MyAccountSignInStatePlugin extends PureComponent {
    props = {};

    updateCurrentProps = (props) => {
        this.props = props;
    };

    mapStateToProps = (args, callback, instance) => {
        const [state] = args;
        return {
            ...callback.apply(instance, args),
            logins: state.IdentityReducer.logins,
            optTabIndex: state.IdentityReducer.optTabIndex,
            otpValue: state.IdentityReducer.otpValue,
            isSocialLoginsLoading: state.IdentityReducer.isLoading,
            activePhoneStep: state.IdentityReducer.activePhoneStep,
            activeEmailStep: state.IdentityReducer.activeEmailStep,
            phoneValue: state.IdentityReducer.phoneValue,
            emailValue: state.IdentityReducer.emailValue,
            token: state.IdentityReducer.token,
            firstNameValue: state.IdentityReducer.firstNameValue,
            lastNameValue: state.IdentityReducer.lastNameValue
        };
    };

    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;
        return {
            ...callback.apply(instance, args),
            sendOtp: (options) => OtpDispatcher.then(
                ({ default: dispatcher }) => dispatcher.sendOtp(options, dispatch)
            ),
            verifyOtp: (options) => OtpDispatcher.then(
                ({ default: dispatcher }) => dispatcher.verifyOtp(options, dispatch)
            ),
            handleTabChange: (event, newValue) => {
                dispatch({
                    type: 'UPDATE_OTP_TAB',
                    optTabIndex: newValue
                });
            },
            setOtpTab: (index) => {
                dispatch({
                    type: 'UPDATE_OTP_TAB',
                    optTabIndex: index
                });
            },
            handleOtpStep: async (otpType, index) => {
                const {
                    sendOtp,
                    verifyOtp,
                    emailValue,
                    phoneValue,
                    otpValue
                } = this.props;

                switch (index) {
                case 1:// Send OTP Case
                    if (otpType === 'email' && !emailValue) {
                        dispatch(showNotification('error', __('Please enter your email..')));
                        return false;
                    }
                    // eslint-disable-next-line no-magic-numbers
                    if (otpType === 'phone' && (!phoneValue || phoneValue.length < 9)) {
                        dispatch(showNotification('error', __('Please enter your phone..')));
                        return false;
                    }

                    const isOtpSent = await sendOtp({
                        identity_type: otpType === 'email' ? 'EMAIL' : 'MOBILE',
                        identity: otpType === 'email' ? emailValue : phoneValue,
                        resend: false
                    });

                    if (isOtpSent) {
                        dispatch({
                            type: 'UPDATE_OTP_VALUE',
                            otpValue: null
                        });
                        dispatch({
                            type: 'UPDATE_OTP_STEP',
                            otpType,
                            index
                        });
                    }
                    break;
                case 2:// Verify OTP Case
                    if (!otpValue) {
                        dispatch(showNotification('error', __('Please enter OTP code..')));
                        return false;
                    }

                    const verifyRes = await verifyOtp({
                        identity_type: otpType === 'email' ? 'EMAIL' : 'MOBILE',
                        identity: otpType === 'email' ? emailValue : phoneValue,
                        otp: otpValue
                    });

                    if (!verifyRes.isSuccess) {
                        dispatch({ type: 'UPDATE_OTP_STEP', otpType, index: 1 });
                    } else if (verifyRes.needToReview) {
                        dispatch({
                            type: 'UPDATE_OTP_STEP',
                            otpType,
                            index,
                            token: verifyRes.token
                        });
                        dispatch({
                            type: 'UPDATE_PHONE_VALUE',
                            phoneValue: verifyRes.customerData.mobilenumber
                        });
                        dispatch({
                            type: 'UPDATE_EMAIL_VALUE',
                            emailValue: verifyRes.customerData.email
                        });
                        if (verifyRes.customerData.firstname.trim()) {
                            dispatch({
                                type: 'UPDATE_FIRST_NAME_VALUE',
                                firstNameValue: verifyRes.customerData.firstname
                            });
                        }
                        if (verifyRes.customerData.lastname.trim()) {
                            dispatch({
                                type: 'UPDATE_LAST_NAME_VALUE',
                                lastNameValue: verifyRes.customerData.lastname
                            });
                        }
                    } else {
                        // Reset STP step
                        // history.go('/');
                        dispatch({ type: 'UPDATE_OTP_STEP', otpType, index: 0 });

                        // window.location.replace(window.location.origin)
                    }

                    // dispatch(showNotification('success', __(`OPT IS ${verifyRes}`)));
                    break;
                default:
                    dispatch({
                        type: 'UPDATE_OTP_VALUE',
                        otpValue: null
                    });
                    dispatch({
                        type: 'UPDATE_OTP_STEP',
                        otpType,
                        index
                    });
                }

                return true;
            },
            handleOtpChange: async (otp, otpType = null) => {
                const {
                    emailValue,
                    phoneValue,
                    otpValue,
                    verifyOtp
                } = this.props;

                dispatch({
                    type: 'UPDATE_OTP_VALUE',
                    otpValue: otp
                });

                // eslint-disable-next-line no-magic-numbers
                if (otp.toString().length === 4 && otpType) {
                    if (!otpValue) {
                        dispatch(showNotification('error', __('Please enter OTP code..')));
                        return false;
                    }

                    const verifyRes = await verifyOtp({
                        identity_type: otpType === 'email' ? 'EMAIL' : 'MOBILE',
                        identity: otpType === 'email' ? emailValue : phoneValue,
                        otp
                    });

                    if (!verifyRes.isSuccess) {
                        dispatch({ type: 'UPDATE_OTP_STEP', otpType, index: 1 });
                    } else if (verifyRes.needToReview) {
                        dispatch({
                            type: 'UPDATE_OTP_STEP',
                            otpType,
                            index: 2,
                            token: verifyRes.token
                        });
                        dispatch({
                            type: 'UPDATE_PHONE_VALUE',
                            phoneValue: verifyRes.customerData.mobilenumber
                        });
                        dispatch({
                            type: 'UPDATE_EMAIL_VALUE',
                            emailValue: verifyRes.customerData.email
                        });
                        if (verifyRes.customerData.firstname.trim()) {
                            dispatch({
                                type: 'UPDATE_FIRST_NAME_VALUE',
                                firstNameValue: verifyRes.customerData.firstname
                            });
                        }
                        if (verifyRes.customerData.lastname.trim()) {
                            dispatch({
                                type: 'UPDATE_LAST_NAME_VALUE',
                                lastNameValue: verifyRes.customerData.lastname
                            });
                        }
                    } else {
                        // Reset STP step
                        dispatch({ type: 'UPDATE_OTP_STEP', otpType, index: 0 });
                    }
                }

                return true;
            },
            handlePhoneValue: (value) => {
                dispatch({
                    type: 'UPDATE_PHONE_VALUE',
                    phoneValue: value
                });
            },
            handleEmailValue: (event) => {
                dispatch({
                    type: 'UPDATE_EMAIL_VALUE',
                    emailValue: event.target.value
                });
            },
            handleFirstNameValue: (event) => {
                dispatch({
                    type: 'UPDATE_FIRST_NAME_VALUE',
                    firstNameValue: event.target.value
                });
            },
            handleLastNameValue: (event) => {
                dispatch({
                    type: 'UPDATE_LAST_NAME_VALUE',
                    lastNameValue: event.target.value
                });
            },
            handleCompleteButton: () => {
                const {
                    emailValue,
                    phoneValue,
                    token,
                    firstNameValue,
                    lastNameValue
                } = this.props;

                const options = {
                    firstname: firstNameValue,
                    lastname: lastNameValue,
                    mobilenumber: phoneValue,
                    email: emailValue
                };

                OtpDispatcher.then(
                    async ({ default: dispatcher }) => {
                        const isSuccess = (firstNameValue && lastNameValue && emailValue) ? await dispatcher.updateCustomerInformation(options, dispatch, token) : false;

                        if (isSuccess) {
                            // Reset STP step
                            dispatch({
                                type: 'UPDATE_OTP_STEP',
                                otpType: 'phone',
                                index: 0
                            });
                            // Reset STP step
                            dispatch({
                                type: 'UPDATE_OTP_STEP',
                                otpType: 'email',
                                index: 0
                            });
                        } else {
                            dispatch(showNotification('error', __('All Fields are Mandatory')));
                            dispatch({
                                type: 'UPDATE_OTP_STEP',
                                index: 2
                            });
                        }
                    }
                );
            }
        };
    };

    containerProps = (args, callback, instance) => {
        const {
            logins, isSocialLoginsLoading,
            optTabIndex, handleTabChange, setOtpTab,
            otpValue, handleOtpChange,
            handleOtpStep, activePhoneStep, activeEmailStep,
            handlePhoneValue, handleEmailValue,
            firstNameValue, lastNameValue,
            handleFirstNameValue, handleLastNameValue,
            handleCompleteButton
        } = instance.props;

        return {
            ...callback.apply(instance, args),
            logins,
            isSocialLoginsLoading,
            optTabIndex,
            handleTabChange,
            setOtpTab,
            otpValue,
            handleOtpChange,
            otpLoginSteps: OtpLoginSteps,
            handleOtpStep,
            activePhoneStep,
            activeEmailStep,
            handlePhoneValue,
            handleEmailValue,
            firstNameValue,
            lastNameValue,
            handleFirstNameValue,
            handleLastNameValue,
            handleCompleteButton
        };
    };

    componentDidUpdate = (args, callback, instance) => {
        // const [prevProps, prevState] = args;
        this.updateCurrentProps(instance.props);

        /* const {
            activePhoneStep, activeEmailStep,
            phoneValue, emailValue,
            handleOtpStep
        } = instance.props;

        if (activePhoneStep !== 0 && !phoneValue) {
            handleOtpStep('phone', 0);
        }
        if (activeEmailStep !== 0 && !emailValue) {
            handleOtpStep('email', 0);
        } */

        callback.apply(instance, args);
    };
}

export const {
    mapStateToProps, containerProps, mapDispatchToProps, componentDidUpdate
} = new MyAccountSignInStatePlugin();

export const config = {
    'Component/MyAccountSignIn/Container/mapStateToProps': {
        function: [
            {
                position: 100,
                implementation: mapStateToProps
            }
        ]
    },
    'Component/MyAccountSignIn/Container/mapDispatchToProps': {
        function: [
            {
                position: 100,
                implementation: mapDispatchToProps
            }
        ]
    },
    'Component/MyAccountSignIn/Container': {
        'member-function': {
            containerProps: [
                {
                    position: 110,
                    implementation: containerProps
                }
            ],
            componentDidUpdate: [
                {
                    position: 110,
                    implementation: componentDidUpdate
                }
            ]
        }
    }
};

export default config;
