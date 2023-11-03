import Loader from 'Component/Loader';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import EmptyOrderList from '../EmptyOrderList/EmptyOrderList.component';
/** @namespace SonbolPwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    renderTable() {
        return (
            <section block="MyAccountMyOrders" elem="Table">
                { /* <div>
                    { this.renderOrderHeadingRow() }
                </div> */ }
                { /* <div className="order-item-container"> */ }
                    { this.renderOrderRows() }
                { /* </div> */ }
            </section>
        );
    }

    render() {
        const { isLoading } = this.props;
        const { orderList } = this.props;
        const { items } = orderList;
        const itemsArray = items || [];

        // if (itemsArray.length === 0) {
        //     return <EmptyOrderList />;
        // }
        if (isLoading) {
            return <Loader isLoading={ isLoading } />;
        }

        if (!itemsArray) {
            return <EmptyOrderList />;
        }

        return (
            <div block="MyAccountMyOrders">
                { /* <Loader isLoading={ isLoading } /> */ }
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
