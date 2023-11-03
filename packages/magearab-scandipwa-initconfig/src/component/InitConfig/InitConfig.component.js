/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Colors from '../../util/Colors';
/** @namespace MagearabScandipwaInitconfig/Component/InitConfig/Component */
export class InitConfigComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        colors: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
        }))
        // eslint-disable-next-line react/destructuring-assignment
    };

    static defaultProps = {
        colors: []
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    renderColorsSchema() {
        const { colors } = this.props;
        if (colors.length > 0) {
            colors.forEach((color) => {
                if (color.value !== null) {
                    const property = `imported_${ color.key }`;
                    Colors.setColor(property, color.value);
                }
            });
        }
    }

    render() {
        const { children } = this.props;
        this.renderColorsSchema()
        return (<div block="InitConfig">{ children }</div>);
    }
}
export default InitConfigComponent;
