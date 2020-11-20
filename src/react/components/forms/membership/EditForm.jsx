import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { todayDate } from '../../helpers';
import * as actions from '../../../../redux/actions';
import PhoneField from '../../../components/fields/EditPhone';

function EditForm(props) {
    // const edit = (data) => {
    //     console.log('EditMembership: ', { data });
    //     props.editMembership(data);
    // };

    return (
        // <Form onSubmit={props.handleSubmit(edit)}>
        <Form>
            <Form.Group>
                <Field
                    component={Form.Input}
                    name='id'
                    label='ID'
                    readOnly
                    error
                />
                <Field
                    component={Form.Input}
                    name='account'
                    label='Account'
                    readOnly
                    error
                />
                <Field component={Form.Input} name='first' label='First Name' />
                <Field component={Form.Input} name='last' label='Last Name' />
                <PhoneField />
            </Form.Group>
        </Form>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            todayDate: todayDate(),
            ...ownProps.record,
            ...(state.history[state.history.length - 1] || {
                GallonBuy: 0,
                GallonLeft: 0,
                RenewGallon: 0,
            }),
        },
    };
};

export default connect(
    mapStateToProps,
    actions
)(reduxForm({ form: 'edit', enableReinitialize: true })(EditForm));
