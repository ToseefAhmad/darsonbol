/* eslint-disable react/require-default-props */
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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ActiveTabType, TabMapType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';

import MyAccountTabList from './MyAccountTabList.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace SonbolPwa/Component/MyAccountTabList/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace SonbolPwa/Component/MyAccountTabList/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, true, dispatch)
    )
});

/** @namespace SonbolPwa/Component/MyAccountTabList/Container */
export class MyAccountTabListContainer extends PureComponent {
    static propTypes = {
        onSignOut: PropTypes.func,
        logout: PropTypes.func.isRequired,
        tabMap: TabMapType.isRequired,
        activeTab: ActiveTabType.isRequired,
        changeActiveTab: PropTypes.func.isRequired,
        isMobile: PropTypes.bool
    };

    static defaultProps = {
        onSignOut: noopFn
    };

    state = {
        isContentExpanded: false
    };

    containerFunctions = {
        handleLogout: this.handleLogout.bind(this),
        onTabClick: this.onTabClick.bind(this),
        toggleExpandableContent: this.toggleExpandableContent.bind(this)
    };

    containerProps() {
        const {
            tabMap,
            activeTab,
            isMobile
        } = this.props;
        const { isContentExpanded } = this.state;

        return {
            tabMap,
            activeTab,
            isContentExpanded,
            isMobile
        };
    }

    handleLogout() {
        const { onSignOut, logout } = this.props;

        logout();
        onSignOut();
    }

    onTabClick(key) {
        const { changeActiveTab } = this.props;

        if (!isSignedIn()) {
            return;
        }

        this.toggleExpandableContent();
        changeActiveTab(key);
    }

    toggleExpandableContent() {
        this.setState(({ isContentExpanded }) => ({ isContentExpanded: !isContentExpanded }));
    }

    render() {
        return (
            <MyAccountTabList
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTabListContainer);
