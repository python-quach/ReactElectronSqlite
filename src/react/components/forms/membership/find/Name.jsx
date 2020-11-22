import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const NameInput = ({
    clear,
    clearMembershipError,
    error,
    name,
    label,
    placeholder,
}) => {
    const handleClearFields = () => {
        if (error) clearMembershipError();

        clear(true, false, 'membership', 'phone');
    };

    const handleClearError = () => {
        if (error) clearMembershipError();
    };

    const handleNamePatternCheck = (value, previousValue) => {
        if (value.match(/^[a-zA-Z ]+$/) && value.length > 0) {
            return (
                value.charAt(0).toUpperCase() +
                value.slice(1).replace(/\s/g, '').toLowerCase()
            );
        } else {
            if (value.length > 1) {
                return previousValue;
            } else {
                return '';
            }
        }
    };

    return (
        <Field
            width={2}
            className='FindName'
            name={name}
            // size='large'
            size='massive'
            placeholder={placeholder}
            label={label}
            component={Form.Input}
            normalize={handleNamePatternCheck}
            onChange={handleClearFields}
            onFocus={handleClearError}
        />
    );
};

NameInput.defaultProps = {
    name: 'name',
    placeholder: 'Name',
    label: 'Name',
};

NameInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    clear: PropTypes.func.isRequired,
    clearMembershipError: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default NameInput;
