/* eslint-disable max-lines */
import Loader from 'Component/Loader';
import MyAccountOrderItemsTable from 'Component/MyAccountOrderItemsTable';
import MyAccountOrderTotals from 'Component/MyAccountOrderTotals';
import {
    MyAccountOrder as SourceMyAccountOrder
} from 'SourceComponent/MyAccountOrder/MyAccountOrder.component';

import shipmentImage from '../../style/icons/AccountPage/shipmentIcon.png';
import ShippingStatus from '../ShippingStatus/ShippingStatus.component';
import {
    ORDER_INVOICES,
    ORDER_ITEMS,
    ORDER_REFUNDS,
    ORDER_SHIPMENTS
} from './MyAccountOrder.config';

// import { convertStringToDate } from 'Util/Manipulations/Date';
import './MyAccountOrder.override.style';

/** @namespace SonbolPwa/Component/MyAccountOrder/Component */
export class MyAccountOrderComponent extends SourceMyAccountOrder {
    renderMap = {
        renderOrderItemsTable: this.renderOrderItemsTable.bind(this)
    };

    renderOrderItemsTable(items, index) {
        const { activeTab, order: { total: orderTotal, items: allOrderItems, id } } = this.props;
        const { total: itemsTotal } = items;

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ allOrderItems }
              total={ itemsTotal || orderTotal }
            />
        );
    }

    tabMap = {
        [ORDER_ITEMS]: {
            tabName: ORDER_ITEMS,
            title: __('Items Ordered'),
            shouldTabRender: () => {
                const { order } = this.props;

                return order;
            },
            render: () => {
                const { order: { items = [], increment_id } } = this.props;
                const renderArray = [{ items, number: increment_id }];
                const { renderOrderItemsTable } = this.renderMap;
                return renderArray.map(renderOrderItemsTable);
            }
        },
        [ORDER_INVOICES]: {
            tabName: ORDER_INVOICES,
            title: __('Invoices'),
            shouldTabRender: () => {
                const { order: { invoices = [] } } = this.props;

                return invoices.length;
            },
            render: () => {
                const { order: { invoices = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return invoices.map(renderOrderItemsTable);
            }
        },
        [ORDER_SHIPMENTS]: {
            tabName: ORDER_SHIPMENTS,
            title: __('Order Shipments'),
            shouldTabRender: () => {
                const { order: { shipments = [] } } = this.props;

                return shipments.length;
            },
            render: () => {
                const { order: { shipments = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return shipments.map(renderOrderItemsTable);
            }
        },
        [ORDER_REFUNDS]: {
            tabName: ORDER_REFUNDS,
            title: __('Refunds'),
            shouldTabRender: () => {
                const { order: { credit_memos = [] } } = this.props;

                return credit_memos.length;
            },
            render: () => {
                const { order: { credit_memos = [] } } = this.props;
                const { renderOrderItemsTable } = this.renderMap;

                return credit_memos.map(renderOrderItemsTable);
            }
        }
    };
    renderOrderIncrementIdAndStatus() {
        const { order: { increment_id, status, order_date } /* isMobile */ } = this.props;
        const DateAndTimeArray = order_date.split(' ');
        const [orderDate, orderTime] = DateAndTimeArray;

        // if (!isMobile) {
        //     return null;
        // }

        return (
            <>
                <h2 block="MyAccountOrder" elem="OrderId">
                    { __('Order # %s', increment_id) }
                </h2>
                <div className="orderbox-tds">
                    <span block="MyAccountOrder" elem="OrderStatus">
                        { status }
                    </span>
                    <span className="MyAccountOrderDate">{ orderTime }</span>
                    <span className="MyAccountOrderTime">{ orderDate }</span>
                </div>
            </>
        );
    }
    renderBaseInfo() {
        // const { order: { order_date } } = this.props;

        return (
            <div block="MyAccountOrder" elem="CreationDate">
                { this.renderOrderIncrementIdAndStatus() }
                { /* <span>{ convertStringToDate(order_date) }</span> */ }
            </div>
        );
    }

    renderContent() {
        const { order: { items } } = this.props;

        if (!items) {
            return null;
        }

        return (
            <>
                { this.renderBaseInfo() }
                { /* { this.renderActions() } */ }
                { /* { this.renderActiveTab() } */ }
                { this.renderShippingAddress() }
                { this.renderMobileDetails() }
                { this.renderShipmentDetails() }
                { this.renderShippingStatus() }
                <div className="order-items-container">
                    { this.renderItems() }
                </div>
                <div className="order-totals">
                    <div className="title-ordersumry">{ __('Order Summary') }</div>
                { this.renderOrderTotals() }
                </div>
                { /* { this.renderOrderInformation() } */ }
            </>
        );
    }

    renderShippingStatus() {
        const { order } = this.props;
        const { status } = order;
        return <ShippingStatus orderStatus={ status } />;
    }

    renderMobileDetails() {
        const { order } = this.props;
        const {
            shipping_address: {
                telephone
            }
        } = order;

        return (
            <section className="mobbox-change">
                <div className="mobile-number">
                    { __('Mobile number') }
                </div>
                <div className="perbox-phone-sts">
                    <div className="phone">
                        { telephone }
                    </div>
                    <div className="verification">{ __('Certain') }</div>
                </div>
            </section>
        );
    }

    renderShippingAddress() {
        const { order } = this.props;
        const {
            shipping_address: {
                firstname, lastname, city, region, street
            }
        } = order;
        const fullName = `${firstname} ${lastname}`;

        const completeAddress = `${street[0]} ${city} ${region}`;

        return (
            <section className="shipping-container">
                <div className="shipping-heading">{ __('Shipping Address') }</div>
                <div className="cust-name">{ fullName }</div>
                <div className="stradres-cust">{ completeAddress }</div>
            </section>
        );
    }

    renderShipmentDetails() {
        return (
            <section className="shipment-details-container">
                <div className="shipment-icon-container">
                    <img src={ shipmentImage } alt="shipment-icon" />
                </div>
                <div className="shipment-number">
                    <div className="ship-title">رقم الشحنه</div>
                    <div className="ship-number">AY2825412328</div>
                </div>
                <div className="shipment-btn">
                    <button className="btn-action-sp">تتبع</button>
                </div>
            </section>
        );
    }

    renderItems() {
        // const { items: { items: products = [] } } = this.props;
        const { order } = this.props;
        const { items } = order;
        // return <h1>Hello World</h1>;
        // return products.map(this.renderItemRow.bind(this));
        return items.map(this.renderItem.bind(this));
    }

    renderItem(product, i) {
        const {
            product_name, product_image, selected_options, quantity_ordered, row_subtotal
        } = product;
        const { currency, value } = row_subtotal;
        return (
            <section key={ i } className="order-item">
                <div className="order-image">
                    <img src={ product_image } alt="dummy-img" />
                </div>
                <div className="order-item-content">
                    <p className="product-name">{ product_name }</p>
                    { selected_options.map((selected_option) => {
                        const { label, value } = selected_option;
                        return (
                            <p>
                                <span className="lblitems-box">
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
                    <div className="pricebox-itmbt">
                        <span className="order-currency">{ currency }</span>
                        <span className="order-value">{ value }</span>
                    </div>
                    <p className="product-rating">{ __('Product rating') }</p>
                </div>
            </section>
        );
    }

    renderOrderTotals() {
        const { activeTab, order: { total: orderTotal } } = this.props;
        return <MyAccountOrderTotals activeTab={ activeTab } total={ orderTotal } />;
    }
    render() {
        const { isLoading } = this.props;

        return (
            <>
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </>
        );
    }
}

export default MyAccountOrderComponent;
