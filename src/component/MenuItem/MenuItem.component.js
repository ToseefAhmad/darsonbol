/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import PropTypes from 'prop-types';

import Html from 'Component/Html';
import Link from 'Component/Link';
import {
    MenuItem as SourceMenuItem
} from 'SourceComponent/MenuItem/MenuItem.component';
import { DeviceType } from 'Type/Device.type';

import './MenuItem.override.style';

/** @namespace SonbolPwa/Component/MenuItem/Component */
export class MenuItemComponent extends SourceMenuItem {
    static propTypes = {
        device: DeviceType.isRequired,
        isMobileSideNav: PropTypes.bool,
        isSubMenu: PropTypes.bool
    };

    renderItemLinkContent() {
        const {
            activeMenuItemsStack,
            item,
            itemMods,
            handleCategoryHover,
            handleLinkLeave,
            onItemClick,
            device
        } = this.props;
        const { isMobile } = device;
        const {
            url,
            item_id
        } = item;

        const isHovered = activeMenuItemsStack.includes(item_id);
        const subMenuWrapper = isMobile ? 'Menu-SubItemWrapper' : null;
        return (
            <div className={ subMenuWrapper }>
                <Link
                  to={ url }
                  block="Menu"
                  elem="Link"
                  id={ item_id }
                  onMouseEnter={ handleCategoryHover }
                  onMouseLeave={ handleLinkLeave }
                  mods={ { isHovered } }
                  onClick={ onItemClick }
                >
                    { this.renderItemContent(item, itemMods) }
                </Link>
            </div>
        );
    }
    renderItemContent(item, itemMods) {
        let content = null;
        let sideMenuCategoryIconHtml = null;
        const categoryBannerClass = 'maincategypic';
        const { title, mobile_icon, menu_image } = item;
        const {
            device, isMobileSideNav, isSubMenu, isSecondLevel
        } = this.props;
        const { isMobile } = device;
        const imageHtmlTag = item.menu_item_content.html;
        if (isMobile && isMobileSideNav && !isSubMenu) {
            sideMenuCategoryIconHtml = <img src={ mobile_icon } alt={ title } />;
        } else if (isMobile && !isMobileSideNav) {
            content = <div className={ categoryBannerClass }><img src={ menu_image } alt={ title } /></div>;
        } else if (isMobile && isMobileSideNav && isSubMenu) {
            sideMenuCategoryIconHtml = null;
        } else if (!isMobile && isSecondLevel) {
            content = <div className={ categoryBannerClass }><Html content={ imageHtmlTag } /></div>;
        }

        return (
            <figcaption
              onClick={ this.titleClickHandler }
              aria-hidden="true"
              block="Menu"
              elem="ItemCaption"
              mods={ itemMods }
            >
                <div className="mobile-nav-item-icon">
                    <span>{ sideMenuCategoryIconHtml }</span>
                    <p>
                        { (isMobile && !isMobileSideNav && (isSecondLevel || isSubMenu)) ? '' : title }
                        { /* <span>{ this.renderExpandButton() }</span> */ }
                    </p>
                </div>
                { content }
            </figcaption>
        );
    }

    render() {
        const { item, itemMods, isLink } = this.props;
        if (isLink) {
            return this.renderItemLinkContent();
        }

        return this.renderItemContent(item, itemMods);
    }
}

export default MenuItemComponent;
