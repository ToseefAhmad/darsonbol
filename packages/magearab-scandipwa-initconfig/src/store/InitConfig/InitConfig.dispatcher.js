/*
*
*
*
*
*
* */

import { showNotification } from '@scandipwa/scandipwa/src/store/Notification/Notification.action';
import BrowserDatabase from '@scandipwa/scandipwa/src/util/BrowserDatabase';
import { QueryDispatcher } from '@scandipwa/scandipwa/src/util/Request';
import { ONE_MONTH_IN_SECONDS } from '@scandipwa/scandipwa/src/util/Request/QueryDispatcher';

import InitConfigQuery from '../../query/InitConfig.query';
import { updateInitConfig } from './InitConfig.action';

/**
 * InitConfig Dispatcher
 * @extends QueryDispatcher
 * @namespace MagearabScandipwaInitconfig/Store/InitConfig/Dispatcher */
export class InitConfigDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('InitConfig');
    }

    onSuccess(data, dispatch) {
        if (data) {
            BrowserDatabase.setItem(data, 'initConfig', ONE_MONTH_IN_SECONDS);
            dispatch(updateInitConfig(data));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', __('Error fetching Init Config!'), error));
    }

    prepareRequest() {
        return [
            InitConfigQuery.getQuery()
        ];
    }
}
export default new InitConfigDispatcher();
