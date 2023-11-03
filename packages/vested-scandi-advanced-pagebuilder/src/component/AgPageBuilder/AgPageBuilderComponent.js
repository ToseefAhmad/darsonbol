/* eslint-disable max-len */
import { Box } from '@mui/material';
import { changeNavigationState } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from '@scandipwa/scandipwa/src/store/Navigation/Navigation.reducer';
import { setBigOfflineNotice } from '@scandipwa/scandipwa/src/store/Offline/Offline.action';
import { isArray } from '@tilework/mosaic-craco/lib/utils';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { AgBannerComponent } from './AgBannerComponent';
import { AgColumnComponent } from './AgColumnComponent';
import { AgHeadingComponent } from './AgHeadingComponent';
import { AgIconListComponent } from './AgIconListComponent';
import { AgProductComponent } from './AgProductComponent';
import { AgRowComponent } from './AgRowComponent';
import { AgShopByBrandComponent } from './AgShopByBrandComponent';
import { AgSliderComponent } from './AgSliderComponent';

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgPageBuilderComponent/mapStateToProps */
export const mapStateToProps = (state) => ({
    isOffline: state.OfflineReducer.isOffline
});

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgPageBuilderComponent/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    changeHeaderState: (state) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state)),
    setBigOfflineNotice: (isBig) => dispatch(setBigOfflineNotice(isBig))
});

/** @namespace Vested/ScandiAdvancedPagebuilder/Component/AgPageBuilder/AgPageBuilderComponent */
export class AgPageBuilderComponent extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        pageBuilderJsonEncoded: PropTypes.string.isRequired
    };

    componentsObject = {};

    componentsRows = [];

    // eslint-disable-next-line no-magic-numbers
    ID_LENGTH = 10;

    // eslint-disable-next-line no-magic-numbers
    START_LETTERS_ASCII = 97; // Use 64 for uppercase

    // eslint-disable-next-line no-magic-numbers
    ALPHABET_LENGTH = 26;

    uniqueID = () => Array.from(new Array(this.ID_LENGTH), () => String.fromCharCode(this.START_LETTERS_ASCII + Math.random() * this.ALPHABET_LENGTH))
        .join('');

    mountBuilder(pageBuilderJsonEncoded) {
        this.componentsRows = [];
        this.componentsObject = JSON.parse(pageBuilderJsonEncoded);

        if (isArray(this.componentsObject)) {
            this.componentsObject.map((component, index) => this.buildRow(component, index));
        }
    }

    buildRow(component, index) {
        this.componentsRows.push(
            this.parserProcess(component, index)
        );
    }

    parserProcess(component, index) {
        const object = component;
        const children = [];
        // -- Skip column-group on row
        if (object.component_type === 'row' && object.children[0].component_type === 'column-group') {
            object.children = object.children[0].children;
        }
        if (object.component_type === 'column') {
            object.children[0].properties.parent_width = object.properties.css.width;
        }

        if (isArray(object.children)) {
            object.children.forEach((item) => {
                children.push(this.parserProcess(item, index));
            });
        }

        switch (object.component_type) {
        case 'row':
            return (
                <AgRowComponent key={ this.uniqueID() } cObject={ object }>
                    { children }
                </AgRowComponent>
            );
        case 'column-group':
            return (
                <AgColumnComponent key={ this.uniqueID() } cObject={ object }>
                    { children }
                </AgColumnComponent>
            );
        case 'column':
            return (
                <AgColumnComponent key={ this.uniqueID() } cObject={ object }>
                    { children }
                </AgColumnComponent>
            );
        case 'banner':
            return (
                <AgBannerComponent key={ this.uniqueID() } cObject={ object } />
            );
        case 'slider':
            return (
                <AgSliderComponent key={ this.uniqueID() } cObject={ object }>
                    { children }
                </AgSliderComponent>
            );
        case 'slide':
            return (<span key={ this.uniqueID() } cObject={ object } />);
        case 'alsaifgallery_pbiconslist':
            return (
                <AgIconListComponent key={ this.uniqueID() } cObject={ object }>
                    { children }
                </AgIconListComponent>
            );
        case 'icon':
            return (<span key={ this.uniqueID() } cObject={ object } />);
        case 'ShopByBrand':
            return (
                <AgShopByBrandComponent key={ this.uniqueID() } cObject={ object } />
            );
        case 'heading':
            return (
                <AgHeadingComponent key={ this.uniqueID() } cObject={ object } />
            );
        case 'products':
            return (
                <AgProductComponent key={ this.uniqueID() } cObject={ object } />
            );
        default:
            return (
                <span key={ this.uniqueID() } componenttype={ object.component_type } />
            );
        }
    }

    render() {
        const {
            pageBuilderJsonEncoded
        } = this.props;

        if (pageBuilderJsonEncoded) {
            this.mountBuilder(pageBuilderJsonEncoded);
        }

        return (
            <Box
              sx={ {
                  maxWidth: '95%',
                  // width: '90%',
                  margin: '0 auto'
              } }
            >
                { this.componentsRows }
            </Box>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgPageBuilderComponent);
