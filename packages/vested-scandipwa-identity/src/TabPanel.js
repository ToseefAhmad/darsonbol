import { Box } from '@mui/material';
import PropTypes from 'prop-types';

/** @namespace Vested/ScandipwaIdentity/TabPanel/TabPanel */
export default function TabPanel(props) {
    const {
        children, value, index
    } = props;

    return (
        <div
          role="tabpanel"
          hidden={ value !== index }
          id={ `full-width-tabpanel-${index}` }
          aria-labelledby={ `full-width-tab-${index}` }
        >
            { value === index && (
                <Box sx={ { p: 3 } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

TabPanel.propTypes = {
    // eslint-disable-next-line react/require-default-props
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};
