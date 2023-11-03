import { prepareQuery } from '@scandipwa/scandipwa/src/util/Query';
import { executePost, getErrorMessage } from '@scandipwa/scandipwa/src/util/Request';

import { showNotification } from 'Store/Notification/Notification.action';
import { CmsPageQuery } from '@scandipwa/scandipwa/src/query/CmsPage.query';

/**
 * PageBuilder Dispatcher
 * @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Dispatcher */
export class PageBuilderDispatcher {
    async getPageData(identifier, dispatch) {
        const query = CmsPageQuery.getQuery({ identifier });
        // eslint-disable-next-line fp/no-let
        let cmsPageData = null;

        await executePost(prepareQuery([query])).then(
            /** @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Dispatcher/PageBuilderDispatcher/getPageData/executePost/then */
            ({ cmsPage }) => {
                cmsPageData = cmsPage;
            },
            /** @namespace Vested/ScandiAdvancedPagebuilder/Store/PageBuilder/Dispatcher/PageBuilderDispatcher/getPageData/executePost/then/dispatch/catch */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );

        return cmsPageData;
    }
}

export default new (PageBuilderDispatcher)();
