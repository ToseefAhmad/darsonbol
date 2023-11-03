/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import {
    Breadcrumbs as SourceBreadcrumbs
} from 'SourceComponent/Breadcrumbs/Breadcrumbs.component';
import { appendWithStoreCode } from 'Util/Url';

import homeImageIcon from '../../style/icons/Breadcrumbs_png/home.png';

// import BreadcrumbsLeftArrowComponent from '../BreadcrumbsLeftArrow/BreadcrumbsLeftArrow.component';
import './Breadcrumbs.override.style';
/** @namespace SonbolPwa/Component/Breadcrumbs/Component */
export class BreadcrumbsComponent extends SourceBreadcrumbs {
    renderBreadcrumbList(breadcrumbs) {
        const breadcrumbsWithHome = [
            ...breadcrumbs,
            // Looks like a browser bug, temporary fixed with .toString()
            { url: '/', name: __('Home').toString() }
        ];

        return (
            <div className="Crumbs-wrapper">

                <div className="Crumbs-wrapper__icon">
                    <Link to="/">
                    <img className="Crumbs-wrapper__img" src={ homeImageIcon } alt="homeIcon" />
                    </Link>
                </div>

                { breadcrumbsWithHome.map((_, i) => this.renderBreadcrumb(
                    breadcrumbsWithHome[breadcrumbsWithHome.length - 1 - i], i
                )) }
            </div>
        );
    }

    render() {
        const { breadcrumbs, areBreadcrumbsVisible } = this.props;

        if (
            !areBreadcrumbsVisible
            || location.pathname === appendWithStoreCode('/')
            || location.pathname.match(appendWithStoreCode('/account'))
            || location.pathname === '/'
        ) {
            return null;
        }

        return (
            <ContentWrapper mix={ { block: 'Breadcrumbs' } } label={ __('Breadcrumbs (current location)...') }>
                <nav aria-label="Breadcrumbs navigation">
                    <ul
                      block="Breadcrumbs"
                      elem="List"
                      itemScope
                      itemType="http://schema.org/BreadcrumbList"
                    >
                        { (
                            breadcrumbs.length
                                ? this.renderBreadcrumbList(breadcrumbs)
                                : this.renderBreadcrumb({}, 0)
                        ) }
                    </ul>
                </nav>
            </ContentWrapper>
        );
    }
}

export default BreadcrumbsComponent;
