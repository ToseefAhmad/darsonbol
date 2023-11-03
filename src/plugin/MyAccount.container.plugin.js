/*
 * Copyright (c) 2022. Shaymaa Saied
 */
/**  @namespace SonbolPwa/Plugin/MyAccountContainerPlugin/mapStateToProps */
const mapStateToProps = (args, callback) => {
    const [state] = args;
    return {
        ...callback(...args),
        customer: state.MyAccountReducer.customer
    };
};

export default {
    'Route/MyAccount/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
