import React from 'react';
import Grid from './ui/Grid';
import Form from './ui/Form';
import { Message } from 'semantic-ui-react';
import { object, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import * as actions from '../../../../redux/actions';

const LoginContainer = (props) => {
    const { err } = props;
    return (
        <Grid>
            <Form {...props}>
                <Message error content={err} />
            </Form>
        </Grid>
    );
};

LoginContainer.propTypes = {
    history: object.isRequired,
    username: string,
    password: string,
    err: string,
    auth: bool,
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('login');
    return {
        username: selectFormData(state, 'username'),
        password: selectFormData(state, 'password'),
        err: state.user.error,
        auth: state.user.auth,
    };
};

export default connect(mapStateToProps, actions)(LoginContainer);
