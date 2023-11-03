/*
 * Copyright (c) 2022. Shaymaa Saied
 */

/** @namespace MagearabScandipwaInitconfig/Plugin/HeaderContainerPlugin/mapStateToProps */
const mapStateToProps = (args, callback) => {
    const [state] = args;
    return {
        ...callback(...args),
        header_logo_src: state.InitConfigReducer.initConfig.Configurations.app_logo
    };
};

export default {
    'Component/Header/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
