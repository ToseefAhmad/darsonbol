// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CustomerType } from 'Type/Account.type';

import './MyAccountInfo.style';

/** @namespace SonbolPwa/Component/MyAccountInfo/Component */
export class MyAccountInfoComponent extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    renderLogoutTab() {
        const { handleLogout } = this.props;

        return (
            <button
              block="Button"
              onClick={ handleLogout }
            >
                { __('Logout') }
            </button>
        );
    }

    render() {
        const { customer } = this.props;
        return (
            <div block="MyAccountInfo">
                { /* TODO: Implement render method */ }
                <div block="MyAccountInfo" elem="Info">
                    <div className="infoname">
                        { __('Welcome') }
                        { '..' }
                        { customer.firstname }
                    </div>
                    <div className="infoemail">{ customer.email }</div>
                </div>
                { this.renderLogoutTab() }
            </div>
        );
    }
}

export default MyAccountInfoComponent;
