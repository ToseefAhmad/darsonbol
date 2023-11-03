/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import ProductLabels from '../../component/ProductLabels';

const addLabelToPicture = (args, callback, instance) => {
    const { product, linkType } = instance.props;
    // ^^^ linkType is coming from "linkType" plugins
    return (
        <>
            { callback(...args) }
            <ProductLabels
              product={ product }
              linkType={ linkType }
              imageRef={ instance.imageRef }
            />
        </>
    );
};

export default {
    'Component/ProductCard/Component': {
        'member-function': {
            renderPicture: addLabelToPicture
        }
    }
};
