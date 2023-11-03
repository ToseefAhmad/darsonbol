/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-lines */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CompareIcon from 'Component/CompareIcon';
import CurrencySwitcher from 'Component/CurrencySwitcher';
import Link from 'Component/Link';
import MenuItem from 'Component/MenuItem';
import StoreSwitcher from 'Component/StoreSwitcher';
import { DeviceType } from 'Type/Device.type';
import { MenuType } from 'Type/Menu.type';
import { getSortedItems } from 'Util/Menu';

import { Contacts, StaticPages } from '../../../packages/magearab-scandipwa-initconfig/src/type/InitConfig.type';
import logoicon from '../../style/icons/logos/logo.svg';
import checkbox from '../../style/icons/Social-Icons/Checkbox.svg';
import country from '../../style/icons/Social-Icons/Globe.svg';
import phoneIcon from '../../style/icons/Social-Icons/phone.svg';
import whatsAppIcon from '../../style/icons/Social-Icons/whatsapp.svg';

import './MobileNavigation.style';

/** @namespace SonbolPwa/Component/MobileNavigation/Component */
export class MobileNavigationComponent extends PureComponent {
    static propTypes = {
        menu: MenuType.isRequired,
        device: DeviceType.isRequired,
        closeMenu: PropTypes.func.isRequired,
        compareTotals: PropTypes.number.isRequired,
        activeMenuItemsStack: PropTypes.arrayOf(PropTypes.string).isRequired,
        handleSubcategoryClick: PropTypes.func.isRequired,
        onCategoryHover: PropTypes.func.isRequired,
        // handleToggleButton: PropTypes.func,
        contacts: Contacts,
        staticPages: StaticPages
    };

