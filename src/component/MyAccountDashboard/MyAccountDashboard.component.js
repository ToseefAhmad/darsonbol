import Loader from 'Component/Loader';
import MyAccountCustomerTable from 'Component/MyAccountCustomerTable';
import {
    MyAccountDashboard as SourceMyAccountDashboard
} from 'SourceComponent/MyAccountDashboard/MyAccountDashboard.component';

import './MyAccountDashboard.override.style';

/** @namespace SonbolPwa/Component/MyAccountDashboard/Component */
export class MyAccountDashboardComponent extends SourceMyAccountDashboard {
    // TODO implement logic
    renderCustomerTable() {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard" elem="CustomerData">
                <MyAccountCustomerTable
                  customer={ customer }
                  title={ __('My profile') }
                />
            </div>
        );
    }

    render() {
        const { customer } = this.props;

        return (
            <div block="MyAccountDashboard" className="Account-Dashboard">
                <Loader isLoading={ !Object.keys(customer).length } />
                { this.renderCustomerTable() }
            </div>
        );
    }
}

export default MyAccountDashboardComponent;
