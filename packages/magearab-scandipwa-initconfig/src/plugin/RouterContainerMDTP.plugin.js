/*
 * Copyright (c) 2022. Shaymaa Saied
 */

export const InitConfigDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../store/InitConfig/InitConfig.dispatcher'
);

/** @namespace MagearabScandipwaInitconfig/Plugin/RouterContainerPlugin/mapDispatchToProps */
export const mapDispatchToProps = (args, callback, instance) => {
    const [dispatch] = args;
    const mdtp = callback(...args);
    const { init } = mdtp;

    mdtp.init = (...args) => {
        init(...args);
        InitConfigDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
    };

    return mdtp;
};

export const config = {
    'Component/Router/Container/mapDispatchToProps': {
        function: mapDispatchToProps
    }
};
export default config;
