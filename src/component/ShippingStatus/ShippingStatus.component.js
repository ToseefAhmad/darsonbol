/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/prop-types */
// import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { ProgressBar } from 'react-step-progress-bar';

import { steps } from './ShippingStatus.config';

import './ShippingStatus.style';
import 'react-step-progress-bar/styles.css';
/** @namespace SonbolPwa/Component/ShippingStatus/Component/ShippingStatus */
export function ShippingStatus(props) {
    const { orderStatus } = props;
    const activeStep = steps.find((step) => step.value === orderStatus);
    const style = {
        color: `${activeStep?.color}`
    };
    const percentage = (activeStep?.step_no / 4) * 100;

    return (
        <div className="shipping-status-container">
            { /* <Stepper activeStep={ activeStep.step_no } alternativeLabel>
                { steps.map((step) => (
                    <Step key={ step.label }>
                        <StepLabel />
                    </Step>
                )) }
            </Stepper> */ }
            <div className="shipbar-box">
                { orderStatus !== 'تم الإلغاء'
                    ? (
                        <div>
                            <ProgressBar
                              percent={ percentage }
                              filledBackground="#55BD79"
                            />
                            <span className="brper" style={ { width: `${percentage}%` } }>
                                <span className="txtlblper">{ activeStep?.value }</span>
                                { ' ' }
                                { /* <DoubleArrowIcon /> */ }
                            </span>
                        </div>
                    )
                    : null }
            </div>
            <div className="status-container">
                { orderStatus === 'تم الإلغاء' ? (
                    <div className="status-value-container">
                        <span className="status" style={ style }>
                            { activeStep?.value }
                        </span>
                    </div>
                ) : null }
                { /* { orderStatus !== 'تم الإلغاء' ? (
                    <div className="date-container">
                        <span className="delivery-time">
                            موعد التوصيل في
                        </span>
                        <span className="date">الخميس فبراير 03</span>
                    </div>
                ) : null } */ }
            </div>
        </div>
    );
}

export default ShippingStatus;
