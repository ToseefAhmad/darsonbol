/* eslint-disable no-useless-escape */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable react/forbid-component-props */
/* eslint-disable react/forbid-dom-props */
/**
 * @category  ScandiPWA
 * @package   Vested_ScandipwaIdentity
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */

import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import {
    Box, Button, Checkbox,
    Link,
    Step, StepButton, Stepper, TextField
} from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import history from '@scandipwa/scandipwa/src/util/History';
import * as React from 'react';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import SwipeableViews from 'react-swipeable-views';

import Form from 'Component/Form';
import { isSignedIn } from 'Util/Auth';

import AppleLogo from '../../../../src/style/icons/LoginAndSignup/appleLogo.png';
import TabPanel from '../TabPanel';

import 'react-phone-input-2/lib/style.css';
import './MyAccountOverlay.style.scss';
import '../style/LoginAccount.style.scss';

export const SOCIAL_LOGIN_PROVIDERS = {
    facebook: 'FACEBOOK',
    google: 'GOOGLE ACCOUNT'
};

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccountSignIn/Component */
export class MyAccountSignInPlugin {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    getSocialLogins(instance) {
        const { logins, isSocialLoginsLoading } = instance.props;

        if (isSocialLoginsLoading) {
            return (
                <div block="MyAccountOverlay" elem="Provider" mods={ { loading: true } } />
            );
        }

        if (logins) {
            return logins.map(({ url, label }) => (
                <div block="MyAccountOverlay" elem="Provider" key={ label }>
                    <a href={ url } block="MyAccountOverlay" elem={ label } mix={ { block: 'Button' } }>
                        <span>{ label }</span>
                    </a>
                </div>
            ));
        }

        return false;
    }

    renderSocialLogins(instance) {
        const { logins } = instance.props;

        if (logins.length === 0) {
            return null;
        }

        return (
            <div block="MyAccountOverlay" elem="Social">
                <h4 id="social-login">{ __('Or sign in using') }</h4>
                { this.getSocialLogins(instance) }
            </div>
        );
    }

    renderAdditionalField() {
        return (
            <hr />
        );
    }

    renderSignInForm(instance) {
        const {
            onSignInAttempt,
            onSignInSuccess,
            onFormError
        } = instance.props;

        return (
            <Form
              key="sign-in"
              onSubmit={ onSignInAttempt }
              onSubmitSuccess={ onSignInSuccess }
              onSubmitError={ onFormError }
            >
                { this.renderOtpTabs(instance) }
                { /* <Field
                  type="text"
                  label={ __('Email') }
                  id="email"
                  name="email"
                  value={ emailValue }
                  autocomplete={ isCheckout ? 'off' : 'email' }
                  validation={ ['notEmpty', 'email'] }
                  onChange={ handleEmailInput }
                />
                <Field
                  type="password"
                  label={ __('Password') }
                  id="password"
                  name="password"
                  autocomplete="current-password"
                  validation={ ['notEmpty', 'password'] }
                />
                <div block="MyAccountOverlay" elem="Buttons">
                    <button block="Button">{ __('Sign in') }</button>
                </div>
                <button
                  block="Button"
                  mix={ { block: 'MyAccountSignIn', elem: 'ForgotPassword' } }
                  mods={ { likeLink: true } }
                  onClick={ handleForgotPassword }
                >
                    { __('Forgot password?') }
                </button> */ }
            </Form>
        );
    }

