/*
 * Copyright (c) 2022. Shaymaa Saied
 */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import SizeChartPopupComponent from './SizeChartPopup.component';
import { SizeChartType } from '../../type/SizeChart.type';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartPopup/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({});

/** @namespace MagearabScandipwaSizechart/Component/SizeChartPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace MagearabScandipwaSizechart/Component/SizeChartPopup/Container */
export class SizeChartPopupContainer extends PureComponent {
    static propTypes = {
        sizeChart: SizeChartType.isRequired
    };

    containerProps() {
        const {
            sizeChart
        } = this.props;

        return {
            sizeChart
        };
    }

    render() {
        return (
            <SizeChartPopupComponent
              { ...this.containerProps() }
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SizeChartPopupContainer)
