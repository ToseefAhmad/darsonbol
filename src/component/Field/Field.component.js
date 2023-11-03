/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import {
    Field as SourceField
} from 'SourceComponent/Field/Field.component';
import { noopFn } from 'Util/Common';

import { FIELD_TYPE } from './Field.config';

/** @namespace SonbolPwa/Component/Field/Component */
export class FieldComponent extends SourceField {
    renderCheckboxOrRadio() {
        const {
            selected,
            type,
            setRef,
            attr,
            attr: { id = '' } = {},
            events: { onChange },
            events,
            isDisabled,
            label
        } = this.props;

        const elem = type.charAt(0).toUpperCase() + type.slice(1);
        const inputEvents = {
            ...events,
            onChange: onChange || noopFn
        };

        return (
            <label htmlFor={ id } block="Field" elem={ `${elem}Label` }>
                <input
                  checked={ selected === label }
                  ref={ (elem) => setRef(elem) }
                  disabled={ isDisabled }
                  type={ type }
                  { ...inputEvents }
                  { ...attr }
                />
                <div block="input-control" />
                { label }
            </label>
        );
    }
    render() {
        const { type, validationResponse, mix } = this.props;
        const inputRenderer = this.renderMap[type];

        return (
            <div block="Field" elem="Wrapper" mods={ { type } }>
                <div
                  block="Field"
                  mods={ {
                      type,
                      isValid: validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0
                  } }
                  mix={ mix }
                >
                    { type !== FIELD_TYPE.checkbox && type !== FIELD_TYPE.radio && this.renderLabel() }
                    { inputRenderer && inputRenderer() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}

export default FieldComponent;
