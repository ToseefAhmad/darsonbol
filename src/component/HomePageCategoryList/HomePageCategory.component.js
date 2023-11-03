import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import MenuItem from 'Component/MenuItem';
import { DeviceType } from 'Type/Device.type';
import { MenuType } from 'Type/Menu.type';
import { getSortedItems } from 'Util/Menu';

import './Home.categories.style';
/** @namespace SonbolPwa/Component/HomePageCategoryList/HomePageCategory/Component */
export class HomePageCategoryComponent extends PureComponent {
    static propTypes = {
        closeMenu: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        menu: MenuType.isRequired,
        activeMenuItemsStack: PropTypes.arrayOf(PropTypes.string).isRequired,
        handleSubcategoryClick: PropTypes.func.isRequired,
        onCategoryHover: PropTypes.func.isRequired

    };

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
                    />
                    { /* { this.renderSubLevel(item, true) } */ }
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
            />
        );
    }
    renderFirstLevel(item) {
        const { item_id } = item;

        return (
            <li
              block="Menu"
              elem="Item"
              key={ item_id }
            >
                { this.renderFirstLevelItems.call(this, item) }
            </li>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);
        if (!categoryArray.length) {
            return null;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        // eslint-disable-next-line no-unused-vars
        const childrenArray = getSortedItems(Object.values(children));
        const listItems = childrenArray.map((children) => (
            <li key={ children.title }>
                <Link to={ children.url.pathname }>
                    { children.title }
                </Link>
            </li>
        ));

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    { /* { this.renderAdditionalInformation(true) } */ }
                    <div className="homepage__categories">
                        <ul
                          block="Menu"
                          elem="ItemList"
                          mods={ { type: 'main' } }
                          aria-label={ mainCategoriesTitle }
                        >
                            { listItems }

                        </ul>
                    </div>
                </div>
                { /* { this.renderSubMenuDesktop(children) } */ }
            </>
        );
    }
    render() {
        const { closeMenu, device } = this.props;
        const { isMobile } = device;
        const renderText = isMobile ? (
            <div
              block="Menu"
              elem="MenuWrapper"
              onMouseLeave={ closeMenu }
            >
                { this.renderTopLevel() }

            </div>
        ) : null;

        return renderText;
    }
}

export default HomePageCategoryComponent;
