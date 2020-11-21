import React, { useEffect } from 'react';
import {
    Segment,
    Header,
    Form,
    Message,
    Button,
    Icon,
    Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { todayDate } from '../../helpers';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions';
import Field from '../../fields';
import { reduxForm, formValueSelector } from 'redux-form';
import RenewForm from './RenewForm';
import RenewReceipt from '../../receipts/RenewReceipt';

function AddForm(props) {
    const {
        auth,
        history,
        data,
        clearMembershipError,
        addNewMembership,
        reset,
        phone,
        membership,
        firstName,
        lastName,
        handleSubmit,
        addForm,
        record,
        kaka,
        invoice,
        renewMembership,
        showHistory,
        clearMembership,
        location,
        clearRenew,
        clearHistory,
        clearFields,
    } = props;

    useEffect(() => {
        console.log('AddForm: ', { data, history, location });
        // clearRenew();s
        clearHistory();
    }, [data, history, location, clearRenew, clearHistory]);

    useEffect(() => {
        if (addForm.todayDate) console.log('Redux: ', { addForm });
    }, [addForm]);

    useEffect(() => {
        if (!auth) {
            history.push('/');
        }
    }, [history, auth]);

    useEffect(() => {
        return () => {
            console.log('Do some cleanup');
        };
    }, []);

    if (auth) {
        return (
            <Segment raised>
                <Segment raised>
                    <Header>
                        <Header.Content>Add New Membership</Header.Content>
                    </Header>
                    <Form
                        onSubmit={handleSubmit((values) => {
                            console.log('handleSubmit: ', values);
                            addNewMembership(values);
                            clearMembership(); // Remove this if it doesn work
                            clearRenew();
                            clearFields();
                            reset();
                        })}>
                        <Form.Group>
                            <Field.Phone
                                clearMembershipError={clearMembershipError}
                                error={data.error}
                                type='add'
                            />
                            <Field.Name
                                onFocus={() => {
                                    !data.error || clearMembershipError();
                                }}
                                name='firstName'
                                component={Form.Input}
                                placeholder='First Name'
                                label='First Name'
                            />
                            <Field.Name
                                onFocus={() => {
                                    !data.error || clearMembershipError();
                                }}
                                name='lastName'
                                component={Form.Input}
                                placeholder='Last Name'
                                label='Last Name'
                            />
                            <Field.MembershipNumber
                                onFocus={() => {
                                    !data.error || clearMembershipError();
                                }}
                                name='membership'
                                component={Form.Input}
                                placeholder='xxxxx'
                                label='Membership #'
                            />
                            <Field.TodayDate />
                        </Form.Group>
                        <Form.Button
                            disabled={
                                !phone ||
                                !membership ||
                                !firstName ||
                                !lastName ||
                                (membership ? membership.length < 5 : false) ||
                                (phone ? phone.length < 10 : false)
                            }
                            icon='address card'
                            labelPosition='right'
                            content='Add Membership'
                            color='blue'
                            style={{ marginTop: '24px' }}
                        />
                    </Form>
                    {data.error ? (
                        <Message content={data.error} negative />
                    ) : null}
                    {/* <pre>
                        {JSON.stringify(
                            { addForm, data, kaka, invoice },
                            null,
                            2
                        ) || 'no membership yet'}
                    </pre> */}
                </Segment>
                {data.members ? (
                    <Segment raised>
                        <RenewForm record={record} kaka={kaka} />
                        <RenewReceipt invoice={invoice} record={record} />
                    </Segment>
                ) : null}
                <Grid>
                    <Grid.Column width={10}></Grid.Column>
                    <Grid.Column width={6}>
                        {data.members ? (
                            <>
                                <Button
                                    floated='right'
                                    disabled={
                                        kaka ? kaka.renewGallon === 0 : false
                                    }
                                    color='blue'
                                    onClick={() => {
                                        renewMembership(kaka);
                                        showHistory(record.id);
                                        // clearRenew();
                                    }}>
                                    <Icon name='cart arrow down' /> Add Gallon
                                </Button>
                                <Button
                                    as={Link}
                                    floated='right'
                                    color='red'
                                    to='/find'
                                    onClick={() => {
                                        clearRenew();
                                        // clearMembership();
                                        // history.goBack();
                                        history.push('/find');

                                        clearHistory();
                                    }}>
                                    <Icon name='remove' /> Done
                                </Button>
                            </>
                        ) : null}
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('addMembership');
    return {
        kaka: state.form.renew ? state.form.renew.values : {},
        invoice: state.membership.renew,
        record: state.membership.members ? state.membership.members[0] : null,
        auth: state.user.auth,
        data: state.membership,
        initialValues: {
            todayDate: todayDate(),
        },
        addForm: state.form.addMembership
            ? state.form.addMembership.values
            : {},
        phone: selectFormData(state, 'phone'),
        firstName: selectFormData(state, 'firstName'),
        lastName: selectFormData(state, 'lastName'),
        membership: selectFormData(state, 'membership'),
    };
};

const ReduxForm = reduxForm({ form: 'addMembership' })(AddForm);

export default connect(mapStateToProps, actions)(ReduxForm);
