/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showPopup } from 'Store/Popup/Popup.action';
import { ProductType } from 'Type/ProductList.type';

import SizeChartButtonComponent from './SizeChartButton.component';
import { SIZE_CHART_POPUP_ID } from './SizeChartButton.config';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartButton/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({});

/** @namespace MagearabScandipwaSizechart/Component/SizeChartButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showPopup: (payload) => dispatch(showPopup(SIZE_CHART_POPUP_ID, payload))
});

/** @namespace MagearabScandipwaSizechart/Component/SizeChartButton/Container */
export class SizeChartButtonContainer extends PureComponent {
    static propTypes = {
        showPopup: PropTypes.func.isRequired,
        product: ProductType.isRequired
    };

    containerFunctions = {
        onSizeChartButtonClick: this.onSizeChartButtonClick.bind(this)

    };

    onSizeChartButtonClick() {
        const { showPopup } = this.props;
        showPopup({ title: __('Size Chart') });
    }

    containerProps() {
        const { product } = this.props;
        const { size_chart } = product;
        if (!size_chart) {
            return [];
        }

        return {
            sizeChart: size_chart
        };
    }

    render() {
        return (
            <SizeChartButtonComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SizeChartButtonContainer);
