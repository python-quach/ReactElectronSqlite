import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Inputs = ({ err, clearError }) => {
    return (
        <>
            <Field
                component={Form.Input}
                label='Username'
                type='text'
                name='username'
                placeholder='Username'
                autoComplete='off'
                spellCheck='false'
                onFocus={() => !err || clearError()}
                width={12}
            />
            <Field
                component={Form.Input}
                name='password'
                label='Password'
                type='password'
                placeholder='Password'
                autoComplete='off'
                onFocus={() => !err || clearError()}
                width={12}
            />
        </>
    );
};

Inputs.propTypes = {
    err: PropTypes.string,
    clearError: PropTypes.func.isRequired,
};

export default Inputs;