    renderOtpTabs(instance) {
        const { isFocused } = instance.state;
        const focus = instance.handleFocus;
        const blur = instance.handleBlur;
        const {
            optTabIndex, handleTabChange,
            otpValue, handleOtpChange, otpLoginSteps,
            handleOtpStep, activePhoneStep, activeEmailStep,
            phoneValue, emailValue, handlePhoneValue, handleEmailValue,
            firstNameValue, lastNameValue,
            handleFirstNameValue, handleLastNameValue,
            handleCompleteButton
        } = instance.props;

        if (isSignedIn()) {
            history.goBack();
        }
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const mandatoryText = __('This Field is Mandatory');
        const isFirstNameEmpty = !!firstNameValue;
        const firstNameEmptyErrorMessage = firstNameValue ? '' : mandatoryText;
        const isLastNameEmpty = !!lastNameValue;
        const lastNameEmptyErrorMessage = isLastNameEmpty ? '' : mandatoryText;
        const emailErrorMessage = regEx.test(emailValue) ? '' : __('Invalid Email Format');
        const classDefined = isFocused ? 'input-focused' : 'not-focused';
        // const checked = true;
        return (
            <Box centered block="MyAccountSignIn">
                <div className={ classDefined }>
                    { {
                        0: (
                            <>
                                <div className="welcomebox"><span>{ __('اهلا بك') }</span></div>
                                <div className="lgyouact"><span>{ __('تسجيل الدخول') }</span></div>
                                <div className="phone-input-container">
                                    <PhoneInput
                                      isValid={ (value) => {
                                          if (value.length < 12) {
                                              return __('Invalid Input Number');
                                          }

                                          return true;
                                      } }
                                      onFocus={ focus }
                                        //   onBlur={ blur }
                                      containerStyle={ { display: 'flex', marginTop: '10px' } }
                                      inputClass="flag-input"
                                      buttonClass="flag-button"
                                      dropdownClass="flag-drop"
                                      country="sa"
                                      onlyCountries={ ['sa', 'ae', 'kw', 'qa', 'om', 'bh'] }
                                      value={ phoneValue }
                                      onChange={ handlePhoneValue }
                                    />
                                    <div className="remember-checkbox">
                                        <span className="checkbox-class">
                                            <Checkbox
                                                //   checked={ checked }
                                              sx={ {
                                                  color: 'black',
                                                  '&.Mui-checked': {
                                                      color: 'black'
                                                  }
                                              } }
                                                //   onChange={ handleChange }
                                              inputProps={ { 'aria-label': 'controlled' } }
                                            />
                                        </span>
                                        <span>{ __('I would like to stay logged in') }</span>
                                    </div>
                                </div>
                            </>
                        ),
                        1: (
                            <section className="otp-container">
                                <div className="confirm-phone-text">{ __('Please confirm your mobile number to continue') }</div>
                                <div className="confirm-code">{ __('We have sent a code to your mobile number') }</div>
                                <div className="contact-number">{ phoneValue }</div>
                                <OtpInput
                                  containerStyle="otpphone-box"
                                  value={ otpValue }
                                  shouldAutoFocus
                                  onChange={ (otp) => handleOtpChange(otp, 'phone') }
                                  separator={ <span>{ '\u00A0\u00A0' }</span> }
                                  numInputs="4"
                                />
                                <div className="resend-change-otp">
                                    <div className="resendcode"><button>{ __('Resend the code within') }</button></div>
                                    <div className="chnagenumber"><button onClick={ () => handleOtpStep('phone', 0) }>{ __('change number') }</button></div>
                                </div>
                            </section>
                        ),
                        2: (
                            <div className="signup-area">
                                <h3 className="reguser">{ __('Create a new account') }</h3>
                                <Box className="containerinner-box" sx={ { display: 'block', borderBottom: 'none' } }>
                                    <PersonIcon />
                                    <TextField
                                      required
                                      error={ !isFirstNameEmpty }
                                      helperText={ firstNameEmptyErrorMessage }
                                      sx={ { width: '100%' } }
                                      value={ firstNameValue }
                                      variant="outlined"
                                      id="firstName"
                                      label={ __('First Name') }
                                      className="firstname inputgeneric"
                                      placeholder={ __('First Name') }
                                      onChange={ handleFirstNameValue }
                                      disableUnderline
                                    />
                                </Box>
                                <Box className="containerinner-box" sx={ { display: 'block' } }>
                                    <PersonIcon />
                                    <TextField
                                      error={ !isLastNameEmpty }
                                      helperText={ lastNameEmptyErrorMessage }
                                      required
                                      sx={ { width: '100%' } }
                                      value={ lastNameValue }
                                      variant="outlined"
                                      id="lastName"
                                      className="lastName inputgeneric"
                                      label={ __('Last Name') }
                                      placeholder={ __('Last Name') }
                                      onChange={ handleLastNameValue }
                                      disableUnderline
                                    />
                                </Box>
                                <Box className="containerinner-box" sx={ { display: 'block' } }>
                                    <EmailIcon />
                                    <TextField
                                      error
                                      helperText={ emailErrorMessage }
                                      required
                                      sx={ { width: '100%' } }
                                      value={ /^(\d+)@/.test(emailValue) ? '' : emailValue }
                                      variant="outlined"
                                      id="email"
                                      className="email inputgeneric"
                                      label={ __('Email') }
                                      placeholder={ __('Email') }
                                      onChange={ handleEmailValue }
                                    // disabled={ !/^(\d+)@/.test(emailValue) }
                                    />
                                </Box>
                                <div className="register-popup-checkboxes">
                                    <div className="stay-login-register-container">
                                        <span className="stay-login-register-checkbox-class">
                                            <Checkbox
                                                //   checked={ checked }
                                              sx={ {
                                                  color: 'black',
                                                  '&.Mui-checked': {
                                                      color: 'black'
                                                  }
                                              } }
                                                //   onChange={ handleChange }
                                              inputProps={ { 'aria-label': 'controlled' } }
                                            />
                                        </span>
                                        <span style={ { color: 'black' } } className="stay-login-register">{ __('I would like to stay logged in') }</span>
                                    </div>
                                    <div className="receive-offer-register-container">
                                        <span className="receive-offer-register-checkbox-class">
                                            <Checkbox
                                                //   checked={ checked }
                                              sx={ {
                                                  color: 'black',
                                                  '&.Mui-checked': {
                                                      color: 'black'
                                                  }
                                              } }
                                                //   onChange={ handleChange }
                                              inputProps={ { 'aria-label': 'controlled' } }
                                            />
                                        </span>
                                        <span style={ { color: 'black' } } className="receive-offer-register">{ __('I would like to receive news of offers and developments by e-mail') }</span>
                                    </div>
                                </div>

                            </div>
                        )
                    }[activePhoneStep] }
                </div>
                <Box sx={ { display: 'flex', flexDirection: 'column' } }>
                    <Box sx={ { flex: '1 1 auto' } } style={ { marginBlockEnd: '0px' } } />
                    { {
                        0: (
                            <>
                                <Button
                                  block="MyAccountSignIn"
                                  elem="Button"
                                  className="Button otpbtn-btn"
                                  style={ {
                                      width: '100%',
                                      background: '#000',
                                      color: '#fff',
                                      marginInlineStart: 0,
                                      height: '55px'
                                  } }
                                  onClick={ () => handleOtpStep('phone', 1) }
                                  sx={ { mr: 1 } }
                                >
                                    { __('Get OTP Token') }
                                </Button>
                                <Button className="apple-button" variant="contained" sx={ { backgroundColor: 'black', color: 'white' } }>
                                    <div><img src={ AppleLogo } alt="appleLogo" /></div>
                                    <span className="apple-text">
                                        { __('Sign in with') }
                                        { ' ' }
                                        Apple
                                    </span>
                                </Button>
                                { ' ' }
                            </>
                        ),
                        1: (
                            <>
                                <Button
                                  onClick={ () => handleOtpStep('phone', 2) }
                                  className="competbtn-sigotp"
                                  style={ {
                                      width: '100%', background: '#000', color: '#fff'
                                  } }
                                >
                                    { __('verification') }
                                </Button>
                                <Button
                                  block="MyAccountSignIn"
                                  color="inherit"
                                  disabled={ activePhoneStep === 0 }
                                  onClick={ () => handleOtpStep('phone', 0) }
                                  sx={ { mr: 1 } }
                                  style={ { color: '#5a8a89', marginInline: 'auto', display: 'flex' } }
                                >
                                    { __('Back') }
                                </Button>
                            </>
                        ),
                        2: (
                            <>
                                <Button
                                  onClick={ handleCompleteButton }
                                  className="competbtn-sigun"
                                  style={ {
                                      width: '100%', background: '#000', color: '#fff'
                                  } }

                                >
                                    { __('Complete') }
                                </Button>

                                <p className="joinagree">{ __('By joining us, you agree to all terms and conditions and privacy policy') }</p>
                                <Button
                                  block="MyAccountSignIn"
                                  color="inherit"
                                  disabled={ activePhoneStep === 0 }
                                  onClick={ () => handleOtpStep('phone', 0) }
                                  sx={ { mr: 1 } }
                                  style={ { color: '#5a8a89', marginInline: 'auto', display: 'flex' } }
                                >
                                    { __('Back') }
                                </Button>
                            </>
                        )
                    }[activePhoneStep] }
                </Box>

            </Box>
        );
    }

    render = (args, callback, instance) => (
        <>
            { this.renderSignInForm(instance) }
            { this.renderAdditionalField(instance) }
            { /* this.renderSocialLogins(instance) */ }
        </>
    );
}

const { render } = new MyAccountSignInPlugin();

export const config = {
    'Component/MyAccountSignIn/Component': {
        'member-function': {
            render: [
                {
                    position: 100,
                    implementation: render
                }
            ]
        }
    }
};

export default config;
