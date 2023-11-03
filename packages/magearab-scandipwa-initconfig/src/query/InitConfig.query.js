/*
 * Copyright (c) 2022. Shaymaa Saied
 */

// import { Field } from 'Util/Query';

import { Field } from '@scandipwa/scandipwa/src/util/Query';

/** @namespace MagearabScandipwaInitconfig/Query/InitConfig/Query */
export class InitConfigQuery {
    getQuery() {
        // TODO implement query
        return new Field('Configurations')
            .addFieldList(this._getConfigurationFields());
    }

    _getConfigurationFields() {
        return [
            'homepage',
            'app_icon',
            'app_logo',
            'app_name',
            'app_white_logo',
            'intro_media',
            new Field('color_schema').addFieldList([
                'key',
                'value'
            ]),
            new Field('contact_us').addFieldList([
                'key',
                'value'
            ]),
            new Field('social_accounts').addFieldList([
                'key',
                'value'
            ]),
            new Field('static_pages').addFieldList([
                'label',
                'value'
            ])
        ];
    }
}

export default new InitConfigQuery();
