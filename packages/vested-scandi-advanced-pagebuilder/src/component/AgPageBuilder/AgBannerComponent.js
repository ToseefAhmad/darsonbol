import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgBannerComponent */
export class AgBannerComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { cObject } = this.props;
        const src = cObject.properties?.background_images?.desktop_image
            ?? cObject.properties?.background_images?.mobile_image;
        const mods = src ? { type: 'image' } : {};
        return (
            <Link
              block="BannerArea"
              elem="AgBannerItem"
              to={ window.origin + cObject?.link?.href }
              mods={ mods }
              aria-label={ Object.link?.label }
            >
                <img
                  src={ src }
                  alt={ cObject.link?.label }
                />
            </Link>
        );
    }
}

export default new AgBannerComponent();
