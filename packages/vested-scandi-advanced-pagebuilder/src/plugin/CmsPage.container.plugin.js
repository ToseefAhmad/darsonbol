/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/CmsPage/Container */
export class CmsPageContainerPlugin {
    render = (args, callback, instance) => callback.apply(instance, args);
}

// eslint-disable-next-line react/forbid-foreign-prop-types
export const { render } = new CmsPageContainerPlugin();

export const config = {
    'Route/CmsPage/Container': {
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
