// import PropTypes from 'prop-types';

import PropTypes from 'prop-types';

import Loader from 'Component/Loader';

import AddressBlockComponent from '../AddressBlock/AddressBlock.component';

import './CheckoutAddressBlock.style';

/** @namespace SonbolPwa/Component/CheckoutAddressBlock/Component */
export class CheckoutAddressBlockComponent extends AddressBlockComponent {
    static propTypes = {
        ...AddressBlockComponent.propTypes,
        isSelected: PropTypes.bool,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        ...AddressBlockComponent.defaultProps,
        isSelected: false
    };

    onAddressClick = this.onAddressClick.bind(this);

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    onAddressClick() {
        const { address, onClick } = this.props;
        onClick(address);
    }
    renderAddress() {
        const { address, title, defaultLabel } = this.props;
        const name = `${address.firstname } ${ address.lastname}`;
        if (!address) {
            return null;
        }

        return (
            <div block="CheckoutAddressBlock" elem="CardDetails">
                <div block="CheckoutAddressBlock" elem="Title">
                    <span>
                        { title }
                    </span>
                </div>
                <div block="CheckoutAddressBlock" elem="NameLabel">
                    <div block="CheckoutAddressBlock" elem="Name">
                        <strong>
                            { name }
                        </strong>
                    </div>
                    <span block="CheckoutAddressBlock" elem="Label">
                        { defaultLabel }
                    </span>
                </div>
                <div block="CheckoutAddressBlock" elem="CardAddress">
                    <span>
                        { address.street }
                    </span>
                    <span>
                        { address.telephone }
                    </span>
                </div>
            </div>
        );
    }
    renderActions() {
        const {
            onEditClick
        } = this.props;

        return (
            <div block="CheckoutAddressBlock" elem="CardActions">
                <button
                  block="Button"
                  onClick={ this.onAddressClick }
                >
                    { __('Select') }
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

    renderTable() {
        const { isSelected } = this.props;

        return (
            <button
              block="CheckoutAddressBlock"
              elem="Button"
              type="button"
              mods={ { isSelected } }
              onClick={ this.onAddressClick }
            >
                { this.renderAddress() }
            </button>
        );
    }

    render() {
        const { countries } = this.props;

        return (
            <div block="CheckoutAddressBlock" elem="Card">
                <Loader isLoading={ !countries.length } />
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default CheckoutAddressBlockComponent;
