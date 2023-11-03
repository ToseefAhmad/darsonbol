/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import {
    MyAccountSignIn as SourceMyAccountSignIn
} from 'SourceComponent/MyAccountSignIn/MyAccountSignIn.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

/** @namespace SonbolPwa/Component/MyAccountSignIn/Component */
export class MyAccountSignInComponent extends SourceMyAccountSignIn {
    __construct(props) {
        super.__construct(props);
        this.state = {
            isFocused: false
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus() {
        this.setState({
            isFocused: true
        });
    }

    handleBlur() {
        this.setState({
            isFocused: false
        });
    }

    renderAdditionalField() {
        const {
            isCheckout,
            handleCreateAccount,
            state
        } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                <section>
                    <h4 id="forgot-password-label">{ __("Don't have an account?") }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ handleCreateAccount }
                    >
                        { __('Create an account') }
                    </button>
                </section>
            </article>
        );
    }
    renderSignInForm() {
        const {
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            emailValue,
            isCheckout
        } = this.props;

        return (
            <Form
              key="sign-in"
              onSubmit={ onSignInSuccess }
              onError={ onFormError }
            >
                <Field
                  label={ __('Email') }
                  type={ FIELD_TYPE.email }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      placeholder: __('Your email address'),
                      defaultValue: emailValue,
                      autocomplete: isCheckout ? 'off' : 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  addRequiredTag
                />

                <Field
                  label={ __('Password') }
                  type={ FIELD_TYPE.password }
                  attr={ {
                      id: 'password',
                      name: 'password',
                      placeholder: __('Enter your password'),
                      autocomplete: 'current-password'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.password
                  } }
                  addRequiredTag
                />
                <button
                  type="button"
                  block="Button"
                  mods={ { likeLink: true } }
                  mix={ { block: 'MyAccountOverlay', elem: 'ForgotPassword' } }
                  onClick={ handleForgotPassword }
                >
                    { __('Forgot password?') }
                </button>
                <div block="MyAccountOverlay" elem="SignInButton">
                    <button block="Button">{ __('Sign in') }</button>
                </div>
            </Form>
        );
    }

    render() {
        return (
                <div>
                    { this.renderSignInForm() }
                    { this.renderAdditionalField() }
                </div>

        );
    }
}

export default MyAccountSignInComponent;
