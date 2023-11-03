/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';

export const SizeChartType = PropTypes.shape({
    ruleName: PropTypes.string,
    productId: PropTypes.string,
    inch_chart: PropTypes.objectOf(PropTypes.string),
    cm_chart: PropTypes.objectOf(PropTypes.string),
    description: PropTypes.string

});
