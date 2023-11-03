/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import Checkout from '@scandipwa/scandipwa/src/route/Checkout/Checkout.component';
import { PureComponent } from 'react';

import { fetchQuery } from '@scandipwa/scandipwa/src/util/Request';

import TamaraQuery from '../query/Tamara.query';

/** @namespace MagearabScandipwaTamara/Plugin/CheckoutContainerPlugin/Plugin */
export class CheckoutContainerPlugin extends PureComponent {
    // eslint-disable-next-line react/sort-comp
    _getTamaraData = async (args, callback, instance) => {
        instance.setState({ isLoading: true });
        await fetchQuery(TamaraQuery.getTamaraConfig()).then(
            /** @namespace MagearabScandipwaTamara/Plugin/CheckoutContainerPlugin/Plugin/CheckoutContainer/fetchQuery/then */
            ({ tamaraData }) => {
                instance.setState({ isLoading: false, tamaraData });
            },
            instance._handleError
        );
    };

    componentDidMount = async (args, callback, instance) => {
        this._getTamaraData(args, callback, instance);

        return callback(args);
    };
}
const {
    componentDidMount
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            componentDidMount
        }
    }
};

export default config;
