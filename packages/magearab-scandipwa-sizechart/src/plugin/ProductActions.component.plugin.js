/*
 * Copyright (c) 2022. Shaymaa Saied
 */

// import ProductLabels
// from '../../../scandiweb-mageplaza-product-label/src/component/ProductLabels/ProductLabels.container';
import SizeChartButton from '../component/SizeChartButton';

/** @namespace MagearabScandipwaSizechart/Plugin/ProductActionsComponentPlugin/Component */
export class ProductActionsComponent {
    aroundRenderDesktop = (args, callback, instance) => {
        const { product } = instance.props;
        return (
            <>
                { callback(...args) }
                <SizeChartButton
                  product={ product }
                />

            </>
        );
    };
}
// const {
//     aroundRenderDesktop
// } = new ProductActionsComponent();

export const config = {
    'Component/ProductActions/Component': {
        'member-function': {
            // renderDesktop: aroundRenderDesktop
        }
    }
};

export default config;
