/* eslint-disable max-len */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CurrencySwitcher from 'Component/CurrencySwitcher';
import Link from 'Component/Link';
import StoreSwitcher from 'Component/StoreSwitcher';
import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { CustomerType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import account from '../../style/icons/AccountPage/account.png';
import AccountPageHeader from '../../style/icons/AccountPage/accountPage.png';
import addres from '../../style/icons/AccountPage/addres.png';
import address from '../../style/icons/AccountPage/address.png';
import order from '../../style/icons/AccountPage/order.png';
import logoIcon from '../../style/icons/logos/white-logo.png';
import signout from '../../style/icons/MobileAccount/signout.png';
import checkbox from '../../style/icons/Social-Icons/Checkbox.svg';
import country from '../../style/icons/Social-Icons/Globe.svg';
import phoneIcon from '../../style/icons/Social-Icons/phone.svg';
import bellIcon from '../../style/icons/Social-Icons/Shape.svg';
import shape1 from '../../style/icons/Social-Icons/shape1.svg';
import whatsAppIcon from '../../style/icons/Social-Icons/whatsapp.svg';
import facebookIcon from '../../style/icons/Social-MediaIcons/facebook-round-color.svg';
import instagramIcon from '../../style/icons/Social-MediaIcons/instagram-round-color.svg';
import snapchatIcon from '../../style/icons/Social-MediaIcons/snapchat-round-color.svg';
import twitterIcon from '../../style/icons/Social-MediaIcons/twitter-round-color.svg';

import './MobileAccountLogin.style';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace SonbolPwa/Component/MobileAccountLogin/Component/mapStateToProps */
export const mapStateToProps = (state) => ({
    isLogedin: state.MyAccountReducer.isLoading,
    device: state.ConfigReducer.device,
    contacts: state.InitConfigReducer.initConfig.Configurations.contact_us,
    socialAccounts: state.InitConfigReducer.initConfig.Configurations.social_accounts,
    staticPages: state.InitConfigReducer.initConfig.Configurations.static_pages,
    customer: state.MyAccountReducer.customer,
    baseLinkUrl: state.ConfigReducer.base_link_url
});

/** @namespace SonbolPwa/Component/MobileAccountLogin/Component/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, false, dispatch)
    )

});

/** @namespace SonbolPwa/Component/MobileAccountLogin/Component */
export class MobileAccountLoginComponent extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        baseLinkUrl: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    };
    __construct(props) {
        super.__construct(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        this.props.setNavigationState({
            name: 'account-page'
        });
    }

    handleLogout() {
        const { baseLinkUrl, logout } = this.props;
        const path = baseLinkUrl
            ? appendWithStoreCode(ACCOUNT_LOGIN_URL)
            : replace(/\/customer\/account\/.*/, ACCOUNT_LOGIN_URL);

        history.push({
            pathname: path,
            state: { isFromEmailChange: true }
        });
        logout();
    }

    render() {
        const {
            contacts, staticPages, socialAccounts, device, customer
        } = this.props;

        const { firstname, email } = customer;
        const whatsAapLink = device.isMobile ? 'whatsapp://send?phone=' : 'https://web.whatsapp.com/send?phone=';
        const whatsappNumber = contacts.length
            ? (
                contacts.find((item) => item.key === 'whatsapp')
            )
            : null;
        const mobileNumer = contacts.length
            ? (
                contacts.find((item) => item.key === 'mobile')
            )
            : null;
        const facebook = socialAccounts.length
            ? (
                socialAccounts.find((item) => item.key === 'facebook')
            )
            : null;
        const snap = socialAccounts.length
            ? (
                socialAccounts.find((item) => item.key === 'snap')
            )
            : null;
        const twitter = socialAccounts.length
            ? (
                socialAccounts.find((item) => item.key === 'twitter')
            )
            : null;
        const instagram = socialAccounts.length
            ? (
                socialAccounts.find((item) => item.key === 'instagram')
            )
            : null;

        return (
            <section className="accountpage">
                <div className="accountpage-header__wrapper">
                    <div className="accountpage-header__wrapper-logo">
                        <Link to="/">
                            <img src={ logoIcon } alt="hader-logo" />
                        </Link>
                    </div>
                    <img className="accountpage-header__banner full-width" src={ AccountPageHeader } alt="account" />
                    { !isSignedIn()
                        ? (
                            <div className="login">
                                <Link className="login-btn" to="/customer/account/login/">
                                    { __('Login') }
                                </Link>
                            </div>
                        )
                        : (
                            <div className="customer-account">
                                <div className="customer-account__content">
                                    <span className="customer-account__name">
                                        { isSignedIn() ? (
                                            <p className="welcome-container">
                                                <span className="welcome">{ __('Hello') }</span>
                                                { ' .. ' }
                                                <span className="firstname">{ firstname }</span>
                                                { ' ' }
                                            </p>
                                        ) : null }
                                    </span>
                                    <span className="customer-account__email">
                                        { isSignedIn() ? email : null }
                                    </span>
                                </div>
                                <div className="customer-account__conatiner">
                                    <div className="customer-account__wrapper">
                                        <div className="customer-account__img-wrapper">
                                            <img className="customer-account__img" src={ order } alt="myrequest" />
                                        </div>
                                        <Link className="customer-account__text" to="/sales/order/history">
                                            { __('My Request') }
                                        </Link>
                                    </div>
                                    <div className="customer-account__wrapper">
                                        <div className="customer-account__img-wrapper">
                                            <img className="customer-account__img" src={ address } alt="return" />
                                        </div>
                                        <Link className="customer-account__text" to="/SA_ar/customer/account/returns">
                                            { __('Returns') }
                                        </Link>
                                    </div>
                                    <div className="customer-account__wrapper">
                                        <div className="customer-account__img-wrapper">
                                            <img className="customer-account__img" src={ addres } alt="addresses" />
                                        </div>
                                        <Link className="customer-account__text" to="/customer/address">
                                            { __('Addresses') }
                                        </Link>
                                    </div>
                                    <div className="customer-account__wrapper">
                                        <div className="customer-account__img-wrapper">
                                            <img className="customer-account__img" src={ account } alt="account" />
                                        </div>
                                        <Link className="customer-account__text" to="/customer/account">
                                            { __('My Account') }
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) }
                </div>
                { /* <div className="Registration_container">
                    <ul className="Registration_links">
                        <li className="donthave">
                            <Link to="/customer/account/create">{ __("Don't have an account?") }</Link>
                        </li>
                        <li className="subcrnow">
                            <Link to="/">{ __('Subscribe now') }</Link>
                        </li>
                    </ul>
                </div> */ }
                <div className="settings_container">
                    <p>{ __('Settings') }</p>
                    <ul className="settings_list">
                        <li className="settings_list_item">
                            <span><img src={ country } alt="store_switcher" /></span>
                            { ' ' }
                            <StoreSwitcher />
                        </li>
                        <li className="settings_list_item">
                            <span><img src={ shape1 } alt="currency_switcher" /></span>
                            { ' ' }
                            <CurrencySwitcher />
                        </li>
                        <li className="setting_list_item">
                            <span><img src={ checkbox } alt="who_are_we" /></span>
                            <Link to="/about-us">{ __('Who') }</Link>
                        </li>
                        <li className="setting_list_item">
                            <span><img src={ bellIcon } alt="notification_icon" /></span>
                            <Link to="/">{ __('Notifications') }</Link>
                        </li>
                    </ul>
                </div>
                <div className="contact_us_container">
                    <p className="contact_us">{ __('Contact Us') }</p>
                    <ul className="contact_us_list">
                        <li className="contact_us_list_item">
                            <div className="conitembox">
                                <a
                                  href={ `${whatsAapLink}${whatsappNumber.value.replace(/ +/g, '')}` }
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                    <span>
                                        <img src={ whatsAppIcon } alt="whatsapp-icon" />
                                    </span>
                                    <p>
                                        { __('Contact us on WhatsApp') }
                                    </p>
                                </a>
                            </div>
                        </li>
                        <li className="contact_us_list_item noborder-fxd">
                            <div className="conitembox">
                                <span>
                                    <img src={ phoneIcon } alt="phonIcon" />
                                </span>
                                <a href={ `tel:${mobileNumer.value.replace(/ +/g, '')}` }>
                                    <p>
                                        { __('Contact Us') }
                                    </p>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="logout-button">
                    { isSignedIn() ? (
                        <Link className="signout" to="/">
                            <button onClick={ this.handleLogout }>
                                <div className="img-container"><img src={ signout } alt="signout" /></div>
                                <span>{ __('sign out') }</span>
                            </button>
                        </Link>
                    ) : null }
                </div>
                <div className="social-media-container">
                    <span>
                        <a
                          href={ twitter.value }
                          rel="noreferrer"
                          target="_blank"
                        >
                            <img src={ twitterIcon } alt="twitter" />
                        </a>
                    </span>
                    <span>
                        <a
                          href={ snap.value }
                          rel="noreferrer"
                          target="_blank"
                        >
                            <img src={ snapchatIcon } alt="snapchat" />
                        </a>
                    </span>
                    <span>
                        <a
                          href={ instagram.value }
                          rel="noreferrer"
                          target="_blank"
                        >
                            <img src={ instagramIcon } alt="instagram" />
                        </a>
                    </span>
                    <span>
                        <a
                          href={ facebook.value }
                          rel="noreferrer"
                          target="_blank"
                        >
                            <img src={ facebookIcon } alt="facebook" />
                        </a>
                    </span>
                </div>
                <div className="footer-wrapper">
                    <ul className="footer-wrapper__content">
                        { staticPages.length
                            ? (
                                staticPages.map((item) => (
                                    <li className="list">
                                        <Link to={ `/${item.value}` }>
                                            { __(`${item.label}`) }
                                        </Link>
                                    </li>
                                ))
                            )
                            : null }
                    </ul>
                    <div className="footer-wrapper__content-bottom">
                        <p>
                            { __('Alrights are Reserved by SONBOL 2022') }
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccountLoginComponent);
