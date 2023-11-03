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

import MenuQuery from '@scandipwa/scandipwa/src/query/Menu.query';
import { DeviceType } from '@scandipwa/scandipwa/src/type/Device.type';
import history from '@scandipwa/scandipwa/src/util/History';
import MenuHelper from '@scandipwa/scandipwa/src/util/Menu';
import DataContainer from '@scandipwa/scandipwa/src/util/Request/DataContainer';
import { connect } from 'react-redux';

import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';

import { Contacts, SocialAccounts, StaticPages } from '../../../packages/magearab-scandipwa-initconfig/src/type/InitConfig.type';
import MobileNavigationComponent from './MobileNavigation.component';
/** @namespace SonbolPwa/Component/MobileNavigation/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device,
    compareTotals: state.ProductCompareReducer.count,
    contacts: state.InitConfigReducer.initConfig.Configurations.contact_us,
    socialAccounts: state.InitConfigReducer.initConfig.Configurations.social_accounts,
    staticPages: state.InitConfigReducer.initConfig.Configurations.static_pages
});

/** @namespace SonbolPwa/Component/MobileNavigation/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName))

});

/** @namespace SonbolPwa/Component/MobileNavigation/Container */
export class MobileNavigationContainer extends DataContainer {
    static propTypes = {
        device: DeviceType.isRequired,
        contacts: Contacts,
        socialAccounts: SocialAccounts,
        staticPages: StaticPages
    };

    containerFunctions = {
        handleSubcategoryClick: this.handleSubcategoryClick.bind(this),
        closeMenu: this.closeMenu.bind(this),
        onCategoryHover: this.onCategoryHover.bind(this)
    };

    __construct(props) {
        super.__construct(props);

        const {
            stack: activeMenuItemsStack = []
        } = history.location.state || {};

        this.state = {
            activeMenuItemsStack,
            menu: {}
        };
    }

    componentDidMount() {
        // const { device: { isMobile } } = this.props;

        this._getMenu();

        // if (isMobile) {
        //     window.addEventListener('popstate', this.historyBackHook);
        // }
        this.props.setNavigationState({
            name: 'menu2'
        });
    }

    // historyBackHook() {
    //     const { activeMenuItemsStack } = this.state;

    //     if (activeMenuItemsStack.length) {
    //         this.setState({ activeMenuItemsStack: activeMenuItemsStack.slice(1) });
    //     }
    // }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.historyBackHook);
    }

    containerProps() {
        const {
            device,
            compareTotals,
            toggleButton,
            // handleToggleButton,
            contacts,
            socialAccounts,
            staticPages
        } = this.props;
        const { activeMenuItemsStack, menu } = this.state;
        return {
            activeMenuItemsStack,
            menu,
            device,
            compareTotals,
            toggleButton,
            // handleToggleButton,
            contacts,
            socialAccounts,
            staticPages

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
            })
        );
    }

    getNewActiveMenuItemsStack(activeMenuItemsStack, item_id) {
        if (activeMenuItemsStack.includes(item_id)) {
            return activeMenuItemsStack.filter((id) => id !== item_id);
        }

        return [item_id, ...activeMenuItemsStack];
    }

    handleSubcategoryClick(e, activeSubcategory) {
        const { activeMenuItemsStack } = this.state;
        // if (!activeMenuItemsStack) {
        //     activeMenuItemsStack = [];
        // }
        // const { handleToggleButton } = this.props;
        const { item_id } = activeSubcategory;

        e.stopPropagation();

        const newActiveMenuItemsStack = this.getNewActiveMenuItemsStack(activeMenuItemsStack, item_id);
        this.setState({ activeMenuItemsStack: newActiveMenuItemsStack });
        // handleToggleButton();
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
            <MobileNavigationComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavigationContainer);
