/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import { Field } from 'Util/Query';

/** @namespace MagearabScandipwaTamara/Query/Tamara/Query */
export class TamaraQuery {
    getTamaraConfig() {
        return new Field('tamaraData').addFieldList(this._getTamaraConfigFields());
    }

    _getTamaraConfigFields() {
        return [
            'merchant_token',
            'debug',
            'environment',
            'api_url',
            this._getMethodsField()
        ];
    }

    _getMethodsField() {
        return new Field('methods')
            .addFieldList(this._methodFields());
    }

    _methodFields() {
        return [
            'name',
            'min_limit',
            'max_limit',
            'currency',
            'number_of_instalments',
            'description'
        ];
    }
}
export default new TamaraQuery();
