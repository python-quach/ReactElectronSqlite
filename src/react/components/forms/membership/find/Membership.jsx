import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const MembershipInput = ({
    clear,
    clearMembershipError,
    error,
    maxNumber,
    placeholder,
    label,
    size,
}) => {
    const handleClearFields = () => {
        if (error) clearMembershipError();

        clear(true, false, 'phone', 'firstName', 'lastName');
    };

    const handleClearError = () => {
        if (error) clearMembershipError();
    };

    // If current pattern doesn't match, we return the previous value, if the string is less than 1 we return blank space
    const handleMembershipNumber = (value, prevValue) => {
        if (value.match(/^[0-9]+$/g)) return value;

        if (value.length > 1) {
            return prevValue;
        } else {
            return '';
        }
    };

    return (
        <Field
            width={2}
            className='FindMembership'
            name='membership'
            size={size}
            placeholder={placeholder}
            label={label}
            component={Form.Input}
            maxLength={maxNumber}
            normalize={handleMembershipNumber}
            onChange={handleClearFields}
            onFocus={handleClearError}
        />
    );
};

MembershipInput.defaultProps = {
    maxNumber: 5,
    // placeholder: 'xxxxx',
    placeholder: 'Membership #',
    // label: 'Membership #',
    size: 'large',
};

MembershipInput.propTypes = {
    clear: PropTypes.func.isRequired,
    clearMembershipError: PropTypes.func.isRequired,
    error: PropTypes.string,
    maxNumber: PropTypes.number,
    placeholder: PropTypes.string,
};

export default MembershipInput;
