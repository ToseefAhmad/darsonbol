/* eslint-disable react/no-array-index-key */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
// import required modules
import {
    FreeMode, Keyboard, Mousewheel, Navigation, Scrollbar
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// import './style.scss';
import ProductCard from 'Component/ProductCard';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/free-mode/free-mode.scss';
import 'swiper/modules/scrollbar/scrollbar.scss';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgProductComponent */
export class AgProductComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    // eslint-disable-next-line react/no-unused-state
    state = { slidePerView: 8 };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        // eslint-disable-next-line no-magic-numbers
        const isMobile = window.innerWidth <= 768;
        // eslint-disable-next-line no-magic-numbers
        const isTablet = window.innerWidth <= 1024;
        // eslint-disable-next-line fp/no-let
        let slidePerView = 6;
        if (isTablet) {
            // eslint-disable-next-line no-magic-numbers
            slidePerView = 3;
        }
        if (isMobile) {
            // eslint-disable-next-line no-magic-numbers
            slidePerView = 2;
        }

        this.setState({
            slidePerView
        });
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { cObject } = this.props;
        const { slidePerView } = this.state;

        return (
            <Swiper
              direction="horizontal"
              slidesPerView={ slidePerView }
              spaceBetween={ 10 }
              freeMode
              mousewheel
              keyboard={ {
                  enabled: true
              } }
              navigation={ {
                  enabled: true
              } }
              modules={ [Keyboard, FreeMode, Scrollbar, Mousewheel, Navigation] }
              className={ cObject.component_type }
            >
                { cObject?.value.items?.map(
                    (item, key) => {
                        /** @var ProductType * */
                        const product = {
                            canonical_url: item.url,
                            special_price: item.final_price,
                            url_key: item.url_key,
                            id: parseFloat(item.entity_id),
                            image: { url: item.image },
                            name: item.name,
                            price_range: {
                                minimum_price: {
                                    final_price: {
                                        value: parseFloat(item.regular_price),
                                        currency: 'SAR'
                                    },
                                    regular_price: {
                                        value: parseFloat(item.final_price),
                                        currency: 'SAR'
                                    }
                                },
                                maximal_price: {
                                    final_price: {
                                        value: parseFloat(item.regular_price),
                                        currency: 'SAR'
                                    },
                                    regular_price: {
                                        value: parseFloat(item.final_price),
                                        currency: 'SAR'
                                    }
                                },
                                discount: {
                                    amount_off: parseFloat(item.discount.amount_off),
                                    percent_off: parseFloat(item.discount.percent_off)
                                }
                            },
                            price: parseFloat(item.regular_price),
                            sku: item.sku,
                            small_image: { url: item.image },
                            thumbnail: { url: item.image, width: '128px', height: '128px' },
                            type_id: 'simple',
                            url: item.url
                        };

                        return (
                            <SwiperSlide key={ key.toString() }>
                                <div style={ { width: 'auto' } }>
                                    <ProductCard
                                      key={ product.id }
                                      product={ product }
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    }
                ) }
            </Swiper>
        );
    }
}

export default new AgProductComponent();
