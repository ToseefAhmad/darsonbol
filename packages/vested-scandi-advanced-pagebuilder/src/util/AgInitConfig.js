import DataContainer from '@scandipwa/scandipwa/src/util/Request/DataContainer';

import { AgInitConfigQuery } from 'Query/AgInitConfig.query';
import BrowserDatabase from 'Util/BrowserDatabase';

export const AG_INIT_CONFIG_KEY = 'AG_INIT_CONFIG';
export const AG_INIT_EXPIRATION = 3600;// One Hour

/** @namespace Vested/ScandiAdvancedPagebuilder/Util/AgInitConfig */
export class AgInitConfig extends DataContainer {
    initDataConfiguration = {};

    /**
     * Save data to local storage
     * @param {Function} onSuccess on success callback
     * @return {void}
     * @memberof AgInitConfig
     */
    get(onSuccess) {
        const initConfig = BrowserDatabase.getItem(AG_INIT_CONFIG_KEY);
        if (initConfig && initConfig) {
            this.initDataConfiguration = initConfig;
            onSuccess.call(this, this.initDataConfiguration);
        } else {
            this.fetchData([AgInitConfigQuery.getQuery()], ({ initConfig }) => {
                this.initDataConfiguration = initConfig.configurations;

                BrowserDatabase.setItem(
                    this.initDataConfiguration,
                    AG_INIT_CONFIG_KEY,
                    AG_INIT_EXPIRATION
                );
                onSuccess.call(this, this.initDataConfiguration);
            });
        }
    }
}

export default new AgInitConfig();
