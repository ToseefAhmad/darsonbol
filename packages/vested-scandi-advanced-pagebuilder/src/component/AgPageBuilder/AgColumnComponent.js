import { Grid, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgColumnComponent */
export class AgColumnComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    parseGridWidth() {
        // eslint-disable-next-line react/prop-types
        const { cObject } = this.props;
        // eslint-disable-next-line react/prop-types
        // const firstGridWidth = children[0]?.props?.cObject?.properties?.css?.width;
        const firstGridWidth = cObject?.properties?.css?.width;
        // eslint-disable-next-line fp/no-let
        let gridSize = 12;
        if (firstGridWidth) {
            // eslint-disable-next-line fp/no-let
            let percentage = 100;
            const matches = firstGridWidth.match(/calc\((\d+)[%\-\s0-9px]+\)/i);
            if (matches && matches.length > 1 && matches[1]) {
                percentage = matches[1];
            } else {
                percentage = firstGridWidth.toString().replaceAll('%', '').replaceAll('px', '');
                // eslint-disable-next-line no-magic-numbers,no-mixed-operators
                gridSize = Math.round(12 / 100 * percentage);
            }
        }

        return gridSize;
    }

    render() {
        // eslint-disable-next-line react/prop-types
        const { children, cObject } = this.props;
        return (
            <Grid
              item
              xs={ this.parseGridWidth() }
              sm={ this.parseGridWidth() }
              md={ this.parseGridWidth() }
              componenttype={ cObject.component_type }
            >
                <Paper elevation={ 0 } sx={ { marginBottom: 3 } }>
                    { children }
                </Paper>
            </Grid>
        );
    }
}

export default new AgColumnComponent();
