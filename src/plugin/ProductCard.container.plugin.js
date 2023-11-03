/*
 * Copyright (c) 2022. Shaymaa Saied
 */

/**  @namespace SonbolPwa/Plugin/ProductCardContainerPlugin/defaultProps */
const defaultProps = (originalMember) => ({
    ...originalMember,
    hideCompareButton: true
});

export default {
    'Component/ProductCard/Container': {
        'static-member': {
            defaultProps
        }
    }
};
