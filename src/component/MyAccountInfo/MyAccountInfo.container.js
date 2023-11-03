/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import { CustomerType } from 'Type/Account.type';
import history from 'Util/History';
import { appendWithStoreCode, replace } from 'Util/Url';

import MyAccountInfoComponent from './MyAccountInfo.component';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace SonbolPwa/Component/MyAccountInfo/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    baseLinkUrl: state.ConfigReducer.base_link_url
});
/** @namespace SonbolPwa/Component/MyAccountInfo/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, false, dispatch)
    )
});

/** @namespace SonbolPwa/Component/MyAccountInfo/Container */
export class MyAccountInfoContainer extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        baseLinkUrl: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    };

    // eslint-disable-next-line react/sort-comp
    containerProps() {
        const { customer } = this.props;

        return {
            customer
        };
    }
    containerFunctions = {
        handleLogout: this.handleLogout.bind(this)
    };

    handleLogout() {
        const { baseLinkUrl, logout } = this.props;

        const path = baseLinkUrl
            ? appendWithStoreCode(ACCOUNT_LOGIN_URL)
            : replace(/\/customer\/account\/.*/, ACCOUNT_LOGIN_URL);

        history.push({
            pathname: path,
            state: { isFromEmailChange: true }
        });
        logout();
    }

    render() {
        return (
            <MyAccountInfoComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountInfoContainer));
