/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
// import ReactImageZoom from 'react-image-zoom';

import Draggable from 'Component/Draggable';
import { Slider as SourceSlider } from 'SourceComponent/Slider/Slider.component';
import CSS from 'Util/CSS';
import { isRtl } from 'Util/CSS/CSS';

/** @namespace SonbolPwa/Component/Slider/Component */
import {
    ACTIVE_SLIDE_PERCENT,
    ANIMATION_DURATION
} from './Slider.config';

/** @namespace SonbolPwa/Component/Slider/Component */
export class SliderComponent extends SourceSlider {
    setTranlateXStyle(translate) {
        const { isVertical } = this.props;

        CSS.setVariable(
            this.draggableRef,
            isVertical ? 'translateY' : 'translateX',
            `${ Math.abs(translate) }px`
        );
    }

    setAnimationSpeedStyle(animationDuration = ANIMATION_DURATION) {
        CSS.setVariable(this.draggableRef, 'animation-speed', `${ animationDuration }ms`);
    }

    getDir() {
        const { isVertical } = this.props;

        if (!isVertical && isRtl()) {
            return -1;
        }

        return 1;
    }
    calculateNextSlide(state) {
        const { isVertical } = this.props;
        const {
            translateX,
            translateY,
            lastTranslateX,
            lastTranslateY
        } = state;

        const lastTranslate = isVertical ? lastTranslateY : lastTranslateX;
        const translate = isVertical ? translateY : translateX;

        const { onActiveImageChange } = this.props;

        const slideSize = this.getSlideWidth();

        const fullSliderSize = this.getFullSliderWidth();
        const dir = this.getDir();
        const activeSlidePosition = translate / slideSize;
        const activeSlidePercent = Math.abs(activeSlidePosition % 1);
        const isSlideBack = dir === 1 ? translate > lastTranslate : translate < lastTranslate;
        if (!translate) {
            return this.onClickChangeSlide(state, slideSize, lastTranslate, fullSliderSize);
        }

        if ((dir === 1 && translate >= 0) || (dir === -1 && translate < 0)) {
            onActiveImageChange(0);

            return 0;
        }

        if ((dir === 1 && translate < -fullSliderSize) || (dir === -1 && translate > fullSliderSize)) {
            const activeSlide = Math.round(fullSliderSize / (-slideSize * dir));
            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        if (isSlideBack && activeSlidePercent < 1 - ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math[dir === 1 ? 'ceil' : 'floor'](activeSlidePosition);
            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        if (!isSlideBack && activeSlidePercent > ACTIVE_SLIDE_PERCENT) {
            const activeSlide = Math[dir === 1 ? 'floor' : 'ceil'](activeSlidePosition);
            onActiveImageChange(-activeSlide);

            return activeSlide;
        }

        const activeSlide = Math.round(activeSlidePosition);
        onActiveImageChange(-activeSlide);

        return activeSlide;
    }
    getFullSliderWidth() {
        const { isVertical } = this.props;
        const { scrollWidth: fullSliderWidth, scrollHeight } = this.draggableRef.current;
        const width = isVertical ? scrollHeight : fullSliderWidth;

        return width - this.getSlideWidth();
    }
    handleDrag(state) {
        const { isVertical } = this.props;
        const { translateX, translateY } = state;
        const translate = isVertical ? translateY : translateX;
        const fullSliderSize = this.getFullSliderWidth();
        const dir = this.getDir();
        const canDrag = dir === 1
            ? translate < 0 && translate > -fullSliderSize
            : translate > 0 && translate < fullSliderSize;

        if (canDrag) {
            this.setTranlateXStyle(translate);
        }
    }
    handleDragEnd(state, callback) {
        const { isVertical } = this.props;
        const activeSlide = this.calculateNextSlide(state);
        const slideSize = this.getSlideWidth();
        const newTranslate = activeSlide * slideSize;

        this.setAnimationSpeedStyle();
        this.setTranlateXStyle(newTranslate);

        if (isVertical) {
            callback({
                originalY: newTranslate,
                lastTranslateY: newTranslate
            });

            return;
        }

        callback({
            originalX: newTranslate,
            lastTranslateX: newTranslate
        });
    }
    handleClick(state, callback, e) {
        if (e.type === 'contextmenu') {
            this.handleDragEnd(state, callback);
        }
    }
    getIsSlider() {
        const { children } = this.props;

        return children.length > 0;
    }

    getSlideWidth() {
        const { isVertical } = this.props;
        const { offsetWidth = 0, offsetHeight = 0 } = this.draggableRef.current || {};

        return isVertical ? offsetHeight : offsetWidth;
    }

    renderSliderContent() {
        const { activeImage, children, isVertical } = this.props;
        const dir = this.getDir();

        if (!this.getIsSlider()) {
            return children;
        }

        return (
            <Draggable
              mix={ { block: 'Slider', elem: 'Wrapper', mods: { isVertical } } }
              draggableRef={ this.draggableRef }
              onDragStart={ this.handleDragStart }
              onDragEnd={ this.handleDragEnd }
              onDrag={ this.handleDrag }
              onClick={ this.handleClick }
              shiftX={ -activeImage * this.getSlideWidth() * dir }
              shiftY={ -activeImage * this.getSlideWidth() }
            >
                    { children }
            </Draggable>
        );
    }

    render() {
        const { mix } = this.props;
        return (
            <>
                <div
                  block="Slider"
                  mix={ mix }
                  ref={ this.getSliderRef() }
                >
                    { this.renderSliderContent() }
                    { this.renderCrumbs() }
                </div>
                { /* { this.renderArrows() } */ }
            </>
        );
    }
}

export default SliderComponent;
