import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import {
    CategorySort as SourceCategorySort
} from 'SourceComponent/CategorySort/CategorySort.component';
/** @namespace SonbolPwa/Component/CategorySort/Component */
export class CategorySortComponent extends SourceCategorySort {
    renderSortField() {
        const {
            sortKey,
            sortDirection,
            selectOptions,
            isMatchingInfoFilter
        } = this.props;

        if (!isMatchingInfoFilter) {
            return this.renderPlaceholder();
        }

        return (
            <Field
              type={ FIELD_TYPE.select }
              attr={ {
                  id: 'category-sort',
                  name: 'category-sort',
                  defaultValue: `${sortDirection} ${sortKey}`,
                  noPlaceholder: true
              } }
              events={ {
                  onChange: this.onChange
              } }
              options={ selectOptions }
              label={ __('Sort') }
              mix={ { block: 'CategorySort', elem: 'Select' } }
            />
        );
    }

    render() {
        return (
            <div block="CategorySort">
                { this.renderSortField() }
            </div>
        );
    }
}

export default CategorySortComponent;
