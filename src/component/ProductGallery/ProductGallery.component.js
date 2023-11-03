/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
// import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import { withRouter } from 'react-router';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import CarouselScroll from 'Component/CarouselScroll';
// import Image from 'Component/Image';
import ProductGalleryBaseImage from 'Component/ProductGalleryBaseImage';
import ProductGalleryThumbnailImage from 'Component/ProductGalleryThumbnailImage';
import Slider from 'Component/Slider';
import VideoPopup from 'Component/VideoPopup';
import {
    ProductGallery as SourceProductGallery
} from 'SourceComponent/ProductGallery/ProductGallery.component';

import {
    IMAGE_TYPE,
    PLACEHOLDER_TYPE,
    VIDEO_TYPE
} from './ProductGallery.config';

/** @namespace SonbolPwa/Component/ProductGallery/Component */
export class ProductGalleryComponent extends SourceProductGallery {
    handleSliderClick() {
        const {
            handleImageZoomPopupActiveChange,
            gallery,
            activeImage
        } = this.props;

        const { media_type } = gallery[activeImage];

        if (media_type === VIDEO_TYPE) {
            return;
        }

        handleImageZoomPopupActiveChange(false);
    }

    renderAdditionalPicture(media, index = 0) {
        return (
            <ProductGalleryThumbnailImage
              key={ index }
              media={ media }
            />
        );
    }
    goPrev() {
        const { activeImage } = this.props;

        if (activeImage > 0) {
            this.changeActiveImage(activeImage - 1);
        }
    }

    goNext() {
        const { activeImage, children } = this.props;
        const nextImage = activeImage + 1;

        if (nextImage < children.length) {
            this.changeActiveImage(nextImage);
        }
    }

    renderAdditionalPictures() {
        const {
            gallery,
            isImageZoomPopupActive,
            activeImage,
            onActiveImageChange
            // isWithEmptySwitcher
        } = this.props;

        // const { slidesCount } = this.state;
        const verticalSliderCount = 4;

        if (gallery.length === 1) {
            return null;
        }

        return (
            <div block="ProductGallery" elem="Additional" mods={ { isImageZoomPopupActive } }>
                <CarouselScroll
                  activeItemId={ activeImage }
                  onChange={ onActiveImageChange }
                  showedItemCount={ verticalSliderCount }
                  isImageZoomPopupActive={ isImageZoomPopupActive }
                >
                    { gallery.map(this.renderAdditionalPicture.bind(this)) }
                </CarouselScroll>
            </div>
        );
    }
    renderSlide(media, index) {
        const { media_type } = media;

        switch (media_type) {
        case IMAGE_TYPE:
            return this.renderImage(media, index);
        case VIDEO_TYPE:
            return this.renderVideo(media, index);
        case PLACEHOLDER_TYPE:
            return this.renderPlaceholder(index);
        default:
            return null;
        }
    }
    renderImage(mediaData, index) {
        const {
            isZoomEnabled,
            handleZoomChange,
            disableZoom,
            isMobile
            // isImageZoomPopupActive
            // sliderRef
            // showLoader
        } = this.props;
        const { scrollEnabled } = this.state;
        if (!isMobile) {
            const {
                base: { url: baseSrc } = {},
                large: { url: largeSrc } = {}
            } = mediaData;

            // const style = isImageZoomPopupActive ? { height: 'auto' } : {};
            // const src = isImageZoomPopupActive ? largeSrc : baseSrc;
            return (
                <ReactImageMagnify { ...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: baseSrc
                    },
                    largeImage: {
                        src: largeSrc,
                        width: 1200,
                        height: 1800
                    },
                    enlargedImageContainerDimensions: {
                        width: '100%',
                        height: '100%'
                    }
                } }
                />
                // <ReactImageZoom { ...props }>
                // { /* //  <Image
                //    key={index}
                //    src={src}
                //    ratio="custom"
                //    mix={{
                //        block: 'ProductGallery',
                //        elem: 'SliderImage',
                //        mods: {isPlaceholder: !src }
                //    } }
                //    isPlaceholder={!src}
                //    style={style}
                //    showIsLoading={showLoader}
                //  /> */ }
                // {/* </ReactImageZoom> */}
            );
        }

        return (
            <TransformWrapper
              key={ index }
              onZoomChange={ handleZoomChange }
              onWheelStart={ this.onWheelStart }
              onWheel={ this.onWheel }
              wheel={ { limitsOnWheel: true, disabled: !scrollEnabled } }
                //   doubleClick={ { mode: 'reset' } }
              pan={ {
                  disabled: !isZoomEnabled,
                  limitToWrapperBounds: true,
                  velocity: false
              } }
              options={ {
                  limitToBounds: true,
                  minScale: 1
              } }
            >
                { ({
                    scale,
                    previousScale,
                    resetTransform,
                    setTransform
                }) => {
                    if (scale === 1 && previousScale !== 1) {
                        resetTransform();
                    }

                    return (
                        <ProductGalleryBaseImage
                          setTransform={ setTransform }
                          index={ index }
                          mediaData={ mediaData }
                          scale={ scale }
                          previousScale={ previousScale }
                          disableZoom={ disableZoom }
                          isZoomEnabled={ false }
                        />
                    );
                } }
            </TransformWrapper>
        );
    }
    renderSlider() {
        const {
            gallery,
            activeImage,
            isZoomEnabled,
            onActiveImageChange,
            isImageZoomPopupActive,
            sliderRef,
            isMobile
        } = this.props;

        const mods = {
            isImageZoomPopupActive,
            isZoomInCursor: !isImageZoomPopupActive
        };
        const mainImage = gallery[activeImage];
        const isMoreThanOnePhoto = gallery.length > 1;
        const imageContainer = isMobile ? (
            <div
              ref={ this.imageRef }
              block="ProductGallery"
              elem="SliderWrapper"
            >
                <meta itemProp="image" content={ this.getImageUrl() } />
                <Slider
                  sliderRef={ sliderRef }
                  mix={ { block: 'ProductGallery', elem: 'Slider', mods } }
                  showCrumbs={ isMobile && isMoreThanOnePhoto }
                  showArrows={ !isMobile && isMoreThanOnePhoto }
                  activeImage={ activeImage }
                  onActiveImageChange={ onActiveImageChange }
                  isInteractionDisabled={ isZoomEnabled }
                  onClick={ this.handleSliderClick }
                  sliderHeight={ isImageZoomPopupActive ? '100%' : 0 }
                  isHeightTransitionDisabledOnMount
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
            </div>
        )
            : (
                <div className="Main_Slider_Image">
                    { this.renderSlide(mainImage, activeImage) }
                </div>
            );

        return imageContainer;
    }

    render() {
        return (
            <>
                { this.renderAdditionalPictures() }
                <div block="ProductGallery" ref={ this.galleryRef }>
                    { this.renderSlider() }
                    { <VideoPopup /> }
                </div>
            </>

        );
    }
}

export default withRouter(ProductGalleryComponent);
