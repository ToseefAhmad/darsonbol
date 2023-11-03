/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';

import { ProcessedLabelsType } from '../../type/LabelData.type';
import ProductLabel from '../ProductLabel';

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabels/Component */
export class ProductLabelsComponent extends PureComponent {
    static propTypes = {
        labels: ProcessedLabelsType.isRequired
    };

    renderLabel = (labelData) => {
        const {
            ruleId,
            productId,
            positionStyle,
            textStyle,
            customCss,
            imageSrc,
            label,
            tooltipLabel,
            fontUrl
        } = labelData;

        return (
            <ProductLabel
              key={ `${productId}_${ruleId}` }
              ruleId={ ruleId }
              productId={ productId }
              positionStyle={ positionStyle }
              textStyle={ textStyle }
              customCss={ customCss }
              imageSrc={ imageSrc }
              label={ label }
              fontUrl={ fontUrl }
              tooltipLabel={ tooltipLabel }
            />
        );
    };

    renderLabels() {
        const { labels } = this.props;
        return labels.map(this.renderLabel);
    }

    render() {
        return this.renderLabels();
    }
}

export default ProductLabelsComponent;
