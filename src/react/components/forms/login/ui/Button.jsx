import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Button = ({ username, password }) => {
    return (
        <Form.Button
            size='massive'
            disabled={!username || !password}
            color='facebook'
            type='submit'
            content='Login'
        />
    );
};

Button.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
};

export default Button;
