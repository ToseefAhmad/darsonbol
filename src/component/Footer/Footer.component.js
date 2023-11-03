/* eslint-disable max-len */
import PropTypes from 'prop-types';

import ContentWrapper from 'Component/ContentWrapper';
import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import Logo from 'Component/Logo';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import {
    Footer as SourceFooter
} from 'SourceComponent/Footer/Footer.component';
import history from 'Util/History';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

// eslint-disable-next-line max-len
import { Contacts, SocialAccounts, StaticPages } from '../../../packages/magearab-scandipwa-initconfig/src/type/InitConfig.type';
import {
    APPS_LOGOS, CONTACTS_COLUMNS,
    NEWSLETTER_COLUMN, PAYMENT_METHODS,
    SOCIAL_COLUMN, SOCIAL_ICONS, STATIC_PAGES_COLUMN
} from './Footer.config';

import './Footer.override.style';

/** @namespace SonbolPwa/Component/Footer/Component */
export class FooterComponent extends SourceFooter {
    // TODO implement logic
    static propTypes = {
        contacts: Contacts,
        socialAccounts: SocialAccounts,
        staticPages: StaticPages,
        iconPath: PropTypes.string,
        app_white_logo: PropTypes.string,
        app_alt: PropTypes.string,
        logo_height: PropTypes.number,
        isCheckout: PropTypes.bool.isRequired,
        logo_width: PropTypes.number
    };
    static defaultProps = {
        contacts: [],
        socialAccounts: [],
        staticPages: [],
        iconPath: '/static/media/',
        app_white_logo: '',
        logo_alt: '',
        logo_height: 80,
        logo_width: 200
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    checkIsCheckout() {
        const {
            location: {
                pathname
            }
        } = history;

        const isCheckout = pathname.includes(CHECKOUT_URL);
        return { isCheckout };
    }
    renderLogoImage() {
        const {
            app_white_logo,
            logo_alt
        } = this.props;

        // if no src defined from the backend, pass null in order to display placeholder
        // and prevent unnecessary load of corrupted resource
        const logoSrc = app_white_logo ? media(app_white_logo, LOGO_MEDIA) : null;
        return (
            <Logo
              src={ logoSrc }
              alt={ logo_alt }
              title={ logo_alt }
            />
        );
    }
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    getSocialItems() {
        const { socialAccounts } = this.props;
        const items = [];
        Array.from(socialAccounts).forEach((account) => {
            const found = SOCIAL_ICONS.icons.find((obj) => obj.key === account.key);

            if (found !== undefined) {
                if (account.value !== null) {
                    items.push({
                        href: account.value,
                        src: found.value,
                        title: __(account.key)
                    });
                }
            }
        });

        return items;
    }
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    getStaticPages() {
        const { staticPages } = this.props;
        const items = [];
        Array.from(staticPages).forEach((page) => {
            if (page.value !== null) {
                items.push({
                    href: page.value,
                    title: __(page.label)
                });
            }
        });

        return items;
    }
    renderCopyrightContent() {
        const { copyright } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'Footer', elem: 'CopyrightContentWrapper' } }
              wrapperMix={ { block: 'Footer', elem: 'CopyrightContent' } }
              label=""
            >
                <span block="Footer" elem="Copyright">
                    { copyright }
                </span>
            </ContentWrapper>
        );
    }
    renderTopFooter() {
        return (
            <div block="Footer" elem="TopContent">
                { this.renderContacts() }
                { this.renderFollowNewsLetter() }
            </div>
        );
    }
    renderCustomColumn(column, i) {
        const {
            title,
            value,
            icon,
            mods = {}
        } = column;
        const { contacts } = this.props;
        const val = contacts.find((obj) => obj.key === value);
        return (
            <div block="Footer" elem="Column" mods={ mods } key={ i }>
                <h4 block="Footer" elem="ColumnTitle">
                    { icon }
                    { title }
                </h4>
                <div
                  block="Footer"
                  elem="ColumnContent"
                >
                    { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                    <span>{ val ? val.value : '' }</span>
                </div>
            </div>
        );
    }
    renderContacts() {
        return (
            <div block="Footer" elem="Contacts">
                <ContentWrapper
                  isNotSection
                  wrapperMix={ { block: 'Footer', elem: 'Columns' } }
                  label=""
                >
                    <div block="Footer" elem="Column sptcolum">
                        <h4 block="Footer" elem="ContactTitle">{ __('do you need help ?') }</h4>
                        <div className="conflow">{ __('Contact us through any of the following support channels') }</div>
                    </div>
                    { CONTACTS_COLUMNS.items.map((item) => (
                        this.renderCustomColumn(item)
                    )) }
                </ContentWrapper>
            </div>
        );
    }
    renderFollowNewsLetter() {
        SOCIAL_COLUMN.items = this.getSocialItems();
        return (
            <div block="Footer" elem="SocialAccounts">
                <ContentWrapper
                  isNotSection
                  wrapperMix={ { block: 'Footer', elem: 'Columns' } }
                >
                    <div block="Footer" elem="ContentHorizontalTitle NewsletterBlock">
                        { this.renderColumn(NEWSLETTER_COLUMN) }
                    </div>
                    <div block="Footer" elem="ContentHorizontalTitle">
                        { this.renderColumn(SOCIAL_COLUMN) }
                    </div>
                </ContentWrapper>
            </div>
        );
    }
    renderColumnItemContent(src, title, ratio) {
        if (!src) {
            return title;
        }

        return (
            <Image
              mix={ { block: 'Footer', elem: 'ColumnItemImage' } }
              src={ src }
              ratio={ ratio }
            />
        );
    }

    renderColumnItemLink({
        href = '/', title, src, ratio
    }, i) {
        const mods = src ? { type: 'image' } : {};

        return (
            <Link
              block="Footer"
              elem="ColumnItem"
              to={ href }
              mods={ mods }
              key={ i }
              aria-label={ title }
            >
                { this.renderColumnItemContent(src, title, ratio) }
            </Link>
        );
    }
    renderLogoApps(column) {
        const {
            title,
            items,
            isItemsHorizontal,
            mods = {}
        } = column;
        const contentMods = isItemsHorizontal ? { direction: 'horizontal' } : {};

        return (
            <div block="Footer" elem="AppsLogos">
                <div block="Footer" elem="Column" mods={ mods }>
                    <h3 block="Footer" elem="ColumnTitle">
                        { title }
                    </h3>
                    <div
                      block="Footer"
                      elem="ColumnContent"
                      mods={ contentMods }
                    >
                        { items.map(this.renderColumnItem.bind(this)) }
                    </div>
                </div>
            </div>
        );
    }
    renderFooterContent() {
        STATIC_PAGES_COLUMN.items = this.getStaticPages();
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return this.renderCmsBlockWrapper();
        }

        return (
            <div block="Footer" elem="Content">
                <ContentWrapper
                  isNotSection
                  wrapperMix={ { block: 'Footer', elem: 'Columns' } }
                  label=""
                >
                    { this.renderColumn(STATIC_PAGES_COLUMN) }
                    { this.renderLogoImage() }
                </ContentWrapper>
                <ContentWrapper
                  isNotSection
                  wrapperMix={ { block: 'Footer', elem: 'Columns nopdhere' } }
                  label=""
                >
                    <div block="Footer" elem="ContentHorizontalTitle">
                        { this.renderColumn(PAYMENT_METHODS) }
                    </div>
                    <div block="Footer" elem="AppsLogos">
                        { this.renderColumn(APPS_LOGOS) }
                    </div>
                </ContentWrapper>
            </div>
        );
    }
    render() {
        const { isVisibleOnMobile, device } = this.props;

        if (!isVisibleOnMobile && device.isMobile) {
            return null;
        }

        if (isVisibleOnMobile && !device.isMobile) {
            return null;
        }

        this.checkIsCheckout();
        const { staticPages } = this.props;

        return (
            /* eslint max-lines: off */
            <footer block="Footer" aria-label="Footer">
                <Loader isLoading={ !staticPages.length } />
                { this.renderTopFooter() }
                { this.renderFooterContent() }
                { this.renderCopyrightContent() }
            </footer>
        );
    }
}

export default FooterComponent;
