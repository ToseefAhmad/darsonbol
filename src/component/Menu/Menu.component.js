/* eslint-disable max-lines */
/* eslint-disable no-nested-ternary */
// import Html from 'Component/Html';
import Link from 'Component/Link';
import MenuItem from 'Component/MenuItem';
import {
    Menu as SourceMenu
} from 'SourceComponent/Menu/Menu.component';
import { getSortedItems } from 'Util/Menu';

import './Menu.override.style';
/** @namespace SonbolPwa/Component/Menu/Component */
export class MenuComponent extends SourceMenu {
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
                    // TODO: split into smaller components
                    // eslint-disable-next-line react/jsx-no-bind
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
                      isSecondLevel
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
                  isSecondLevel
                />
                { this.renderDesktopSubLevel(item) }
            </div>
        );
    }
    renderSubLevel(category, isSecondLevel = false) {
        // const categoryImage = category.menu_item_content.html;
        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
        const { activeMenuItemsStack, device } = this.props;
        const { isMobile } = device;
        const {
            item_id, children, title, menu_image, url
        } = category;
        let categoryImageHtml = null;
        if (isMobile) {
            categoryImageHtml = <img src={ menu_image } alt={ title } />;
        } else if (!isMobile) {
            categoryImageHtml = null;
        }
        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables

        const childrenArray = getSortedItems(Object.values(children));
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };
        return (
            <div
              block="Menu"
              elem="SubMenu"
              mods={ { isVisible } }
              key={ item_id }
            >
                <Link to={ url }><div className="SubCategory-first-image">{ categoryImageHtml }</div></Link>
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
                          isSecondLevel
                        />
                    ) }
                    { childrenArray.map((item) => this.renderSubLevelItems(item, isSecondLevel)) }
                </div>
            </div>
        );
    }

    renderSubMenuDesktopItems(item) {
        const { item_id, children } = item;

        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack, closeMenu } = this.props;
        const isVisible = activeMenuItemsStack.includes(item_id);

        if (!isVisible) {
            return null;
        }

        return (
            <div
              block="Menu"
              elem="SubCategoriesWrapper"
              mods={ { isVisible } }
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="SubCategoriesWrapperInner"
                  mods={ { isVisible } }
                >
                    <div
                      block="Menu"
                      elem="SubCategories"
                    >
                        { this.renderSubLevel(item) }
                    </div>
                    { this.renderAdditionalInformation() }
                </div>
                <div
                  block="Menu"
                  elem="Overlay"
                  mods={ { isVisible } }
                  onMouseEnter={ closeMenu }
                />
            </div>
        );
    }

    renderSubMenuDesktop(itemList) {
        const { device } = this.props;
        if (device.isMobile) {
            return null;
        }

        return this.renderSubMenuDesktopItems(itemList);
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
                    // TODO: split into smaller components
                    // eslint-disable-next-line react/jsx-no-bind
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
                      device={ device }
                      isMobileSideNav={ false }
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
              device={ device }
              isMobileSideNav={ false }
            />
        );
    }
    renderFirstLevel(item) {
        // const { menu } = this.props;
        // const categoryArray = Object.values(menu);
        // if (!categoryArray.length) {
        //     return null;
        // }
        // const [{ children }] = categoryArray;
        // // console.log('calliiiii---------', children, item);
        const { item_id } = item;
        // const renderSubMenuDesktopCaller = children.parent_id === item.parent_id && children.item_id === item.item_id
        //     ? this.renderSubMenuDesktop(children) : null;

        // console.log('callin----------', children, item.parent_id);
        return (
            <li
              block="Menu"
              elem="Item"
              key={ item_id }
            >
                { this.renderFirstLevelItems.call(this, item) }
                { this.renderSubMenuDesktop(item) }

            </li>
        );
    }
    renderAdditionalInformation(checkMobile = false) {
        const { device } = this.props;
        if (checkMobile && !device.isMobile) {
            return null;
        }

        return null;
        // { /* { this.renderCurrencySwitcher() }
        //         { this.renderStoreSwitcher() }
        //         { this.renderComparePageLink() } */ }
    }
    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return null;
        }
        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));
        return (
            <>
                <div block="Menu" elem="MainCategories">
                    { /* { this.renderAdditionalInformation(true) } */ }
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                      aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel.bind(this)) }
                    </ul>
                </div>
                { /* { this.renderSubMenuDesktop(children) } */ }
            </>
        );
    }
    render() {
        const {
            // closeMenu,
            showMenu,
            setToFalse
            // mouseEnter,
            // mouseLeave
            // toggleMenu,

        } = this.props;

        const menuClass = showMenu ? 'menu-desktop' : '';
        return (
            <div
            //   style={ { display: showMenu ? 'block' : 'none' } }
              className={ menuClass }
              block="Menu"
              elem="MenuWrapper"
            //   onMouseEnter={ mouseEnter }
              onMouseLeave={ setToFalse }
            >
                { this.renderTopLevel() }
            </div>
        );
    }
}
export default MenuComponent;
