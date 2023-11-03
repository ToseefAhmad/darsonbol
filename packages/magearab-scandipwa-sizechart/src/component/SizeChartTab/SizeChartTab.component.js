/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { noopFn } from 'Util/Common';

import './SizeChartTab.style.scss';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartTab/Component */
export class SizeChartTabComponent extends PureComponent {
    static propTypes = {
        tabName: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        isActive: PropTypes.bool
    };

    static defaultProps = {
        onClick: noopFn,
        isActive: false
    };

    onClick = this.onClick.bind(this);

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    onClick() {
        const { onClick, tabName } = this.props;
        onClick(tabName);
    }

    render() {
        const { tabName, isActive } = this.props;

        return (
            <li
              block="SizeChartTab"
              elem="Item"
              mods={ { isActive } }
            >
                <button
                  mix={ { block: 'SizeChartTab', elem: 'Button' } }
                  onClick={ this.onClick }
                >
                    { tabName.toUpperCase() }
                </button>
            </li>
        );
    }
}

export default SizeChartTabComponent;
