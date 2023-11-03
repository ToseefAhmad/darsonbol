/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/**
 * @category  ScandiPWA
 * @package   ScandiPWA_SocialLogin
 * @author    Zintis Scerbakovs <info@scandiweb.com>
 * @copyright Copyright (c) 2021 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Field from 'Component/Field';
import Form from 'Component/Form';
import history from 'Util/History';

export const SOCIAL_LOGIN_PROVIDERS = {
    facebook: 'FACEBOOK',
    google: 'GOOGLE ACCOUNT'
};

/** @namespace Vested/ScandipwaIdentity/Plugin/MyAccountCreateAccount/Component */
export class MyAccountCreateAccountPlugin {
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    getSocialLogins(instance) {
        const { logins, isSocialLoginsLoading } = instance.props;

        if (isSocialLoginsLoading) {
            return (
                <>
                    <div block="MyAccountOverlay" elem="Provider" mods={ { loading: true } } />
                    <div block="MyAccountOverlay" elem="Provider" mods={ { loading: true } } />
                </>
            );
        }

        if (logins) {
            return this.renderLogin(logins);
        }

        return null;
    }

    renderLogin(logins) {
        return logins.map(({ url, provider }) => (
            <div block="MyAccountOverlay" elem="Provider" key={ provider }>
                <a href={ url } block="MyAccountOverlay" elem={ provider } mix={ { block: 'Button' } }>
                    <span>{ SOCIAL_LOGIN_PROVIDERS[provider] }</span>
                </a>
            </div>
        ));
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

    renderVatNumberField(instance) {
        const { showTaxVatNumber, vatNumberValidation } = instance.props;

        if (!showTaxVatNumber) {
            return null;
        }

        return (
            <Field
              type="text"
              label={ __('Tax/VAT Number') }
              placeholder={ __('Your Tax/VAT Number') }
              id="taxvat"
              name="taxvat"
              validation={ vatNumberValidation }
            />
        );
    }

    renderSubscribeToNewsletter() {
        return (
            <Field
              type="checkbox"
              value="is_subscribed"
              label={ __('Subscribe to newsletter') }
              id="is_subscribed"
              mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
              name="is_subscribed"
            />
        );
    }

    renderOtpTabs(instance) {
        const { newsletterActive } = instance.props;
        return (
            <div>
                <p>FFFFFF</p>
                <Tabs about={ newsletterActive } aria-label="Customer Login OTP">
                    <Tab icon={ <PhoneIcon /> } label="Login By Phone" />
                    <Tab icon={ <EmailIcon /> } label="Login By Email" />
                </Tabs>
            </div>
        );
    }

    renderCreateAccountPersonalInfoFields(instance) {
        const { newsletterActive } = instance.props;
        const { location: { state: { firstName = '', lastName = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Personal Information') }</legend>
                <Field
                  type="text"
                  label={ __('First Name') }
                  id="firstname"
                  name="firstname"
                  placeholder={ __('Your first name') }
                  value={ firstName }
                  autocomplete="given-name"
                  validation={ ['notEmpty'] }
                />
                <Field
                  type="text"
                  label={ __('Last Name') }
                  id="lastname"
                  name="lastname"
                  placeholder={ __('Your last name') }
                  value={ lastName }
                  autocomplete="family-name"
                  validation={ ['notEmpty'] }
                />
                { this.renderVatNumberField(instance) }
                { newsletterActive ? this.renderSubscribeToNewsletter() : null }
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields() {
        const { location: { state: { email = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Sign-Up Information') }</legend>
                <Field
                  type="email"
                  label={ __('Email') }
                  id="email"
                  name="email"
                  placeholder={ __('Your email address') }
                  value={ email }
                  autocomplete="email"
                  validation={ ['notEmpty', 'email'] }
                />
                <div block="MyAccountOverlay" elem="PasswordBlock">
                    <Field
                      type="password"
                      label={ __('Password') }
                      id="password"
                      name="password"
                      placeholder={ __('Enter your password') }
                      autocomplete="new-password"
                      validation={ ['notEmpty', 'password'] }
                    />
                    <Field
                      type="password"
                      label={ __('Confirm password') }
                      id="confirm_password"
                      name="confirm_password"
                      placeholder={ __('Retype your password') }
                      autocomplete="new-password"
                      validation={ ['notEmpty', 'password', 'password_match'] }
                    />
                </div>
            </fieldset>
        );
    }

    renderSubmitButton() {
        return (
            <div block="MyAccountOverlay" elem="Buttons">
                <button
                  block="Button"
                  type="submit"
                  mix={ { block: 'MyAccountOverlay', elem: 'SignUpButton' } }
                >
                    { __('Sign up') }
                </button>
            </div>
        );
    }

    renderCreateAccountForm(instance) {
        const { onCreateAccountAttempt, onCreateAccountSuccess } = instance.props;

        return (
            <Form
              key="create-account"
              onSubmit={ onCreateAccountAttempt }
              onSubmitSuccess={ onCreateAccountSuccess }
              onSubmitError={ onCreateAccountAttempt }
            >
                { this.renderOtpTabs(instance) }
                { /* { this.renderCreateAccountPersonalInfoFields(instance) }
                { this.renderCreateAccountSignUpInfoFields(instance) }
                { this.renderSubmitButton(instance) } */ }
            </Form>
        );
    }

    renderAdditionalField(instance) {
        const { state, handleSignIn } = instance.props;

        return (
            <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                <section>
                    <h4>{ __('Already have an account?') }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      mix={ { block: 'MyAccountOverlay', elem: 'SignInLink' } }
                      onClick={ handleSignIn }
                    >
                        { __('Sign in') }
                    </button>
                </section>
            </article>
        );
    }

    render = (args, callback, instance) => (
        <>
            { this.renderCreateAccountForm(instance) }
            { this.renderAdditionalField(instance) }
            { this.renderOtpTabs(instance) }
            { this.renderSocialLogins(instance) }
        </>
    );
}

const { render } = new MyAccountCreateAccountPlugin();

export const config = {
    'Component/MyAccountCreateAccount/Component': {
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
