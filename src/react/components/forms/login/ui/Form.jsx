import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Inputs from './Inputs';
import Button from './Button';
import { reduxForm } from 'redux-form';
import { object, string, bool, func } from 'prop-types';

const LoginForm = ({
    auth,
    history,
    err,
    handleSubmit,
    authenticate,
    clearError,
    username,
    password,
    children,
}) => {
    // Authenticated User will be redirect to Find Membership Dashboard
    useEffect(() => {
        if (auth) {
            history.push('/find');
        }
    }, [auth, history]);

    return (
        <Form
            error={err ? true : false}
            onSubmit={handleSubmit((values) => authenticate(values))}>
            <Form.Group>
                <Inputs err={err} clearError={clearError} />
            </Form.Group>
            {/* We insert Message Component Here */}
            {children}
            <Form.Group inline>
                <Button username={username} password={password} />
            </Form.Group>
        </Form>
    );
};

LoginForm.defaultProps = {
    username: '',
    password: '',
    auth: false,
};

LoginForm.propTypes = {
    history: object.isRequired,
    auth: bool.isRequired,
    err: string,
    handleSubmit: func.isRequired,
    authenticate: func.isRequired,
    clearError: func.isRequired,
    username: string.isRequired,
    password: string.isRequired,
};

export default reduxForm({ form: 'login' })(LoginForm);
