/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
// import ExclamationMarkIcon from '@scandipwa/scandipwa/src/component/ExclamationMarkIcon/ExclamationMarkIcon.component';
import HeartIcon from '@scandipwa/scandipwa/src/component/HeartIcon/HeartIcon.component';
import { Suspense } from 'react';

import ClickOutside from 'Component/ClickOutside';
import CurrencySwitcher from 'Component/CurrencySwitcher';
import Link from 'Component/Link';
import Menu from 'Component/Menu';
import OfflineNotice from 'Component/OfflineNotice';
import SearchField from 'Component/SearchField';
import {
    CartOverlay,
    Header as SourceHeader,
    MyAccountOverlay
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';
import { isCrawler, isSSR } from 'Util/Browser';
import CSS from 'Util/CSS';
import history from 'Util/History';

import burgerMenuIcon from '../../style/icons/BurgerMenuIcon/Burger.svg';
import logoIcon from '../../style/icons/logos/logobl.png';
import mobileNav from '../../style/icons/logos/mobile-nav.svg';
import ChevronIconComponent from '../ChevronIcon/ChevronIcon.component';
import MyAccountIcon from '../MyAccountIcon/MyAccountIcon.component';
import {
    CART_OVERLAY,
    CUSTOMER_WISHLIST,
    SEARCH
} from './Header.config';

import './Header.override.style';

export {
    CartOverlay,
    MyAccountOverlay
};

/** @namespace SonbolPwa/Component/Header/Component */
export class HeaderComponent extends SourceHeader {
    // TODO implement logic
    static defaultProps = {
        logo_alt: '',
        logo_height: 55,
        logo_width: 98,
        showMyAccountLogin: false,
        header_logo_src: '',
        isLoading: true
    };
    renderMap = {
        toggleMenuButton: this.renderToggleMenuButton.bind(this),
        cancel: this.renderCancelButton.bind(this),
        back: this.renderBackButton.bind(this),
        close: this.renderCloseButton.bind(this),
        title: this.renderTitle.bind(this),
        logo: this.renderLogo.bind(this),
        search: this.renderSearchField.bind(this),
        account: this.renderAccount.bind(this),
        wishlist: this.renderWishlistPageButton.bind(this),
        minicart: this.renderMinicart.bind(this),
        share: this.renderShareWishListButton.bind(this),
        ok: this.renderOkButton.bind(this)

    };

    handleScroll = () => {
        const number = 80;
        const { setIsActiveClassToFalse } = this.props;
        if (window.scrollY < number) {
            setIsActiveClassToFalse();
        }
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    renderSearchField(isVisible = false) {
        const {
            searchCriteria,
            onSearchOutsideClick,
            onSearchBarFocus,
            onSearchBarChange,
            onClearSearchButtonClick,
            navigationState: { name },
            isCheckout,
            hideActiveOverlay
        } = this.props;

        const { device: { isMobile } } = this.props;

        if (isCheckout) {
            return null;
        }

        if (isMobile && history.location.pathname.includes('/cart')) {
            return null;
        }

        return (
            <SearchField
              key="search"
              searchCriteria={ searchCriteria }
              onSearchOutsideClick={ onSearchOutsideClick }
              onSearchBarFocus={ onSearchBarFocus }
              onSearchBarChange={ onSearchBarChange }
              onClearSearchButtonClick={ onClearSearchButtonClick }
              isVisible={ isVisible }
              isActive={ name === SEARCH }
              hideActiveOverlay={ hideActiveOverlay }
            />
        );
    }

    renderTitle(isVisible = false) {
        const { navigationState: { title } } = this.props;

        return (
            <h1
              key="title"
              block="Header"
              elem="Title"
              mods={ { isVisible } }
            >
                { title }
            </h1>
        );
    }

    renderLogoImage() {
        const {
            // header_logo_src,
            logo_alt,
            logo_height,
            logo_width
        } = this.props;

        const sonbalHeaderLogoImage = logoIcon;
        // if no src defined from the backend, pass null in order to display placeholder
        // and prevent unnecessary load of corrupted resource
        // const logoSrc = header_logo_src ? media(header_logo_src, LOGO_MEDIA) : null;

        CSS.setVariable(this.logoRef, 'header-logo-height', `${logo_height}px`);
        CSS.setVariable(this.logoRef, 'header-logo-width', `${logo_width}px`);

        return (
            // <Logo
            //   src={ sonbalHeaderLogoImage }
            //   alt={ logo_alt }
            //   title={ logo_alt }
            // />
            <div className="header-logo-container">
                <img className="logo-image" src={ sonbalHeaderLogoImage } alt={ logo_alt } />
            </div>
        );
    }

    renderLogo(isVisible = false) {
        const { isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <Link
              to="/"
              aria-label="Go to homepage by clicking on ScandiPWA logo"
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
              block="Header"
              elem="LogoWrapper"
              mods={ { isVisible } }
              key="logo"
            >
                { this.renderLogoImage() }
            </Link>
        );
    }

    renderAccount(isVisible = false) {
        const {
            onMyAccountOutsideClick,
            isCheckout,
            device: { isMobile }
        } = this.props;

        // on mobile hide button if not in checkout
        if (isMobile && !isCheckout) {
            return null;
        }

        if (isCheckout && isSignedIn()) {
            return null;
        }

        return (
            <div key="account" block="Header" elem="MyAccountContainer">
                { this.renderWelcomeMessage() }
                <ClickOutside
                  onClick={ onMyAccountOutsideClick }
                >
                    <div
                      aria-label="My account"
                      block="Header"
                      elem="MyAccount"
                    >
                        { this.renderAccountButton(isVisible) }
                        { this.renderAccountOverlay() }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    renderAccountOverlay() {
        const {
            isCheckout,
            showMyAccountLogin,
            onSignIn,
            showModal,
            handleCloseModal
        } = this.props;

        // This is here to prevent the popup-suspense from rendering
        if (!showMyAccountLogin) {
            return null;
        }

        return (
            <Suspense fallback={ this.renderAccountOverlayFallback() }>
                <MyAccountOverlay
                  showModal={ showModal }
                  handleClose={ handleCloseModal }
                  onSignIn={ onSignIn }
                  isCheckout={ isCheckout }
                />
            </Suspense>
        );
    }
    renderAccountButton() {
        const {
            onMyAccountButtonClick,
            device
        } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="MyAccountWrapper"
              tabIndex="0"
              onClick={ onMyAccountButtonClick }
              aria-label="Open my account"
              id="myAccount"
            >
                <MyAccountIcon />
            </button>
        );
    }
    renderTopMenu() {
        const { device: { isMobile }, isCheckout } = this.props;

        if (isMobile || isCheckout) {
            return null;
        }

        return (
            <div block="Header" elem="TopMenu">
                <div block="Header" elem="Container">
                    <div block="Header" elem="News">
                        { /* <ExclamationMarkIcon /> */ }
                        <span>{ __('30% off') }</span>
                        <Link
                          to="https://google.com"
                          key="news"
                          block="Header"
                          elem="NewsButton"
                        >
                            { __('Shop now') }
                        </Link>
                    </div>
                    <div block="Header" elem="Switcher">
                        <Link to="/" className="Language-Switcher">
                            <p>
                                Switch to
                                <span>English</span>
                            </p>
                        </Link>
                        { /* <StoreSwitcher /> */ }
                        <CurrencySwitcher />
                    </div>
                </div>
            </div>
        );
    }
    renderWishlistPageButton() {
        const {
            device: {
                isMobile
            } = {},
            isCheckout
        } = this.props;

        if (isCheckout || isMobile) {
            return null;
        }

        return (
            <div
              block="Header"
              elem="WishlistButtonWrapper"
              key="wishlist"
            >
                <Link
                  to="wishlist"
                  key="wishlist"
                  block="Header"
                  elem="Button"
                  mods={ { type: 'wishlist' } }
                  aria-label={ __('Wishlist Page') }
                >
                    <HeartIcon />
                </Link>
            </div>
        );
    }

    renderToggleMenuButton() {
        const { device: { isMobile } } = this.props;
        const { mouseEnter } = this.props;
        const content = !isMobile ? (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            // eslint-disable-next-line max-len
            <div
              onMouseEnter={ mouseEnter }
                //   onMouseLeave={ mouseLeave }
              className="gb_btnboxgreen"
            >
                <div className="gb_inrbtnbox">
                    <div className="gb_iconsbox">
                        <img src={ burgerMenuIcon } alt="My Happy SVG" />
                        { ' ' }
                    </div>
                    <div className="gb_txtbox">{ __('Shop all categories') }</div>
                </div>
            </div>
        ) : null;

        return content;
    }

    // RENDERING MENU
    renderMenu() {
        const { isCheckout, device: { isMobile } } = this.props;
        const { isHovered, setToggleToFalse } = this.props;
        if (isMobile || isCheckout) {
            return null;
        }

        return <Menu showMenu={ isHovered } setToFalse={ setToggleToFalse } />;
    }

    handleSearchIconClick = () => {
    };

    handleClick() {
        history.goBack();
    }

    render() {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device: { isMobile },
            isActiveForClass,
            setIsActiveForClass
        } = this.props;
        const mainMenuClass = name === 'menu' || name === 'search' ? 'main-menu' : '';
        if (!isMobile) {
            // hide edit button on desktop
            stateMap[CUSTOMER_WISHLIST].edit = false;
            stateMap[CUSTOMER_WISHLIST].share = false;
            stateMap[CART_OVERLAY].edit = false;
        }
        const mixEle = history.location.pathname === '/SA_ar/' ? { block: 'FixedElement', elem: 'Top' } : { elem: 'Top' };
        return (
            <section
              block="Header"
              elem="Wrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
              className={ `${isActiveForClass ? 'randomClass' : null}` }
            >
                { (name !== 'menu2') && (name !== 'account-page')
                    ? (
                        <header
                          block="Header"
                          mods={ { name, isHiddenOnMobile, isCheckout } }
                          mix={ mixEle }
                          ref={ this.logoRef }
                          className={ mainMenuClass }
                        >
                            { this.renderTopMenu() }
                            <div className="Navigation-Container">
                                <nav block="Header" elem="Nav">
                                    { this.renderNavigationState() }

                                    { isMobile ? (
                                        <>
                                            { /* { showBackDrop }  */ }
                                            <div className="mobile-nav-icon">
                                                <Link to="/mobile/navigation">
                                                    <button onClick={ this.props.handleToggle } className="toggleBtn">
                                                        <img src={ mobileNav } alt="mobile-nav-icon" />
                                                        <span>{ __('Menu') }</span>
                                                    </button>
                                                </Link>
                                            </div>
                                            { /* { content } */ }
                                            <div
                                              className="mobilesrch"
                                              aria-hidden="true"
                                              onClick={ setIsActiveForClass }
                                            >
                                                { isMobile && !(window.location.pathname === '/SA_ar/customer/account' || window.location.pathname === '/SA_ar/customer/address' || window.location.pathname === '/SA_ar/sales/order/history' || window.location.pathname === '/SA_ar/customer/account/returns' || window.location.pathname === '/SA_ar/customer/account/edit' || window.location.pathname.includes('/SA_ar/sales/order/view/order_id')) ? (
                                                    <svg
                                                      block="SearchMobIcon"
                                                      width="18"
                                                      height="18"
                                                      viewBox="0 0 22 22"
                                                      fill="#505459"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                          stroke="#505459"
                                                            // eslint-disable-next-line max-len
                                                          d="M21.833,21.455a.943.943,0,0,1-.652-.255l-3.488-3.288a11.169,11.169,0,0,1-6.93,2.383C4.828,20.3,0,15.743,0,10.148S4.828,0,10.763,0,21.525,4.552,21.525,10.148A9.81,9.81,0,0,1,19,16.682l3.487,3.289a.833.833,0,0,1,0,1.23A.943.943,0,0,1,21.833,21.455ZM10.763,1.74a8.684,8.684,0,0,0-8.917,8.408,8.684,8.684,0,0,0,8.917,8.409,8.685,8.685,0,0,0,8.918-8.409A8.684,8.684,0,0,0,10.763,1.74Z"
                                                          transform="translate(0 0)"
                                                        />
                                                    </svg>
                                                ) : <a aria-hidden onClick={ this.handleClick } className="back-arrow-link" to="/account-page"><div className="back-arrow-img-container"><ChevronIconComponent direction="right" /></div></a> }
                                            </div>
                                        </>
                                    )
                                        : null }
                                </nav>
                            </div>
                            { this.renderMenu() }
                        </header>
                    )
                    : null }
                <OfflineNotice />
            </section>
        );
    }
}

export default HeaderComponent;
