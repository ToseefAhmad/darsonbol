/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { CROSS_SELL, RELATED, UPSELL } from 'Store/LinkedProducts/LinkedProducts.reducer';
import { RefType } from 'Type/Common.type';
import { ProductType } from 'Type/ProductList.type';

import { processLabel } from '../../util/ProductLabels';
import ProductLabels from './ProductLabels.component';

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabels/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isShowLabelsRelatedProducts: !!state.ConfigReducer.mpProductLabelsConfig?.isShowLabelsRelatedProducts,
    isShowLabelsUpsellProducts: !!state.ConfigReducer.mpProductLabelsConfig?.isShowLabelsUpsellProducts,
    isShowLabelsCrossSellProducts: !!state.ConfigReducer.mpProductLabelsConfig?.isShowLabelsCrossSellProducts
});

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabels/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabels/Container */
export class ProductLabelsContainer extends PureComponent {
    static propTypes = {
        isProductPage: PropTypes.bool,
        linkType: PropTypes.string,
        product: ProductType.isRequired,
        imageRef: RefType,
        isShowLabelsRelatedProducts: PropTypes.bool.isRequired,
        isShowLabelsUpsellProducts: PropTypes.bool.isRequired,
        isShowLabelsCrossSellProducts: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isProductPage: false,
        linkType: '',
        imageRef: () => {}
    };

    containerFunctions = {};

    componentDidMount() {
        document.addEventListener('resize', this.forceUpdate);
    }

    componentWillUnmount() {
        document.removeEventListener('resize', this.forceUpdate);
    }

    __construct(props) {
        super.__construct(props);
    }

    updateImageDimensions() {
        const { imageRef } = this.props;

        if (!imageRef || !imageRef.current) {
            return;
        }

        this.imgW = imageRef.current.offsetWidth;
        this.imgH = imageRef.current.offsetHeight;
    }

    containerProps() {
        return {
            labels: this.getLabels()
        };
    }

    getLabels() {
        const {
            product,
            isProductPage,
            linkType,
            isShowLabelsRelatedProducts,
            isShowLabelsUpsellProducts,
            isShowLabelsCrossSellProducts
        } = this.props;

        const { mp_label_data } = product;

        if (
            // vvv Make sure the data is loaded
            !mp_label_data
            // vvv Check if link type does not match
            || (linkType === CROSS_SELL && !isShowLabelsCrossSellProducts)
            || (linkType === RELATED && !isShowLabelsRelatedProducts)
            || (linkType === UPSELL && !isShowLabelsUpsellProducts)
        ) {
            return [];
        }

        // vvv Wait for target image to render
        this.updateImageDimensions();

        return mp_label_data.map((labelData) => processLabel(
            labelData,
            this.imgW,
            this.imgH,
            product,
            isProductPage
        ));
    }

    render() {
        return (
            <ProductLabels
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLabelsContainer);
