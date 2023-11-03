/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
/* eslint-disable react/sort-comp */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

import Loader from 'Component/Loader';
import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountCreateAccount from 'Component/MyAccountCreateAccount';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import Overlay from 'Component/Overlay';
import { SignInStateType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';

import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    STATE_CONFIRM_EMAIL,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from './MyAccountOverlay.config';

import './MyAccountOverlay.style';

Modal.setAppElement('body');
/** @namespace SonbolPwa/Component/MyAccountOverlay/Component */
export class MyAccountOverlayComponent extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        isOverlayVisible: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        state: SignInStateType.isRequired,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        onVisible: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        onSignIn: PropTypes.func.isRequired
    };

    static defaultProps = {
        isCheckout: false
    };

    renderMap = {
        [STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: __('Sign in to your account')
        },
        [STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: __('Get password link')
        },
        [STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess()
        },
        [STATE_CREATE_ACCOUNT]: {
            render: () => this.renderCreateAccount(),
            title: __('Create new account')
        },
        [STATE_LOGGED_IN]: {
            render: noopFn
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email')
        }
    };

    renderMyAccount() {
        const {
            state, showModal, handleClose, isMobile
        } = this.props;
        const { render } = this.renderMap[state];
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                padding: '20px 20px',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '428px',
                width: '100%',
                borderRadius: '24px'
            }
        };
        const mobileStyle = {
            content: {
                top: 'auto',
                left: '50%',
                right: 'auto',
                padding: '20px 20px',
                bottom: '0',
                marginRight: '-50%',
                transform: 'translate(-50%, 0%)',
                maxWidth: '428px',
                width: '100%',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px'
            }
        };

        const selectedStyle = isMobile ? mobileStyle : customStyles;
        return (
            <Modal style={ selectedStyle } isOpen={ showModal } onRequestClose={ handleClose } shouldCloseOnOverlayClick>
                <div block="MyAccountOverlay" elem="Action" mods={ { state } }>
                    <button onClick={ handleClose }>
                        <div className="filterhead">
                            <div className="txtfilhd" />
                            <div className="txtfiltracors">
                                { __('Close') }
                                <svg
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  width="16"
                                  height="30"
                                  viewBox="0 0 17 18"
                                  xmlSpace="preserve"
                                >
                                    <g>
                                        <path d="M10.6,17l-2.5-4.7L5.7,17H0.6l4.7-7.9L0.9,1.5h4.9l2.4,4.6l2.4-4.6h4.9l-4.4,7.7L16,17H10.6z" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </button>
                    { /* <p block="MyAccountOverlay" elem="Heading">{ title }</p> */ }
                    { render() }
                </div>
            </Modal>
        );
    }

    renderConfirmEmail() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword() {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState,
            isCheckout
        } = this.props;

        return (
            <MyAccountForgotPassword
              state={ state }
              onFormError={ onFormError }
              handleSignIn={ handleSignIn }
              handleCreateAccount={ handleCreateAccount }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              isCheckout={ isCheckout }
            />
        );
    }

    renderForgotPasswordSuccess() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderCreateAccount(isLandingPage = false) {
        const {
            state,
            handleSignIn,
            setSignInState,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountCreateAccount
              state={ state }
              handleSignIn={ handleSignIn }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              onSignIn={ onSignIn }
              isLandingPage={ isLandingPage }
            />
        );
    }

    renderSignIn() {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
              state={ state }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout={ isCheckout }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    render() {
        const {
            isLoading,
            onVisible,
            isCheckout,
            isMobile
        } = this.props;

        return (

            !isSignedIn() ? (
                <Overlay
                  id={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
                  mix={ { block: 'MyAccountOverlay' } }
                  onVisible={ onVisible }
                  isStatic={ !isCheckout && isMobile }
                >
                      <Loader isLoading={ isLoading } />
                      { this.renderMyAccount() }
                </Overlay>
            )
                : null

        );
    }
}

export default withRouter(MyAccountOverlayComponent);
