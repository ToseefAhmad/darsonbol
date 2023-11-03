/* eslint-disable react/sort-comp */
/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
    ADDRESS_POPUP_ID,
    DELETE_ADDRESS,
    EDIT_ADDRESS
} from 'Component/MyAccountAddressPopup/MyAccountAddressPopup.config';
import { showPopup } from 'Store/Popup/Popup.action';
import { Addresstype } from 'Type/Account.type';
import { MixType } from 'Type/Common.type';
import { CountriesType } from 'Type/Config.type';

import AddressBlockComponent from './AddressBlock.component';

/** @namespace SonbolPwa/Component/AddressBlock/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    countries: state.ConfigReducer.countries
});

/** @namespace SonbolPwa/Component/AddressBlock/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showEditPopup: (payload) => dispatch(showPopup(ADDRESS_POPUP_ID, payload))
});

/** @namespace SonbolPwa/Component/AddressBlock/Container */
export class AddressBlockContainer extends PureComponent {
    static propTypes = {
        mix: MixType,
        address: Addresstype.isRequired,
        showEditPopup: PropTypes.func.isRequired,
        countries: CountriesType.isRequired,
        // eslint-disable-next-line react/boolean-prop-naming
        showAdditionalFields: PropTypes.bool,
        // eslint-disable-next-line react/boolean-prop-naming
        showActions: PropTypes.bool,
        title: PropTypes.string,
        defaultLabel: PropTypes.string
    };

    static defaultProps = {
        showAdditionalFields: false,
        showActions: false,
        mix: {},
        title: '',
        defaultLabel: ''
    };

    __construct(props) {
        super.__construct(props);
        const { address } = this.props;
        const { default_billing, default_shipping } = address;
        const flag = default_billing && default_shipping;
        this.state = {
            isDefaultAddress: flag
        };
        this.handleIsDefaultAddress = this.handleIsDefaultAddress.bind(this);
    }

    handleIsDefaultAddress() {
        const { isDefaultAddress } = this.state;
        const prevIsDefaultAddress = !isDefaultAddress;
        this.setState({
            isDefaultAddress: prevIsDefaultAddress
        });
    }
    containerFunctions = {
        onEditClick: this.onEditClick.bind(this),
        onDeleteClick: this.onDeleteClick.bind(this),
        handleIsDefaultAddress: this.handleIsDefaultAddress.bind(this)
    };

    containerProps() {
        const {
            address,
            countries,
            mix,
            showAdditionalFields,
            showActions,
            title,
            defaultLabel
        } = this.props;

        const { isDefaultAddress } = this.state;
        return {
            address,
            countries,
            mix,
            showAdditionalFields,
            showActions,
            title,
            defaultLabel,
            isDefaultAddress
        };
    }

    onEditClick() {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: EDIT_ADDRESS,
            title: __('Edit address'),
            address
        });
    }

    onDeleteClick() {
        const { showEditPopup, address } = this.props;

        showEditPopup({
            action: DELETE_ADDRESS,
            title: __('Confirm delete'),
            address
        });
    }

    render() {
        return (
            <AddressBlockComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressBlockContainer);
