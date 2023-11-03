/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Children, cloneElement } from 'react';

import ProductLabels from '../../component/ProductLabels';

const addLabelToGallery = (args, callback, instance) => {
    const { product } = instance.props;

    const wrapper = callback(...args);

    return cloneElement(
        wrapper,
        wrapper.props,
        Children.map(wrapper.props.children, (cChild, i) => {
            if (i !== 0) {
                return cChild;
            }

            return (
                <>
                    { cChild }
                    <ProductLabels
                      isProductPage
                      product={ product }
                        // vvv Hack to avoid passing ref to gallery
                      imageRef={ { current: document.querySelector('.ProductGallery-SliderWrapper') } }
                    />
                </>
            );
        })
    );
};

const addLabelDataToProps = (args, callback, instance) => {
    const { product } = instance.props;

    return {
        ...callback(...args),
        product
    };
};

export default {
    'Component/ProductGallery/Component': {
        'member-function': {
            renderSlider: addLabelToGallery
        }
    },
    'Component/ProductGallery/Container': {
        'member-function': {
            containerProps: addLabelDataToProps
        }
    }
};
