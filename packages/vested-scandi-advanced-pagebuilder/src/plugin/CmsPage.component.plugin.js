/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/CmsPage/Component */
import NoMatch from '@scandipwa/scandipwa/src/route/NoMatch/NoMatch.component';
import { AgPageBuilderComponent } from '../component/AgPageBuilder/AgPageBuilderComponent';

/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/CmsPage/Component */
export class CmsPageComponentPlugin {
    render = (args, callback, instance) => {
        const {
            page,
            isBreadcrumbsActive,
            isLoading,
            isPageLoaded
        } = instance.props;
        const { page_width, page_builder } = page;

        // eslint-disable-next-line fp/no-let
        let pageBuilderData = null;
        try {
            const { json_encoded } = page_builder;
            pageBuilderData = JSON.parse(json_encoded);
            if (pageBuilderData.Error) {
                console.warn(`pageBuilderData.Error [id: ${page.id}]`, pageBuilderData.Error);
            }
            pageBuilderData = json_encoded;
        } catch (error) {
            pageBuilderData = null;
        }

        if (!isLoading && !isPageLoaded) {
            return <NoMatch />;
        }

        return (
            <main
              block="CmsPage"
              mods={ { isBreadcrumbsHidden: !isBreadcrumbsActive } }
            >
                <div block="CmsPage" elem="Wrapper" mods={ { page_width } }>
                    { instance.renderHeading() }
                    <div block="CmsPage" elem="Content">
                        { !pageBuilderData ? instance.renderContent() : (
                            <AgPageBuilderComponent
                              pageBuilderJsonEncoded={ pageBuilderData }
                            />
                        ) }
                    </div>
                </div>
            </main>
        );
    };
}

// eslint-disable-next-line react/forbid-foreign-prop-types
export const { render } = new CmsPageComponentPlugin();

export const config = {
    'Route/CmsPage/Component': {
        'member-function': {
            render: [
                {
                    position: 100,
                    implementation: render
                }
            ]
        }
    }
};

export default config;
