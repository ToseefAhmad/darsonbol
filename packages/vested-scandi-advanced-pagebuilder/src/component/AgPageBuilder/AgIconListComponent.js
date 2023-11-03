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
import './style.scss';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgIconListComponent */
export class AgIconListComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        cObject: PropTypes.object.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        children: PropTypes.array.isRequired
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
        let slidePerView = 12;
        if (isTablet) {
            // eslint-disable-next-line no-magic-numbers
            slidePerView = 6;
        }
        if (isMobile) {
            // eslint-disable-next-line no-magic-numbers
            slidePerView = 3;
        }

        this.setState({
            slidePerView
        });
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { children, cObject } = this.props;
        const { slidePerView } = this.state;

        return (
            <Swiper
              direction="horizontal"
              slidesPerView={ slidePerView }
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
                                      style={ { width: '64px' } }
                                      alt={ cObject.link?.label }
                                    />
                                    <div style={ { textAlign: 'center' } }>{ cObject?.button }</div>
                                </Link>
                            </SwiperSlide>
                        );
                    }
                ) }
            </Swiper>
        );
    }
}

export default new AgIconListComponent();
