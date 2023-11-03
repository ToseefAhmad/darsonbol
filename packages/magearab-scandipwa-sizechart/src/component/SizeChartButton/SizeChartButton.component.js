/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { SizeChartType } from '../../type/SizeChart.type';
import RulerIcon from '../RulerIcon';
import SizeChartPopupComponent from '../SizeChartPopup';

import './SizeChartButton.style.scss';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartButton/Component */
export class SizeChartButtonComponent extends PureComponent {
    static propTypes = {
        onSizeChartButtonClick: PropTypes.func.isRequired,
        sizeChart: SizeChartType.isRequired
    };

    renderPopup() {
        const { sizeChart } = this.props;
        return (
            <SizeChartPopupComponent
              sizeChart={ sizeChart }
            />
        );
    }

    renderSizeChartButton() {
        const {
            onSizeChartButtonClick,
            sizeChart
        } = this.props;

        if (sizeChart?.rule_name === null) {
            return;
        }

        return (
            <button
              key="SizeChart"
              block="SizeChartButton"
              elem="Button"
              onClick={ onSizeChartButtonClick }
              aria-label={ __('Size Chart') }
            >
                <RulerIcon />
                <span>{ __('Size Chart') }</span>
            </button>
        );
    }

    render() {
        return (
            <div
              block="SizeChartButton"
              key="sizeChartButton"
            >
                { this.renderSizeChartButton() }
                { this.renderPopup() }
            </div>

        );
    }
}
export default SizeChartButtonComponent;
