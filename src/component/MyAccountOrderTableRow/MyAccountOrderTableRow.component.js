/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import {
    MyAccountOrderTableRow as SourceMyAccountOrderTableRow
} from 'SourceComponent/MyAccountOrderTableRow/MyAccountOrderTableRow.component';

// import { formatPrice } from 'Util/Price';
import './MyAccountOrderTableRow.override.style';

/** @namespace SonbolPwa/Component/MyAccountOrderTableRow/Component */
export class MyAccountOrderTableRowComponent extends SourceMyAccountOrderTableRow {
    render() {
        const {
            // order: {
            // created_at,
            // status,
            // increment_id
            // total: {
            // grand_total: {
            // value,
            // currency
            // } = {}
            // } = {}
            // },
            onViewClick
        } = this.props;

        const {
            order: {
                increment_id, created_at, items, status
            }
        } = this.props;
        const arrayItems = items || [];
        const { length } = arrayItems;
        if (!arrayItems) {
            return null;
        }

        return (
            <div className="wrapbox-container">
                <section className="wrapper-odrdetail">
                    <div className="order-id">
                        <span className="order-text">
                            { __('order') }
                            { ' ' }
                        </span>
                        <span className="order-id">{ increment_id }</span>
                    </div>
                    <div className="order-date-details">
                        <span>
                            { __('%s products were bought a day', length) }
                            { ' ' }
                        </span>
                        <span className="order-date">
                            { created_at }
                        </span>
                    </div>
                    <div className="order-detail-button">
                        <button onClick={ onViewClick }>{ __('the details') }</button>
                    </div>
                </section>
                <div block="MyAccountOrderTableRow">
                    { /* <td>{ increment_id ? `#${increment_id}` : '' }</td>
                <td>{ created_at }</td>
                <td>{ status }</td>
                <td block="hidden-mobile">
                    { value ? formatPrice(value, currency) : '' }
                </td> */ }
                        { arrayItems.map(({
                            product_name, product_image, product_short_description, selected_options
                        }) => (
                            <section className="order-item">
                                <div className="order-image">
                                    <img src={ product_image } alt="dummy-img" />
                                </div>
                                <div className="order-item-content">
                                    <p className="product-name">{ product_name }</p>
                                    <p className="short-descrip">{ product_short_description }</p>
                                    <div className="optionsbox-item">
                                        { selected_options.map((option) => (
                                            <p className={ option.label }>
                                                <span className="lblitems-box">
                                                    { option.label }
                                                    :
                                                    { ' ' }
                                                </span>
                                                <span>{ option.value }</span>
                                            </p>
                                        )) }
                                    </div>
                                    <p className="sts_orderitems notverify">{ status }</p>
                                </div>
                            </section>
                        )) }
                </div>
            </div>

        );
    }
}

export default MyAccountOrderTableRowComponent;
