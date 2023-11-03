/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import { Field } from '@scandipwa/scandipwa/src/util/Query';

const addSizeChart = (args, callback, instance) => [
    ...callback.apply(instance, args),
    new Field('size_chart').addFieldList([
        'rule_name',
        'description',
        new Field('inch_chart').addFieldList([
            'html'
        ]),
        new Field('cm_chart').addFieldList([
            'html'
        ])
    ])
];
const around_getReviewsField = (args, callback, instance) => [
    instance._getReviewItemsFields()
];

export default {
    'Query/ProductList/Query': {
        'member-function': {
            _getProductInterfaceFields: addSizeChart,
            _getReviewsField: around_getReviewsField
        }
    }
};
