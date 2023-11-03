/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import { PureComponent } from 'react';

import Html from 'Component/Html';
import Popup from 'Component/Popup';

import { SizeChartType } from '../../type/SizeChart.type';
import { SIZE_CHART_POPUP_ID,SIZE_CM, SIZE_INCH } from '../SizeChartButton/SizeChartButton.config';
import SizeChartTabsComponent from '../SizeChartTabs/SizeChartTabs.component';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartPopup/Component */
export class SizeChartPopupComponent extends PureComponent {
    static propTypes = {
        sizeChart: SizeChartType.isRequired
    };

    tabMap = {
        [SIZE_INCH]: {
            name: __('Size in Inch'),
            render: (key) => this.renderSizeInchTab(key)
        },
        [SIZE_CM]: {
            name: __('Size in CM'),
            render: (key) => this.renderSizeCMTab(key)
        }
    };

    renderSizeInchTab(key) {
        const { sizeChart } = this.props;
        if (!sizeChart) {
            return;
        }
        const inchSize = sizeChart.inch_chart.html;

        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line consistent-return
        if (!inchSize) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return (
            <div
              block="SizeChartPopup"
              key={ key }
              elem="Item"
            >
                <Html content={ inchSize } />
            </div>
        );
    }

    renderSizeCMTab(key) {
        const { sizeChart } = this.props;
        if (!sizeChart) {
            return;
        }
        const cmSize = sizeChart.cm_chart.html;

        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line consistent-return
        if (!cmSize) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return (
            <div
              block="SizeChartPopup"
              key={ key }
              elem="Item"
            >
                <Html content={ cmSize } />
            </div>
        );
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    shouldTabsRender() {
        return Object.entries(this.tabMap)
            .map(([id, values]) => ({ id, ...values }));
    }

    renderSizeTabs() {
        const tabs = this.shouldTabsRender();

        if (!tabs) {
            return null;
        }

        return (
            <SizeChartTabsComponent tabs={ tabs } />
        );
    }

    render() {
        return (
            <Popup
              id={ SIZE_CHART_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'SizeChartPopup' } }
            >
                <>
                    { this.renderSizeTabs() }
                </>
            </Popup>
        );
    }
}
export default SizeChartPopupComponent;
