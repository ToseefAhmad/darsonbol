import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgRowComponent */
export class AgRowComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { children, cObject } = this.props;
        return (
            <Grid
              container
              justify="center"
              columnSpacing={ 1 }
              rowSpacing={ 1 }
              componenttype={ cObject.component_type }
            >
                { children }
            </Grid>
        );
    }
}

export default new AgRowComponent();
