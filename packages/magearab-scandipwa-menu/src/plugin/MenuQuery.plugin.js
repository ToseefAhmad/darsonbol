/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import { Field } from '@scandipwa/scandipwa/src/util/Query';

const _getMenuItemFields = (args, callback, instance) => [
    ...callback.apply(instance, args),
    new Field('menu_item_content').addFieldList([
        'html'
    ]),
    'menu_image',
    'mobile_icon'
];

export default {
    'Query/Menu/Query': {
        'member-function': {
            _getMenuItemFields
        }
    }
};
