/*
 * Copyright (c) 2022. Shaymaa Saied
 */

import { connect } from 'react-redux';

// eslint-disable-next-line import/no-cycle
import InitConfigComponent from './InitConfig.component';

/** @namespace MagearabScandipwaInitconfig/Component/InitConfig/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
    colors: _state.InitConfigReducer.initConfig.Configurations.color_schema
});

/** @namespace MagearabScandipwaInitconfig/Component/InitConfig/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InitConfigComponent);
