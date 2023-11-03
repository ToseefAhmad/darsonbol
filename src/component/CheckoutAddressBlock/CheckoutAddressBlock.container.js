/*
 * Copyright (c) 2022. Shaymaa Saied
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    AddressBlockContainer,
    mapDispatchToProps,
    mapStateToProps
} from '../AddressBlock/AddressBlock.container';
import CheckoutAddressBlockComponent from './CheckoutAddressBlock.component';

/** @namespace SonbolPwa/Component/CheckoutAddressBlock/Container */
export class CheckoutAddressBlockContainer extends AddressBlockContainer {
    static propTypes = {
        ...super.propTypes,
        isSelected: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    containerProps() {
        const { isSelected, onClick } = this.props;

        return {
            isSelected,
            onClick,
            ...super.containerProps()
        };
    }

    render() {
        return (
            <CheckoutAddressBlockComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBlockContainer);
