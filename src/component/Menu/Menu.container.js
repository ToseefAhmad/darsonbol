/* eslint-disable max-len */
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

import { getSortedItems } from '@scandipwa/scandipwa/src/util/Menu';
import { connect } from 'react-redux';

import MenuQuery from 'Query/Menu.query';
import { DeviceType } from 'Type/Device.type';
import history from 'Util/History';
import MenuHelper from 'Util/Menu';
import DataContainer from 'Util/Request/DataContainer';

import Menu from './Menu.component';

/** @namespace SonbolPwa/Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    compareTotals: state.ProductCompareReducer.count
});

/** @namespace SonbolPwa/Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace SonbolPwa/Component/Menu/Container */
export class MenuContainer extends DataContainer {
    static propTypes = {
        device: DeviceType.isRequired
    };

    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this),
        mouseEnter: this.mouseEnter.bind(this),
        mouseLeave: this.mouseLeave.bind(this)
    };

    __construct(props) {
        super.__construct(props);
        const {
            stack: activeMenuItemsStack = []
        } = history.location.state || {};

        this.state = {
            activeMenuItemsStack,
            menu: {},
            toggleMenu: false
        };
        this._getMenu();
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter() {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        });
    }
    mouseLeave() {
        this.setState({
            toggleMenu: !this.state.toggleMenu
        });
    }

    componentDidMount() {
        const { device: { isMobile } } = this.props;

        this._getMenu();

        if (isMobile) {
            window.addEventListener('popstate', this.historyBackHook);
        }
    }

    historyBackHook() {
        const { activeMenuItemsStack } = this.state;

        if (activeMenuItemsStack.length) {
            this.setState({ activeMenuItemsStack: activeMenuItemsStack.slice(1) });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.historyBackHook);
    }

    containerProps() {
        const {
            device,
            compareTotals,
            showMenu,
            setToFalse
        } = this.props;
        const { activeMenuItemsStack, menu, toggleMenu } = this.state;

        return {
            activeMenuItemsStack,
            menu,
            device,
            compareTotals,
            showMenu,
            toggleMenu,
            setToFalse
        };
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: header_menu || 'new-main-menu'
        };
    }

    _getMenu() {
        this.fetchData(
            [MenuQuery.getQuery(this._getMenuOptions())],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu)
            }, () => {
                const { menu } = this.state;
                const categoryArray = Object.values(menu);
                const [{ children }] = categoryArray;
                const childrenArray = Object.values(children);
                const sortedChildrenArray = getSortedItems(childrenArray);
                const elementHavingChildren = sortedChildrenArray.find((element) => Object.entries(element.children).length !== 0);
                const { item_id } = elementHavingChildren;
                const { device } = this.props;
                const { isMobile } = device;
                if (isMobile) {
                    this.setState({
                        activeMenuItemsStack: [item_id]
                    });
                }
            })
        );
    }

    getNewActiveMenuItemsStack(activeMenuItemsStack, item_id) {
        if (activeMenuItemsStack.includes(item_id)) {
            return activeMenuItemsStack.filter((id) => id !== item_id);
        }

        return [item_id];
    }

    handleSubcategoryClick(e, activeSubcategory) {
        const { activeMenuItemsStack } = this.state;
        const { item_id } = activeSubcategory;

        e.stopPropagation();

        const newActiveMenuItemsStack = this.getNewActiveMenuItemsStack(activeMenuItemsStack, item_id);
        this.setState({ activeMenuItemsStack: newActiveMenuItemsStack });
    }

    onCategoryHover(activeSubcategory) {
        const { device } = this.props;
        const { activeMenuItemsStack } = this.state;

        if (device.isMobile) {
            return;
        }

        const { item_id } = activeSubcategory;

        if (activeMenuItemsStack.includes(item_id)) {
            return;
        }

        this.setState({ activeMenuItemsStack: [item_id] });
    }

    closeMenu() {
        const { device } = this.props;

        if (device.isMobile) {
            return;
        }

        this.setState({ activeMenuItemsStack: [] });
    }

    render() {
        return (
            <Menu
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
