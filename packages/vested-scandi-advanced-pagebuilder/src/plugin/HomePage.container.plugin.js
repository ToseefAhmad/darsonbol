/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/HomePage/Container */
import {
    AppBar, Box, Tab, Tabs
} from '@mui/material';
import Loader from '@scandipwa/scandipwa/src/component/Loader';

export const PageBuilderDispatcher = import(
    '../store/PageBuilder/PageBuilder.dispatcher'
);

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */

/** @namespace Vested/ScandiAdvancedPagebuilder/Plugin/HomePage/Container */
export class HomePageContainer {
    mapStateToProps = (args, callback) => {
        const [state] = args;
        return {
            ...callback(...args),
            homePage: state.InitConfigReducer.initConfig.Configurations.homepage,
            landingPages: state.InitConfigReducer.initConfig.Configurations.landing_pages,
            currentPageIdentifiers: state.PageBuilderReducer.currentPageIdentifiers,
            currentTabIndex: state.PageBuilderReducer.currentTabIndex
        };
    };

    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;
        return {
            ...callback.apply(instance, args),
            handleChangeIndex: (newIndex, currentTabIndex, landingPages) => {
                if (newIndex !== currentTabIndex) {
                    dispatch({
                        type: 'UPDATE_IS_LOADING',
                        isLoading: true
                    });

                    if (landingPages && landingPages[newIndex]) {
                        dispatch({
                            type: 'UPDATE_CURRENT_PAGE_IDENTIFIERS',
                            currentPageIdentifiers: landingPages[newIndex].value
                        });

                        dispatch({
                            type: 'UPDATE_CURRENT_INDEX',
                            index: newIndex
                        });
                    }

                    dispatch({
                        type: 'UPDATE_IS_LOADING',
                        isLoading: false
                    });
                }
            }
        };
    };

    containerProps = (args, callback, instance) => {
        const { currentPageIdentifiers, pageIdentifiers, landingPages } = instance.props;

        return {
            ...callback.apply(instance, args),
            pageIdentifiers: currentPageIdentifiers || (
                landingPages && landingPages.length > 0 ? landingPages[0].value : pageIdentifiers
            )
        };
    };

    render = (args, callback, instance) => {
        const {
            homePage,
            landingPages,
            pageIdentifiers,
            handleChangeIndex,
            currentTabIndex,
            isLoading
        } = instance.props;

        if (homePage === pageIdentifiers && landingPages && landingPages.length > 0) {
            return (
                !landingPages || isLoading ? (<Loader />) : (
                    <Box sx={ { bgcolor: 'background.paper', width: '100%' } }>
                        <AppBar position="static" sx={ { bgcolor: '#efefef' } }>
                            <Tabs
                              value={ currentTabIndex }
                              onChange={ (e, index) => handleChangeIndex(index, currentTabIndex, landingPages) }
                              indicatorColor="secondary"
                              color="#efefe"
                              textColor="inherit"
                              aria-label="full width tabs"
                              variant="scrollable"
                              scrollButtons
                              allowScrollButtonsMobile
                            >
                                { landingPages?.map(
                                    (item) => (
                                        <Tab
                                          key={ item.value }
                                          sx={ { color: '#000', fontSize: 14 } }
                                          label={ item.label }
                                        />
                                    )
                                ) }
                            </Tabs>
                        </AppBar>
                        <div>
                            { callback.apply(instance, args) }
                        </div>
                    </Box>
                )
            );
        }

        return callback.apply(instance, args);
    };
}

// eslint-disable-next-line react/forbid-foreign-prop-types
export const {
    render,
    mapStateToProps,
    mapDispatchToProps,
    containerProps
} = new HomePageContainer();

export const config = {
    'Route/HomePage/Container': {
        'member-function': {
            render: [
                {
                    position: 100,
                    implementation: render
                }
            ],
            containerProps: [
                {
                    position: 100,
                    implementation: containerProps
                }
            ]
        }
    },
    'Route/HomePage/Container/mapStateToProps': {
        function: mapStateToProps
    },
    'Route/HomePage/Container/mapDispatchToProps': {
        function: mapDispatchToProps
    }
};

export default config;
