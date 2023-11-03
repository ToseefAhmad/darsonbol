/* eslint-disable @scandipwa/scandipwa-guidelines/always-both-mappings */
import { connect } from 'react-redux';

import Image from 'Component/Image';
import {
    CategoryDetails as SourceCategoryDetails
} from 'SourceComponent/CategoryDetails/CategoryDetails.component';

import './CategoryDetails.override.style';

/** @namespace SonbolPwa/Component/CategoryDetails/Component/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});
/** @namespace SonbolPwa/Component/CategoryDetails/Component */
export class CategoryDetailsComponent extends SourceCategoryDetails {
    // TODO implement logic
    renderCategoryImage() {
        const {
            category: { image, id, mobile_image },
            isCurrentCategoryLoaded,
            device: { isMobile }
        } = this.props;

        if (!id || !isCurrentCategoryLoaded) {
            return this.renderCategoryImagePlaceholder();
        }

        if (!image && !isMobile) {
            return null;
        }

        if (!mobile_image && isMobile) {
            return null;
        }

        return (
            <Image
              mix={ { block: 'CategoryDetails', elem: 'Picture' } }
              src={ isMobile ? mobile_image : image || '' }
              ratio="custom"
              objectFit="cover"
            />
        );
    }
    render() {
        return (
            <article block="CategoryDetails">
                { this.renderCategoryImage() }
                <div block="CategoryDetails" elem="Description ContentWrapper" />
            </article>
        );
    }
}

export default connect(mapStateToProps)(CategoryDetailsComponent);
