/* eslint-disable max-len */
import Carousel from 'react-multi-carousel';

import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import {
    ProductLinks as SourceProductLinks
} from 'SourceComponent/ProductLinks/ProductLinks.component';

import 'react-multi-carousel/lib/styles.css';

/** @namespace SonbolPwa/Component/ProductLinks/Component */
export class ProductLinksComponent extends SourceProductLinks {
    renderProductCard(product, i) {
        const {
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            },
            productCardFunctions: {
                setSiblingsHaveBrands,
                setSiblingsHavePriceBadge,
                setSiblingsHaveTierPrice,
                setSiblingsHaveConfigurableOptions
            }
        } = this.props;
        const { id = i } = product;

        return (
            <ProductCard
              block="ProductLinks"
              elem="Card"
              product={ product }
              key={ id }
              siblingsHaveBrands={ siblingsHaveBrands }
              siblingsHavePriceBadge={ siblingsHavePriceBadge }
              siblingsHaveTierPrice={ siblingsHaveTierPrice }
              siblingsHaveConfigurableOptions={ siblingsHaveConfigurableOptions }
              setSiblingsHaveBrands={ setSiblingsHaveBrands }
              setSiblingsHavePriceBadge={ setSiblingsHavePriceBadge }
              setSiblingsHaveTierPrice={ setSiblingsHaveTierPrice }
              setSiblingsHaveConfigurableOptions={ setSiblingsHaveConfigurableOptions }
            />
        );
    }

    renderItems() {
        const {
            linkType,
            linkedProducts: { [linkType]: { items } },
            numberOfProductsToDisplay,
            isMobile
        } = this.props;

        if (!items) {
            return Array.from(
                { length: numberOfProductsToDisplay },
                (_, i) => this.renderProductCard({}, i)
            );
        }

        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 6
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 6
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2,
                partialVisibilityGutter: 30
            }
        };

        return (
            <Carousel partialVisbile={ !!isMobile } responsive={ responsive } itemClass="carousel-item-padding-px" rtl infinite>
                { items.map(this.renderProductCard) }
            </Carousel>
        );
    }

    renderHeading() {
        const { title } = this.props;

        return (
            <h2 block="ProductLinks" elem="Title">
                { title }
            </h2>
        );
    }
    render() {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              mix={ { block: 'ProductLinks' } }
              wrapperMix={ { block: 'ProductLinks', elem: 'Wrapper' } }
              label={ __('Linked products') }
            >
                { this.renderHeading() }
                <ul block="ProductLinks" elem="List">
                    { this.renderItems() }
                </ul>
            </ContentWrapper>
        );
    }
}
export default ProductLinksComponent;
