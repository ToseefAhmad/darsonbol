/*
 * Copyright (c) 2022. Shaymaa Saied
 */
import Html from 'Component/Html';

import '../style/Menu.override.style.scss';

/** @namespace MagearabScandipwaMenu/Plugin/MenuComponentPlugin/Component */
export class MenuComponentPlugin{
    renderItemContent(html) {
        if (!html) {
            return null;
        }

        const cleanDescription = html.replace(/<\/?[^>]+(>|$)/g, '');
        return (
                <div
                  block="Menu"
                  elem="ItemContent"
                >
                    <meta itemProp="description" content={ cleanDescription } />
                    <Html content={ html } />
                </div>
        );
    }

    aroundRenderSubMenuDesktopItems = (args, callback, instance) => {
        const item = args[0];
        const { item_id, children, menu_item_content: { html } } = item;
        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack, closeMenu } = instance.props;
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
                        { instance.renderSubLevel(item) }
                        { this.renderItemContent(html) }
                    </div>
                    { instance.renderAdditionalInformation() }
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
}
const { aroundRenderSubMenuDesktopItems } = new MenuComponentPlugin();

export const config = {
    'Component/Menu/Component': {
        'member-function': {
            renderSubMenuDesktopItems: aroundRenderSubMenuDesktopItems
        }
    }
};

export default config;
