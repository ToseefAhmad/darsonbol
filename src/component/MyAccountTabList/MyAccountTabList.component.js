import ExpandableContent from 'Component/ExpandableContent';
import MyAccountTabListItem from 'Component/MyAccountTabListItem';
import {
    MyAccountTabList as SourceMyAccountTabList
} from 'SourceComponent/MyAccountTabList/MyAccountTabList.component';

// import MyAccountReturns from '../MyAccountReturns/MyAccountReturns.component';
import './MyAccountTabList.override.style';

/** @namespace SonbolPwa/Component/MyAccountTabList/Component */
export class MyAccountTabListComponent extends SourceMyAccountTabList {
    // TODO implement logic

    renderTabListItem(tabEntry, index, tabArray) {
        const { activeTab, onTabClick } = this.props;
        const [key, tab] = tabEntry;
        const { section } = tab;
        const nextTab = tabArray[index + 1] || [];
        const { section: nextTabSection = section } = nextTab[1] || {};

        if (key === 'edit' || key === 'my-downloadable') {
            return null;
        }

        return (
            <MyAccountTabListItem
              key={ key }
              isActive={ activeTab === key }
              changeActiveTab={ onTabClick }
              tabEntry={ tabEntry }
            >
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                { nextTabSection !== section ? '' : null }
            </MyAccountTabListItem>
        );
    }

    render() {
        const {
            activeTab,
            isContentExpanded,
            tabMap,
            toggleExpandableContent
        } = this.props;
        const { tabName } = tabMap[activeTab];

        const tabs = Array.from(Object.entries(tabMap).map(this.renderTabListItem.bind(this)));
        return (
            <ExpandableContent
              heading={ tabName }
              isContentExpanded={ isContentExpanded }
              mix={ { block: 'MyAccountTabList' } }
              onClick={ toggleExpandableContent }
              mods={ { isWithoutBorder: true } }
            >
                <ul>
                    { tabs }
                </ul>
            </ExpandableContent>
        );
    }
}

export default MyAccountTabListComponent;
