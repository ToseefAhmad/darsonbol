import { Field } from 'Util/Query';

/**
 * CMS Page Query
 * @class CmsPageQuery
 * @namespace Vested/ScandiAdvancedPagebuilder/Plugin/CmsPage/Query */
export class CmsPageQueryPlugin {
    _getPageFields(args, callback) {
        return [
            ...callback(...args),
            new Field('page_builder').addFieldList([
                'json_encoded'
            ])
        ];
    }
}

// eslint-disable-next-line react/forbid-foreign-prop-types
export const { _getPageFields } = new CmsPageQueryPlugin();

export default {
    'Query/CmsPage/Query': {
        'member-function': {
            _getPageFields: [
                {
                    position: 100,
                    implementation: _getPageFields
                }
            ]
        }
    }
};
