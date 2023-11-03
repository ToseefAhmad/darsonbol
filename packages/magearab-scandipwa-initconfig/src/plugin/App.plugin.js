/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import InitConfigComponent from '../component/InitConfig';

const renderRootComponents = (args, callback) => (
    <InitConfigComponent>
        { callback(...args) }
    </InitConfigComponent>
);

export default {
    'Component/App/Component': {
        'member-function': {
            renderRootComponents
        }
    }
};