    renderCurrencySwitcher() {
        const { device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return <CurrencySwitcher />;
    }

    renderStoreSwitcher() {
        const { device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return <StoreSwitcher />;
    }

    renderCompareCount() {
        const { compareTotals } = this.props;

        if (compareTotals < 1) {
            return null;
        }

        return (
            <span
              block="Menu"
              elem="CompareCountInMenu"
            >
                { `(${compareTotals})` }
            </span>
        );
    }

    renderComparePageLink() {
        const { device } = this.props;

        if (!device.isMobile) {
            return null;
        }

        return (
            <div block="Menu" elem="CompareLinkWrapper">
                <Link to="compare" block="Menu" elem="CompareLink">
                    <CompareIcon />
                    <h4>{ __('Compare products') }</h4>
                    { this.renderCompareCount() }
                </Link>
            </div>
        );
    }

    renderAdditionalInformation(checkMobile = false) {
        const { device } = this.props;

        if (checkMobile && !device.isMobile) {
            return null;
        }

        return (
            <>
                { /* { this.renderCurrencySwitcher() } */ }
                { this.renderStoreSwitcher() }
                { /* { this.renderComparePageLink() } */ }
            </>
        );
    }

    renderSubLevel(category, isSecondLevel = false) {
        const { activeMenuItemsStack, device } = this.props;
        const { item_id, children, title } = category;
        const childrenArray = getSortedItems(Object.values(children));
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };
        // const { handleToggleButton } = this.props;
        return (
            <div
              block="Menu"
              elem="SubMenu"
              mods={ { isVisible } }
              key={ item_id }
            //   onClick={ () => handleToggleButton() }
              aria-hidden="true"
            >
                <div
                  block="Menu"
                  elem="ItemList"
                  mods={ { ...subcategoryMods } }
                >
                    { device.isMobile && (
                        <MenuItem
                          activeMenuItemsStack={ activeMenuItemsStack }
                          item={ { ...category, title: __('All %s', title) } }
                          itemMods={ { ...subcategoryMods, isSecondLevel } }
                          isLink
                          isSubMenu
                          isMobileSideNav
                        />
                    ) }
                    { childrenArray.map((item) => this.renderSubLevelItems(item, isSecondLevel)) }
                </div>
            </div>
        );
    }

    renderSubLevelItems(item, isSecondLevel) {
        const {
            handleSubcategoryClick,
            activeMenuItemsStack,
            onCategoryHover,
            closeMenu,
            device
        } = this.props;

        const { item_id, children } = item;

        const childrenArray = Object.values(children);
        const subcategoryMods = { type: 'subcategory', isSecondLevel };

        if (childrenArray.length && device.isMobile) {
            return (
                <div
                  key={ item_id }
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex="0"
                  role="button"
                  aria-hidden="true"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ { ...subcategoryMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      isExpandable
                      isMobileSideNav
                      isSubMenu
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <div
              block="Menu"
              elem="SubItemWrapper"
              key={ item_id }
              onClick={ this.stopPropagation }
              role="button"
              tabIndex="-1"
              aria-hidden="true"
            >
                <MenuItem
                  activeMenuItemsStack={ activeMenuItemsStack }
                  item={ item }
                  itemMods={ subcategoryMods }
                  closeMenu={ closeMenu }
                  isLink
                  isSubMenu
                  isMobileSideNav
                />
                { /* { this.renderDesktopSubLevel(item) } */ }
            </div>
        );
    }

    renderFirstLevelItems(item) {
        const {
            activeMenuItemsStack,
            handleSubcategoryClick,
            onCategoryHover,
            closeMenu,
            device
        } = this.props;

        const { children, item_id } = item;
        const childrenArray = Object.values(children);
        const itemMods = { type: 'main' };
        if (childrenArray.length && device.isMobile) {
            return (
                <div
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex="0"
                  block="Menu"
                  elem="SubCatLink"
                  role="button"
                  aria-hidden="true"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ { ...itemMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      isExpandable
                      isMobileSideNav
                      isSubMenu={ false }
                    />
                    { this.renderSubLevel(item, true) }
                </div>
            );
        }

        return (
            <MenuItem
              activeMenuItemsStack={ activeMenuItemsStack }
              item={ item }
              itemMods={ itemMods }
              onCategoryHover={ onCategoryHover }
              closeMenu={ closeMenu }
              isLink
              isMobileSideNav
              isSubMenu={ false }
            />
        );
    }

    renderFirstLevel(item) {
        const { item_id } = item;
        // const { handleToggleButton } = this.props;

        return (
            <li
            //   onClick={ () => {
            //       handleToggleButton();
            //   } }
              block="Menu"
              elem="Item"
              key={ item_id }
              aria-hidden="true"
            >
                { this.renderFirstLevelItems.call(this, item) }
            </li>
        );
    }

    renderTopLevel() {
        const {
            menu, contacts, staticPages, device
        } = this.props;
        const categoryArray = Object.values(menu);
        const whatsAapLink = device.isMobile ? 'whatsapp://send?phone=' : 'https://web.whatsapp.com/send?phone=';
        const whatsappNumber = contacts.length
            ? (
                contacts.find((item) => item.key === 'whatsapp')
            )
            : null;
        const mobileNumber = contacts.length
            ? (
                contacts.find((item) => item.key === 'mobile')
            )
            : null;

        if (!categoryArray.length) {
            return null;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));

        return (
            <div block="Menu" elem="MainCategories">
                <div className="contact__container-social">
                    <div className="registrationLinks">
                        <p className="welcome">
                            <Link to="/">{ __('Welcome') }</Link>
                        </p>
                        <p className="sign-in">
                            <Link to="/customer/account/login">{ __('Sign in') }</Link>
                        </p>
                    </div>
                </div>
                <ul
                  block="Menu"
                  elem="ItemList"
                  mods={ { type: 'main' } }
                  aria-label={ mainCategoriesTitle }
                >
                    { childrenArray.map(this.renderFirstLevel.bind(this)) }
                </ul>
                { this.renderAdditionalInformation(true) }
                <div className="contact__container">
                    <Link to="/about-us">
                    <div className="contact__container-social">
                        <span><img src={ checkbox } alt="who-are-we-icon" /></span>
                        <p>{ __('Who') }</p>
                    </div>
                    </Link>
                    <div className="contact__container-social">
                        <span><img src={ country } alt="country-icon" /></span>
                        <p>{ __('Country') }</p>
                    </div>
                    <div className="contact__container-social">
                    <a
                      href={ `${whatsAapLink}${whatsappNumber.value.replace(/ +/g, '')}` }
                      rel="noreferrer"
                      target="_blank"
                    >
                        <span>
                            <img src={ whatsAppIcon } alt="whatsapp-icon" />
                        </span>
                        <p> { __('Contact us on WhatsApp') } </p>
                    </a>
                    </div>
                    <div className="contact__container-social">
                        <span>
                            <img src={ phoneIcon } alt="phonIcon" />
                        </span>
                        <a href={ `tel:${mobileNumber.value.replace(/ +/g, '')}` }>
                            <p> { __('Contact Us') } </p>
                        </a>
                    </div>

                </div>
                <div className="footer-wrapper">
                    <ul className="footer-wrapper__content">
                        { staticPages.length
                            ? (
                                staticPages.map((item) => {
                                    return (
                                        <Link to={ `/${item.value}` }>
                                            <li className="list"> { __(`${item.label}`) }</li>
                                        </Link>
                                    );
                                })
                            )
                            : null }
                    </ul>
                    <div className="footer-wrapper__content-bottom">
                        <p> { __('Alrights are Reserved by SONBOL 2022') } </p>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { device } = this.props;
        const { isMobile } = device;
        const renderText = isMobile ? (
            <div className="mobile-navigation-menu">
                <div className="blur-area" onClick={ () => history.back() }></div>
                <div className="sideMenu">
                    <div className="top-wrapper-container">
                        <div className="top-wrapper"><img src={ logoicon } alt="Logo" /></div>
                        <p>Switch to <span>English</span></p>
                    </div>
                    { this.renderTopLevel() }
                </div>
            </div>
        ) : null;

        return renderText;
    }
}
export default MobileNavigationComponent;
