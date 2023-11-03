/* eslint-disable react/no-array-index-key */

import Link from '@scandipwa/scandipwa/src/component/Link';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
// import required modules
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/navigation/navigation.scss';
import './style.scss';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgSliderComponent */
export class AgSliderComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        children: PropTypes.array.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { children, cObject } = this.props;

        return (
            <Swiper
              slidesPerView="auto"
              spaceBetween={ 30 }
              keyboard={ {
                  enabled: true
              } }
              pagination={ {
                  clickable: true
              } }
              navigation
              modules={ [Keyboard, Pagination, Navigation] }
              className={ cObject.component_type }
            >
                { children.map(
                    (item, key) => {
                        const { cObject } = item.props;
                        const src = cObject.properties?.background_images?.desktop_image
                            ?? cObject.properties?.background_images?.mobile_image;
                        const mods = src ? { type: 'image' } : {};
                        return (
                            <SwiperSlide key={ key.toString() }>
                                <Link
                                  block="SlideArea"
                                  elem="AgSliderItem"
                                  to={ cObject?.link?.href ? window.origin + cObject?.link?.href : '#' }
                                  mods={ mods }
                                  aria-label={ Object.link?.label }
                                >
                                    <img
                                      src={ src }
                                      style={ { width: '100%' } }
                                      alt={ cObject.link?.label }
                                    />
                                </Link>
                            </SwiperSlide>
                        );
                    }
                ) }
            </Swiper>
        );
    }
}

export default new AgSliderComponent();
