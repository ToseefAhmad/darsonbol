/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CROSS_SELL } from 'Store/LinkedProducts/LinkedProducts.reducer';

import './ProductLabel.style';

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabel/Component */
export class ProductLabelComponent extends PureComponent {
    static propTypes = {
        linkType: PropTypes.string.isRequired,
        ruleId: PropTypes.string.isRequired,
        productId: PropTypes.string.isRequired,
        positionStyle: PropTypes.objectOf(PropTypes.string).isRequired,
        textStyle: PropTypes.objectOf(PropTypes.string).isRequired,
        imageSrc: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        tooltipLabel: PropTypes.string.isRequired,
        onImageLoad: PropTypes.func.isRequired,
        isLoaded: PropTypes.bool.isRequired
    };

    renderTooltip() {
        const { tooltipLabel, linkType } = this.props;
        const isCrossSell = linkType === CROSS_SELL;

        if (!tooltipLabel) {
            return null;
        }

        return (
            <div
              className={ `mp-tooltip label ${!isCrossSell && 'mp-tooltip-show-labels'}` }
            >
                <span className={ `mp-tooltiptext ${!isCrossSell && 'mp-tooltiptext-show-labels'}` }>
                    { tooltipLabel }
                </span>
            </div>
        );
    }

    renderImage() {
        const {
            imageSrc,
            ruleId,
            productId,
            onImageLoad
        } = this.props;

        if (!imageSrc) {
            return null;
        }

        return (
            <img
              id={ `design-label-image-${ruleId}-${productId}` }
              className="mpproductlabel-img-label"
              src={ imageSrc }
              alt={ __('Product Label') }
              onLoad={ onImageLoad }
            />
        );
    }

    renderText() {
        const {
            label,
            textStyle,
            ruleId,
            productId
        } = this.props;

        return (
            <span
              id={ `design-label-text-${ruleId}-${productId}` }
              className="mpproductlabel-text-label"
              style={ textStyle }
            >
                { label }
            </span>
        );
    }

    render() {
        const {
            isLoaded,
            ruleId,
            productId,
            positionStyle
        } = this.props;

        return (
            <div
              id={ `design-labels-${ruleId}-${productId}` }
              className="mpproductlabel-label"
              style={ {
                  ...positionStyle,
                  ...(isLoaded ? {} : { display: 'none' })
              } }
            >
                { this.renderTooltip() }
                { this.renderImage() }
                { this.renderText() }
            </div>
        );
    }
}

export default ProductLabelComponent;
