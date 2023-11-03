/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import { isCrawler, isSSR } from 'Util/Browser';
import { isMobile } from 'Util/Mobile';

import SizeChartTabComponent from '../SizeChartTab/SizeChartTab.component';
import './SizeChartTabs.style.scss';

/** @namespace MagearabScandipwaSizechart/Component/SizeChartTabs/Component */

export class SizeChartTabsComponent extends PureComponent {
    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            render: PropTypes.func.isRequired
        })).isRequired
    };

    onTabClick = this.onTabClick.bind(this);

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component,react/sort-comp
    __construct(props) {
        super.__construct(props);

        const { tabs: [{ id }] } = this.props;

        this.state = {
            activeTab: id
        };
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidUpdate(prevProps) {
        const { tabs: prevTabs } = prevProps;
        const { tabs } = this.props;

        if (prevTabs.length !== tabs.length) {
            const [{ id }] = tabs;
            this.setActiveTab(id);
        }
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    onTabClick(tab) {
        const { tabs } = this.props;
        const { activeTab } = this.state;

        const { id: currentTab } = tabs.find(({ name }) => name === tab);

        if (activeTab !== currentTab) {
            this.setActiveTab(currentTab);
        }
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    setActiveTab(activeTab) {
        this.setState({ activeTab });
    }

    renderActiveTab() {
        const { tabs } = this.props;
        const { activeTab } = this.state;
        const { render } = tabs.find(({ id }) => id === activeTab) || {};

        if (!render) {
            return null;
        }

        return render();
    }

    renderTab(item) {
        const { activeTab } = this.state;
        const { id, name } = item;

        return (
            <SizeChartTabComponent
              tabName={ name }
              key={ id }
              onClick={ this.onTabClick }
              isActive={ id === activeTab }
            />
        );
    }

    renderAllTabs() {
        const { tabs } = this.props;

        return tabs.map(({ render, name }) => render(name));
    }

    renderTabs() {
        const { tabs } = this.props;

        if (isMobile.any() || isSSR() || isCrawler()) {
            return this.renderAllTabs();
        }

        return (
            <>
                <ul block="SizeChartTabs">
                    { tabs.map(this.renderTab.bind(this)) }
                </ul>
                { this.renderActiveTab() }
            </>
        );
    }

    render() {
        return (
            <ContentWrapper
              wrapperMix={ { block: 'SizeChartTabs', elem: 'Wrapper' } }
              label={ __('Size Chart tabs') }
            >
                { this.renderTabs() }
            </ContentWrapper>
        );
    }
}

export default SizeChartTabsComponent;
