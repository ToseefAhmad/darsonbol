import Image from '@scandipwa/scandipwa/src/component/Image/Image.component';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgIconComponent */
export class AgIconComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { cObject } = this.props;
        return cObject;
    }
}

export default new AgIconComponent();
