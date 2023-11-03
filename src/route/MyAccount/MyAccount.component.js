/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import { Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import MyAccountInformation from 'Component/MyAccountInformation';
import MyAccountOrder from 'Component/MyAccountOrder';
import MyAccountTabList from 'Component/MyAccountTabList';
import {
    MyAccount as SourceMyAccount,
    MyAccountAddressBook as SourceMyAccountAddressBook,
    MyAccountDashboard as SourceMyAccountDashboard,
    MyAccountDownloadable as SourceMyAccountDownloadable,
    MyAccountMyOrders as SourceMyAccountMyOrders,
    MyAccountMyWishlist as SourceMyAccountMyWishlist,
    MyAccountNewsletterSubscription as SourceMyAccountNewsletterSubscription
} from 'SourceRoute/MyAccount/MyAccount.component';
import {
    ACCOUNT_INFORMATION,
    // ActiveTabType,
    ADDRESS_BOOK,
    CustomerType, MY_ACCOUNT,
    MY_DOWNLOADABLE,
    MY_ORDER,
    MY_ORDERS,
    MY_WISHLIST,
    NEWSLETTER_SUBSCRIPTION,
    ORDER_RETURNS
    // TabMapType
} from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';

import MyAccountInfoComponent from '../../component/MyAccountInfo';
import MyAccountReturns from '../../component/MyAccountReturns/MyAccountReturns.component';

import './MyAccount.override.style';
// TODO: implement MyAccountAddressBook
export const MyAccountAddressBook = SourceMyAccountAddressBook;

// TODO: implement MyAccountDashboard
export const MyAccountDashboard = SourceMyAccountDashboard;

// TODO: implement MyAccountDownloadable
export const MyAccountDownloadable = SourceMyAccountDownloadable;

// TODO: implement MyAccountMyOrders
export const MyAccountMyOrders = SourceMyAccountMyOrders;

// TODO: implement MyAccountMyWishlist
export const MyAccountMyWishlist = SourceMyAccountMyWishlist;

// TODO: implement MyAccountNewsletterSubscription
export const MyAccountNewsletterSubscription = SourceMyAccountNewsletterSubscription;

/** @namespace SonbolPwa/Route/MyAccount/Component */
export class MyAccountComponent extends SourceMyAccount {
    // TODO implement logic
    static propTypes = {
        customer: CustomerType.isRequired
    };
    renderMap = {
        [MY_ACCOUNT]: MyAccountDashboard,
        [MY_ORDER]: MyAccountOrder,
        [MY_ORDERS]: MyAccountMyOrders,
        [MY_WISHLIST]: MyAccountMyWishlist,
        [ADDRESS_BOOK]: MyAccountAddressBook,
        [NEWSLETTER_SUBSCRIPTION]: MyAccountNewsletterSubscription,
        [MY_DOWNLOADABLE]: MyAccountDownloadable,
        [ACCOUNT_INFORMATION]: MyAccountInformation,
        [ORDER_RETURNS]: MyAccountReturns
    };
    renderContent() {
        const {
            activeTab,
            tabMap,
            changeActiveTab,
            onSignOut,
            isEditingActive,
            match,
            changeTabName,
            // tabName,
            setTabSubheading
        } = this.props;

        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        const TabContent = this.getTabContent();
        // const { title } = tabMap[activeTab];
        const { /* customer */ isMobile } = this.props;
        const tabsContent = !isMobile ? (
            <MyAccountTabList
              isMobile={ isMobile }
              tabMap={ tabMap }
              activeTab={ activeTab }
              changeActiveTab={ changeActiveTab }
              onSignOut={ onSignOut }
            />
        ) : null;

        return (
            <ContentWrapper
              label={ __('My Account page') }
              wrapperMix={ { block: 'MyAccount', elem: 'Wrapper' } }
            >
                <div block="MyAccount" elem="Sidebar">
                    { tabsContent }
                    { !isMobile || activeTab === 'my-account' ? <MyAccountInfoComponent /> : null }
                </div>
                <div
                  block="MyAccount"
                  elem="TabContent"
                  mods={ { activeTab } }
                >
                    { /* <h2 block="MyAccount" elem="Heading">
                        { title || tabName }
                        { this.renderSubHeading() }
                    </h2> */ }
                    <Suspense fallback={ <Loader /> }>
                        <TabContent
                          isEditingActive={ isEditingActive }
                          match={ match }
                          changeTabName={ changeTabName }
                          setTabSubheading={ setTabSubheading }
                        />
                    </Suspense>
                </div>
            </ContentWrapper>
        );
    }

    render() {
        return (
            <main block="MyAccount">
                { this.renderContent() }
            </main>
        );
    }
}

export default MyAccountComponent;
