/*
 * Copyright (c) 2022. Shaymaa Saied
 */

const defaultProps = (originalMember) => ({
    ...originalMember,
    isContentExpanded: false
});

export default {
    'Component/CategoryConfigurableAttributes/Container': {
        'static-member': {
            defaultProps
        }
    }
};
