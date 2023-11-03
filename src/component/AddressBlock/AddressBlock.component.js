/* eslint-disable max-len */
/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import { Switch } from '@mui/material';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import { Addresstype } from 'Type/Account.type';
import { MixType } from 'Type/Common.type';

import './AddressBlock.style';

/** @namespace SonbolPwa/Component/AddressBlock/Component */
export class AddressBlockComponent extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        title: PropTypes.string,
        defaultLabel: PropTypes.string,
        // eslint-disable-next-line react/no-unused-prop-types
        isSelected: PropTypes.bool,
        mix: MixType.isRequired,
        address: Addresstype.isRequired,
        // eslint-disable-next-line react/boolean-prop-naming
        showActions: PropTypes.bool.isRequired,
        // eslint-disable-next-line react/boolean-prop-naming,react/no-unused-prop-types
        showAdditionalFields: PropTypes.bool.isRequired,
        onEditClick: PropTypes.func.isRequired,
        onDeleteClick: PropTypes.func.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        countries: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                id: PropTypes.string,
                available_regions: PropTypes.arrayOf(
                    PropTypes.shape({
                        code: PropTypes.string,
                        name: PropTypes.string,
                        id: PropTypes.number
                    })
                )
            })
        ).isRequired,
        isDefaultAddress: PropTypes.bool.isRequired

    };

    static defaultProps = {
        title: '',
        isSelected: false,
        defaultLabel: ''
    };

    renderTooggleDefaultBtn() {
        const { isDefaultAddress, handleIsDefaultAddress } = this.props;
        return (
            <div className="btnaddressdef">
                <span className="dalbh">{ __('default address') }</span>
                <span>
                    <Switch
                      checked={ isDefaultAddress }
                      onChange={ handleIsDefaultAddress }
                      inputProps={ { 'aria-label': 'controlled' } }
                    />
                </span>
            </div>
        );
    }

    renderActions() {
        const {
            onEditClick,
            onDeleteClick,
            showActions,
            address: { default_billing, default_shipping }
        } = this.props;

        const isDeleteAllowed = default_shipping || default_billing;

        if (!showActions) {
            return null;
        }

        return (
            <div block="AddressBlock" elem="Actions">
                <button
                  block="Button"
                  mods={ { isAccountButton: true } }
                  onClick={ onDeleteClick }
                  disabled={ isDeleteAllowed }
                  title={ isDeleteAllowed ? __('Can not delete - address is set as default.') : 'Delete this address' }
                >
                    { __('Delete') }
                </button>
                <button
                  block="Button"
                  onClick={ onEditClick }
                  mods={ { isAccountButton: true } }
                >
                    { __('Edit address') }
                </button>
            </div>
        );
    }
    renderAddress() {
        const { address, defaultLabel } = this.props;

        if (!address) {
            return null;
        }

        return (
            <div block="AddressBlock" elem="details">
                <div className="default-label">
                    <h3 className="home-text">
                        <span>{ __('the home') }</span>
                        <span className="lbldef">
                                                (
                                                { ' ' }
                                                { defaultLabel }
                                                { ' ' }
                                                )
                        </span>

                    </h3>
                </div>
                { /* <div block="AddressBlock">
                    { title }
                </div> */ }
                <div className="fullname">
                    <strong className="firstname">{ address.firstname }</strong>
                    { ' ' }
                    <strong className="lastname">{ address.lastname }</strong>
                </div>
                { /* <span>
                    { defaultLabel }
                </span> */ }
                <div className="street-address">
                    { address.street }
                </div>
                <div className="telephone">
                    { address.telephone }
                </div>
            </div>
        );
    }

    render() {
        const { countries, mix } = this.props;
        return (
            <div block="AddressBlock" mix={ mix } elem="Card">
                { /* TODO: Implement render method */ }
                <Loader isLoading={ !countries.length } />
                <div className="adress-side boxleft-ad">
                    { this.renderAddress() }
                </div>
                <div className="adress-side boxright-ad">
                    { this.renderTooggleDefaultBtn() }
                    { this.renderActions() }
                </div>
            </div>
        );
    }
}

export default AddressBlockComponent;
