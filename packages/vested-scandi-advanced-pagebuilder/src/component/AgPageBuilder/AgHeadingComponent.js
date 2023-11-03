/* eslint-disable react/forbid-component-props */
import { Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './style.scss';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgHeadingComponent */
export class AgHeadingComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    render() {
        const { cObject } = this.props;
        return (
            <Toolbar variant="dense">
                <Typography
                  className="ag_pagebuilder_heading"
                  variant={ cObject?.properties?.heading_type ?? 'h4' }
                  component={ cObject?.properties?.heading_type ?? 'h4' }
                  gutterBottom
                >
                    { cObject?.value }
                </Typography>
            </Toolbar>
        );
    }
}

export default new AgHeadingComponent();
