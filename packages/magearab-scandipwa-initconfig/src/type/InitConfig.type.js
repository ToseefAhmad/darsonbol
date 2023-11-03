/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import PropTypes from 'prop-types';

export const Contacts = PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
}));

export const SocialAccounts = PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
}));

export const StaticPages = PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
}));
