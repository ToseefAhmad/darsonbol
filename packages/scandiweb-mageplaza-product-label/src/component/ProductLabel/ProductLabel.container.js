/**
 * Mageplaza Product Label compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ProductLabel from './ProductLabel.component';

/** @namespace Scandiweb/MageplazaProductLabel/Component/ProductLabel/Container */
export class ProductLabelContainer extends PureComponent {
    static propTypes = {
        linkType: PropTypes.string,
        ruleId: PropTypes.string.isRequired,
        fontUrl: PropTypes.string.isRequired,
        productId: PropTypes.string.isRequired,
        tooltipId: PropTypes.string.isRequired,
        positionStyle: PropTypes.objectOf(PropTypes.string).isRequired,
        textStyle: PropTypes.objectOf(PropTypes.string).isRequired,
        customCss: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        tooltipLabel: PropTypes.string.isRequired
    };

    static defaultProps = {
        linkType: ''
    };

    containerFunctions = {
        onImageLoad: this.onImageLoad.bind(this)
    };

    componentDidMount() {
        this.addStyleScript();
        this.addFontImport();
    }

    componentWillUnmount() {
        this.removeStyleScript();
    }

    __construct(props) {
        super.__construct(props);

        const { imageSrc } = props;

        this.state = {
            isLoaded: !imageSrc
        };
    }

    onImageLoad() {
        this.setState({ isLoaded: true });
    }

    addFontImport() {
        const { fontUrl } = this.props;
        const oldFontImport = document.querySelector(`[href="${fontUrl}"]`);

        if (oldFontImport) {
            return;
        }

        const fontImport = document.createElement('link');
        fontImport.href = fontUrl;
        fontImport.rel = 'stylesheet';
        document.head.appendChild(fontImport);
    }

    addStyleScript() {
        const { customCss } = this.props;

        if (!customCss) {
            return;
        }

        this.style = document.createElement('style');
        this.style.innerHTML = customCss;
        document.head.appendChild(this.style);
    }

    removeStyleScript() {
        if (!this.style) {
            return;
        }

        this.style.remove();
    }

    containerProps() {
        const { isLoaded } = this.state;

        const {
            linkType,
            ruleId,
            productId,
            positionStyle,
            textStyle,
            imageSrc,
            label,
            tooltipLabel
        } = this.props;

        return {
            isLoaded,
            linkType,
            ruleId,
            productId,
            positionStyle,
            textStyle,
            imageSrc,
            label,
            tooltipLabel
        };
    }

    render() {
        return (
            <ProductLabel
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductLabelContainer;
