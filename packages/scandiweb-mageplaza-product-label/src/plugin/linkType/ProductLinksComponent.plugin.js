/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Children, cloneElement } from 'react';

const addLinkTypePropToRender = (args, callback, instance) => Children.map(
    callback(...args), (child) => cloneElement(child, {
        linkType: instance.props.linkType
    }, child.props.children)
);

const passLinkTypeToProps = (args, callback, instance) => ({
    ...callback(...args),
    linkType: instance.props.linkType
});

export default {
    'Component/ProductLinks/Component': {
        'member-function': {
            renderProductCard: addLinkTypePropToRender
        }
    },
    'Component/ProductCard/Container': {
        'member-function': {
            containerProps: passLinkTypeToProps
        }
    }
};
