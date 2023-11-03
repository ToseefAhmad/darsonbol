/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import {
    ProductConfigurableAttributes as SourceProductConfigurableAttributes
} from 'SourceComponent/ProductConfigurableAttributes/ProductConfigurableAttributes.component';

/** @namespace SonbolPwa/Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributesComponent extends SourceProductConfigurableAttributes {
    renderConfigurableAttributes() {
        const {
            configurable_options,
            isExpandable,
            inStock
        } = this.props;

        return Object.values(configurable_options).map((option) => {
            const {
                attribute_code,
                attribute_label,
                attribute_options,
                attribute_id
            } = option;

            const [{ swatch_data }] = attribute_options ? Object.values(attribute_options) : [{}];
            const isSwatch = !!swatch_data;

            // render content without heading and subheading
            if (!isExpandable) {
                return isSwatch ? this.renderSwatch(option) : this.renderDropdown(option);
            }

            if (!inStock && !isSwatch) {
                return null;
            }

            return (
                <div className={ attribute_code } key={ attribute_id }>
                    <p block="ProductConfigurableAttributes" elem="Title">
                        { attribute_label }
                    </p>
                    { isSwatch ? this.renderSwatch(option) : this.renderDropdown(option) }
                    { attribute_code === 'size' ? <p className="size_paragraph">{ __('Chose the color and size to add to basket') }</p> : null }
                </div>
            );
        });
    }

    render() {
        const { isReady, mix } = this.props;
        return (
            <div
              block="ProductConfigurableAttributes"
              mods={ { isLoading: !isReady } }
              mix={ mix }
            >
                { isReady ? this.renderConfigurableAttributes() : this.renderPlaceholders() }
            </div>
        );
    }
}

export default ProductConfigurableAttributesComponent;
