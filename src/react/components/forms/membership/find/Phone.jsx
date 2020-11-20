import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const CustomPhoneInput = (props) => (
    <PhoneInput
        {...props.input}
        specialLabel={'Phone'}
        disableCountryCode={true}
        disableDropdown={true}
        onlyCountries={['us']}
        defaultMask={'(...)-...-....'}
        alwaysDefaultMask={true}
        placeholder={'(408)-123-4567'}
        country={'us'}
        inputProps={{}}
    />
);

const PhoneNumberInput = ({ clear, clearMembershipError, error }) => {
    const handlePhoneClear = () => {
        if (error) clearMembershipError();
    };

    // This will clear the phone field if we enter data on other field
    const handleClearOtherFields = () => {
        if (error) clearMembershipError();
        clear(true, false, 'membership', 'firstName', 'lastName');
    };

    const normalizeInput = (value, previousValue) => {
        if (!value) return value;
        const currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;

        if (!previousValue || value.length > previousValue.length) {
            if (cvLength < 4) return currentValue;
            if (cvLength < 7)
                return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
                3,
                6
            )}-${currentValue.slice(6, 10)}`;
        }
        if (cvLength === 7) {
            return value;
        }
    };

    // Make sure only number are all allow
    const handleNumberMatch = (value, prev) => {
        const numberPattern = /\d+/g;
        if (value.match(numberPattern)) {
            return value.match(numberPattern).join('');
        }
    };

    return (
        <Field
            name='phone'
            label='Phone'
            placeholder={'(408)-123-4567'}
            component={Form.Input}
            normalize={normalizeInput}
            onChange={handleClearOtherFields}
            onFocus={handlePhoneClear}
        />
    );
};

PhoneNumberInput.defaultProps = {
    error: null,
};

PhoneNumberInput.propTypes = {
    clear: PropTypes.func.isRequired,
    clearMembershipError: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default PhoneNumberInput;
