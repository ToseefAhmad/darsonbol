/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
import { createRef } from 'react';

import { CAROUSEL_ITEM_GAP } from 'Component/CarouselScroll/CarouselScroll.config';
import CarouselScrollArrow from 'Component/CarouselScrollArrow';
import CarouselScrollItem from 'Component/CarouselScrollItem';
import {
    CarouselScroll as SourceCarouselScroll
} from 'SourceComponent/CarouselScroll/CarouselScroll.component';
import CSS from 'Util/CSS';
import { isRtl } from 'Util/CSS/CSS';

/** @namespace SonbolPwa/Component/CarouselScroll/Component */
export class CarouselScrollComponent extends SourceCarouselScroll {
    itemRef = createRef();

    carouselRef = createRef();

     handleArrowClick = this.handleArrowClick.bind(this);

    handleChange = this.handleChange.bind(this);

    componentDidMount() {
        const { showedItemCount } = this.props;

        const margin = CAROUSEL_ITEM_GAP;
        // const width = this.getCarouselWidth(showedItemCount);
        const height = this.getCarouselHeight(showedItemCount);

        CSS.setVariable(this.carouselRef, 'carousel-scroll-gap', `${margin}px`);
        // CSS.setVariable(this.carouselRef, 'carousel-width', width);
        CSS.setVariable(this.carouselRef, 'carousel-height', height);
    }

    componentDidUpdate(prevProps) {
        const {
            children: { length: prevChildrenLength },
            showedItemCount: prevShowedItemCount
        } = prevProps;

        const {
            activeItemId,
            children: { length: childrenLength },
            showedItemCount
        } = this.props;

        const { activeItemId: prevActiveItemId } = this.state;

        if (prevChildrenLength !== childrenLength) {
            this.handleReset();

            return;
        }

        if (activeItemId !== null && activeItemId !== prevActiveItemId) {
            this.handleChange(activeItemId);
        }

        if (prevShowedItemCount !== showedItemCount) {
            const height = this.getCarouselHeight(showedItemCount);
            CSS.setVariable(this.carouselRef, 'carousel-height', height);
            this.updateFirstSlide();
        }
    }

    updateFirstSlide() {
        const { firstCarouselItemId } = this.state;

        const maxId = this.getMaxFirstItemId();

        if (firstCarouselItemId > maxId) {
            this.setTranslate(maxId);
            this.setState({ firstCarouselItemId: maxId });
        }
    }

    getCarouselHeight(showedItemCount) {
        const margin = CAROUSEL_ITEM_GAP;
        const { offsetHeight: cardHeight } = this.itemRef.current;
        // eslint-disable-next-line no-magic-numbers
        return `${ (margin + cardHeight + 20) * showedItemCount - margin }px`;
    }

    getCarouselWidth(showedItemCount) {
        const margin = CAROUSEL_ITEM_GAP;
        const { offsetWidth: cardWidth } = this.itemRef.current;
        return `${ (margin + cardWidth) * showedItemCount - margin }px`;
    }

    getNextTranslate(nextId) {
        const { offsetHeight } = this.itemRef.current;
        const multiplier = isRtl() ? -nextId : nextId;

        return `${ multiplier * (offsetHeight + CAROUSEL_ITEM_GAP) }px`;
    }

    setTranslate(nextId) {
        const translate = this.getNextTranslate(nextId);
        CSS.setVariable(this.carouselRef, 'translateY', translate);
    }

    getMaxFirstItemId() {
        const { children: { length: childrenLength }, showedItemCount } = this.props;
        return Math.max(childrenLength - showedItemCount, 0);
    }

    getNewCarouselItemId(isNextArrow) {
        const { showedItemCount } = this.props;
        const { firstCarouselItemId: prevFirstCarouselItemId } = this.state;

        const scrollStep = Math.ceil(showedItemCount / 2);

        return isNextArrow
            ? Math.min(prevFirstCarouselItemId + scrollStep, this.getMaxFirstItemId())
            : Math.max(prevFirstCarouselItemId - scrollStep, 0);
    }

    handleArrowClick(isNextArrow) {
        const firstCarouselItemId = this.getNewCarouselItemId(isNextArrow);
        this.setTranslate(firstCarouselItemId);
        this.setState({ firstCarouselItemId });
    }

    handleChange(nextId) {
        const { onChange, showedItemCount } = this.props;
        const { firstCarouselItemId } = this.state;
        onChange(nextId);
        this.setState({ activeItemId: nextId });

        if (nextId < firstCarouselItemId || nextId >= firstCarouselItemId + showedItemCount) {
            const newId = Math.min(this.getMaxFirstItemId(), nextId);
            this.setTranslate(newId);
            this.setState({ firstCarouselItemId: newId });
        }
    }

    handleReset() {
        const { onChange } = this.props;

        const activeItemId = 0;

        CSS.setVariable(this.carouselRef, 'translateX', 0);

        onChange(activeItemId);
        this.setState({ activeItemId });
    }

    renderArrow(isNextArrow = false) {
        const { showArrow, children: { length: childrenLength }, showedItemCount } = this.props;
        // const { firstCarouselItemId } = this.state;

        if (!showArrow || childrenLength <= showedItemCount) {
            return null;
        }

        // render hidden arrow to avoid carousel jumping on error hide/appear
        // const isInvisible = (!isNextArrow && firstCarouselItemId === 0)
        //     || (isNextArrow && firstCarouselItemId >= this.getMaxFirstItemId());

        return (
            <CarouselScrollArrow
              isNextArrow={ isNextArrow }
              onClick={ this.handleArrowClick }
              isInvisible={ false }
            />
        );
    }

    renderContentItem(child, key) {
        const { activeItemId } = this.state;

        return (
            <CarouselScrollItem
              key={ key }
              position={ key }
              onClick={ this.handleChange }
              itemRef={ this.itemRef }
              isActive={ key === activeItemId }
            >
                { child }
            </CarouselScrollItem>
        );
    }

    renderContent() {
        const { children, isImageZoomPopupActive } = this.props;

        return (
            <div block="CarouselScroll" elem="ContentWrapper" mods={ { isImageZoomPopupActive } }>
                <div block="CarouselScroll" elem="Content">
                    { children.map(this.renderContentItem.bind(this)) }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div block="CarouselScroll" ref={ this.carouselRef }>
                { this.renderArrow() }
                { this.renderContent() }
                { this.renderArrow(true) }
            </div>
        );
    }
}

export default CarouselScrollComponent;
