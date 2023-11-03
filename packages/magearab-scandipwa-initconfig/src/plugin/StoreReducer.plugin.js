/*
 * Copyright (c) 2022. Shaymaa Saied
 */
import { InitConfigReducer } from '../store/InitConfig/InitConfig.reducer';

const getStaticReducers = (args, callback) => ({
    ...callback(...args),
    InitConfigReducer
});

export const config = {
    'Store/Index/getStaticReducers': {
        function: getStaticReducers
    }
};

export default config;
