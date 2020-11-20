import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const PhoneNumberInput = ({ clear, clearMembershipError, error, size }) => {
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

    return (
        <Field
            width={2}
            className='FindPhone'
            name='phone'
            size={size}
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
    size: 'large',
};

PhoneNumberInput.propTypes = {
    clear: PropTypes.func.isRequired,
    clearMembershipError: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default PhoneNumberInput;
