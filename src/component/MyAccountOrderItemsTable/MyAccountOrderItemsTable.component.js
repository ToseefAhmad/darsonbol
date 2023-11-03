import { ORDER_SHIPMENTS } from 'Component/MyAccountOrder/MyAccountOrder.config';
import MyAccountOrderTotals from 'Component/MyAccountOrderTotals';
import {
    MyAccountOrderItemsTable as SourceMyAccountOrderItemsTable
} from 'SourceComponent/MyAccountOrderItemsTable/MyAccountOrderItemsTable.component';

/** @namespace SonbolPwa/Component/MyAccountOrderItemsTable/Component */
export class MyAccountOrderItemsTableComponent extends SourceMyAccountOrderItemsTable {
    renderTotals() {
        const { total, activeTab } = this.props;

        if (activeTab === ORDER_SHIPMENTS) {
            return null;
        }

        return <MyAccountOrderTotals activeTab={ activeTab } total={ total } />;
    }
    renderItems() {
        const { items: { items: products = [] } } = this.props;
        // return products.map(this.renderItemRow.bind(this));
        return products.map(this.renderItem.bind(this));
    }

    renderItem(product, i) {
        const {
            product_name, selected_options, quantity_ordered, row_subtotal
        } = product;
        const { currency, value } = row_subtotal;
        return (
            <section key={ i } className="order-item">
                <div className="order-image">
                    <img src="https://cdn.pixabay.com/photo/2021/10/01/20/26/eurasian-pygmy-owl-6673563_960_720.jpg" alt="dummy-img" />
                </div>
                <div className="order-item-content">
                    <p className="product-name">{ product_name }</p>
                    { selected_options.map((selected_option) => {
                        const { label, value } = selected_option;
                        return (
                            <p>
                                <span>
                                    { label }
                                    :
                                    { ' ' }
                                </span>
                                <span>{ value }</span>
                            </p>
                        );
                    }) }
                    <p className="quantity-ordered">
                        { __('Quantity') }
                        :
                        { quantity_ordered }
                    </p>
                </div>
                <div className="order-total">
                    <h3>
                        <span className="order-currency">{ currency }</span>
                        <span className="order-value">{ value }</span>
                    </h3>
                    <p className="product-rating">{ __('Product rating') }</p>
                </div>
            </section>
        );
    }
    renderDesktopTable() {
        return (
            <section>
                <div className="order-items-container">
                { this.renderItems() }
                </div>
                <div className="order-totals">
                    { this.renderTotals() }
                </div>
                <div className="order-commnets">
                { this.renderComments() }
                </div>
            </section>
        );

        // <div block="MyAccountOrderItemsTable" elem="ProductsWrapper">
        //     { this.renderOrderTitle() }
        //     <table
        //       block="MyAccountOrderItemsTable"
        //       elem="Products"
        //     >
        //         <thead>
        //             { this.renderItemsHeading() }
        //         </thead>
        //         <tbody
        //           block="MyAccountOrderItemsTable"
        //           elem="TableRows"
        //         >
        //             { this.renderItems() }
        //         </tbody>
        //         { this.renderTotals() }
        //     </table>
        //     { this.renderComments() }
        // </div>
    }
    render() {
        const { isMobile } = this.props;

        if (!isMobile) {
            return this.renderDesktopTable();
        }

        return this.renderMobileTable();
    }
}

export default MyAccountOrderItemsTableComponent;
