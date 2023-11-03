import ClickOutside from 'Component/ClickOutside';
import {
    SearchField as SourceSearchField
} from 'SourceComponent/SearchField/SearchField.component';

/** @namespace SonbolPwa/Component/SearchField/Component */
export class SearchFieldComponent extends SourceSearchField {
    render() {
        const {
            isVisible,
            isActive
        } = this.props;

        return (
            <div block="SearchField" mods={ { isVisible, isActive } }>
                <ClickOutside onClick={ this.closeSearch }>
                    <div block="SearchField" elem="Wrapper">
                        { this.renderSearch() }
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default SearchFieldComponent;
