import { Breadcrumb as SourceBreadcrumb } from 'SourceComponent/Breadcrumb/Breadcrumb.component';

import BreadcrumbChevronIconComponent from '../BreadcrumbChevronIcon/BreadcrumbChevronIcon.component';
/** @namespace SonbolPwa/Component/Breadcrumb/Component */
export class BreadcrumbComponent extends SourceBreadcrumb {
    render() {
        const { index } = this.props;

        return (
            <>
                <BreadcrumbChevronIconComponent direction="left" />
                <li
                  block="Breadcrumb"
                  key={ index }
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                >
                    { this.renderLink() }
                </li>
            </>

        );
    }
}

export default BreadcrumbComponent;
