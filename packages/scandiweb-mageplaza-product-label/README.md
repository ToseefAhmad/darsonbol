## Features
### Supported display locations

The following display locations are supported:

* Label display on product page
* Label display on category page
* Optional label display in related, cross-sell and up-sell products

### Unsupported display locations

The following display locations are not supported:

* Label display as a standalone widget

### Supported features

The following features are supported:

* Stock status label display – will show only one selected stock status label if applicable, ignoring the other rules (which is different from original implementation).
* Label template expression support:
    * `{{discount}}`
    * `{{discount_percent}}`
    * `{{current_price}}`
    * `{{attribute_code}}`
* Matching appearance – label position, font, font-size, color, custom CSS and pre-installed template support
* Google Fonts – automatic loading of fonts from Google Fonts on demand
* Optional tooltips

## Configuration

Please note that this extension requires the original Mageplaza Product Labels extension to function. It can be obtained from the [official marketplace](https://www.mageplaza.com/magento-2-product-labels/). To configure the extension, follow the [official instructions](https://docs.mageplaza.com/product-labels/index.html#ii-how-to-configure).

## Development

Due to original extension limitations, the extension might cause a significant decrease in performance. This is caused by inefficient implementation of the original resolver, and lack of proper bulk methods. It would be preferable to refactor it to use BatchResolverContracts or similar pattern.

Multiple bugs of the original extension were resolved:

* Display of out-of-stock labels for product that are salable
* Incorrect execution of limiting function – cutting down on product labels before processing them
* Lack of attributes loaded on a product model, which led to improper validation of rules