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

import NavigationAbstract from 'Component/NavigationAbstract/NavigationAbstract.component';
import { DeviceType } from 'Type/Device.type';

import CartIcon from '../CartIcon/CartIcon.component';
import HomeIcon from '../HomeIcon/HomeIcon.component';
import MenuIcon from '../MenuIcon/MenuIcon.component';
import UserIcon from '../UserIcon/UserIcon.component';
import WishListIcon from '../WishListIcon/WishListIcon.component';
import {
    ACCOUNT_TAB,
    CART_TAB,
    HOME_TAB,
    MENU_TAB,
    WISHLIST_TAB
} from './NavigationTabs.config';

import './NavigationTabs.override.style';

/** @namespace SonbolPwa/Component/NavigationTabs/Component */
export class NavigationTabsComponent extends NavigationAbstract {
    static propTypes = {
        device: DeviceType.isRequired
    };

    defaultStateName = MENU_TAB;

    stateMap = {
        [HOME_TAB]: {
            home: true
        },
        [MENU_TAB]: {
            menu: true
        },
        [CART_TAB]: {
            minicart: true
        },
        [WISHLIST_TAB]: {
            wishlist: true
        },
        [ACCOUNT_TAB]: {
            account: true
        }

    };

    renderMap = {
        home: this.renderHomeButton.bind(this),
        menu: this.renderMenuButton.bind(this),
        minicart: this.renderMinicartButton.bind(this),
        wishlist: this.renderWishListButton.bind(this),
        account: this.renderAccountButton.bind(this)
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    shouldComponentUpdate(nextProps) {
        const {
            navigationState: { name: prevName },
            cartTotals: { items_qty: prevQty },
            device: prevDevice
        } = this.props;

        const {
            navigationState: { name: nextName },
            cartTotals: { items_qty: nextQty },
            device: nextDevice
        } = nextProps;

        return prevName !== nextName || nextQty !== prevQty || prevDevice !== nextDevice;
    }
    renderWishListButton(isActive = false) {
        const { onWishListButtonClick } = this.props;
        return (
            <div className={ `navigationTabs__content ${isActive ? 'activeClass' : ''}` }>
                <button
                  key="wishlist"
                  elem="Button"
                  aria-label="Wishlist"
                  block="NavigationTabs"
                  onClick={ onWishListButtonClick }

                >
                    <WishListIcon isActive={ isActive } />
                </button>
                <p>{ __('Favorite') }</p>
            </div>
        );
    }
    renderHomeButton(isActive = false) {
        const { onHomeButtonClick } = this.props;

        return (
            <div className={ `navigationTabs__content ${isActive ? 'activeClass' : ''}` }>
                <button
                  key="home"
                  block="NavigationTabs"
                  elem="Button"
                  aria-label="Home"
                  onClick={ onHomeButtonClick }
                >
                    <HomeIcon isActive={ isActive } />
                </button>
                <p>{ __('Main') }</p>
            </div>
        );
    }

    renderMenuButton(isActive = false) {
        const { onMenuButtonClick } = this.props;

        return (
                <div className={ `navigationTabs__content ${isActive ? 'activeClass' : ''}` }>
                    <button
                      key="menu"
                      block="NavigationTabs"
                      elem="Button"
                      aria-label="Go to menu and search"
                      onClick={ onMenuButtonClick }
                    >
                        <MenuIcon isActive={ isActive } />
                    </button>
                    <p>{ __('Categories') }</p>
                </div>
        );
    }

    renderAccountButton(isActive = false) {
        const { onMyAccountButtonClick } = this.props;

        return (
                <div className={ `navigationTabs__content ${isActive ? 'activeClass' : ''}` }>
                    <button
                      key="account"
                      block="NavigationTabs"
                      elem="Button"
                      onClick={ onMyAccountButtonClick }
                      aria-label="Open my account"
                    >
                        <UserIcon isActive={ isActive } />
                    </button>
                    <p>{ __('The Account') }</p>
                </div>
        );
    }

    renderMinicartItemsQty() {
        const { cartTotals: { items_qty } } = this.props;

        if (!items_qty) {
            return null;
        }

        return (
                <span
                  aria-label="Items in cart"
                  block="Header"
                  elem="MinicartItemCount"
                >
                    { items_qty }
                </span>
        );
    }

    renderMinicartButton(isActive = false) {
        const { onMinicartButtonClick } = this.props;

        return (
                <div className={ `navigationTabs__content ${isActive ? 'activeClass' : ''}` }>
                    <button
                      key="mincart"
                      block="NavigationTabs"
                      elem="Button"
                      onClick={ onMinicartButtonClick }
                      aria-label="Minicart"
                    >
                        <div block="Header" elem="MinicartWrapper">
                            <div
                              block="Header"
                              elem="Button"
                              mix={ { block: 'NavigationTabs', elem: 'Icon', mods: { isActive } } }
                              mods={ { isVisible: true, type: 'minicart' } }
                            >
                                <CartIcon isActive={ isActive } />
                            </div>
                            { this.renderMinicartItemsQty() }
                        </div>
                    </button>
                    <p>{ __('Mini Cart') }</p>
                </div>
        );
    }

    render() {
        const { navigationState: { isHidden }, device } = this.props;
        if (!device.isMobile) {
            return null;
        }

        return (

                <footer
                  block="NavigationTabs"
                  mods={ { isHidden } }
                  mix={ { block: 'FixedElement', elem: 'Bottom' } }
                >
                    <nav block="NavigationTabs" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                </footer>
        );
    }
}

export default NavigationTabsComponent;
