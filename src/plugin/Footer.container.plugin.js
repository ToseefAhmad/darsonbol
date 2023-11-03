/*
 * Copyright (c) 2022. Shaymaa Saied
 */
/**  @namespace SonbolPwa/Plugin/FooterContainerPlugin/mapStateToProps */
const mapStateToProps = (args, callback) => {
    const [state] = args;
    return {
        ...callback(...args),
        contacts: state.InitConfigReducer.initConfig.Configurations.contact_us,
        socialAccounts: state.InitConfigReducer.initConfig.Configurations.social_accounts,
        staticPages: state.InitConfigReducer.initConfig.Configurations.static_pages,
        app_white_logo: state.InitConfigReducer.initConfig.Configurations.app_white_logo,
        logo_alt: state.InitConfigReducer.initConfig.Configurations.app_name
    };
};

export default {
    'Component/Footer/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
