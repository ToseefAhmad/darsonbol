/* eslint-disable react/no-array-index-key */

import Link from '@scandipwa/scandipwa/src/component/Link';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
// import required modules
import {
    FreeMode, Keyboard, Mousewheel, Scrollbar
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/free-mode/free-mode.scss';
import 'swiper/modules/scrollbar/scrollbar.scss';
// import './style.scss';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgShopByBrandComponent */
export class AgShopByBrandComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { cObject } = this.props;

        return (
            <Swiper
              direction="horizontal"
              slidesPerView={ 5 }
              spaceBetween={ 2 }
              freeMode
              loop
              scrollbar
              mousewheel
              keyboard={ {
                  enabled: true
              } }
              modules={ [Keyboard, FreeMode, Scrollbar, Mousewheel] }
              className={ cObject.component_type }
            >
                { cObject?.items?.map(
                    (item, key) => {
                        const src = item.image;
                        const mods = src ? { type: 'image' } : {};
                        return (
                            <SwiperSlide key={ key.toString() }>
                                <Link
                                  block="SlideArea"
                                  elem="AgSliderItem"
                                  to={ item.url ? window.origin + item.url : '#' }
                                  mods={ mods }
                                  aria-label={ item.label }
                                >
                                    <img
                                      src={ src }
                                      style={ { width: '64px' } }
                                      alt={ item.label }
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

export default new AgShopByBrandComponent();
