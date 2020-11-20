import React, { useEffect } from 'react';
import Table from '../../table';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import * as actions from '../../../../redux/actions';
import { formValueSelector } from 'redux-form';
import Form from './find/Form';

const FindMembershipForm = (props) => {
    const { auth, history, data, findMembership } = props;
    useEffect(() => {
        if (!auth) history.push('/');
    }, [history, auth]);

    const find = (reset) => (values) => {
        props.clearMembership();
        findMembership({
            ...values,
            phone: values.phone ? values.phone.replace(/[^\d]/g, '') : '',
        });
        reset();
    };

    if (auth)
        return (
            <>
                <Form {...props} find={find}>
                    {/* <Table.Membership data={data} /> */}
                </Form>
                {data.members ? (
                    <Segment raised>
                        <Table.Membership data={data} />
                    </Segment>
                ) : null}
            </>
        );

    return null;
};

const mapStateToProps = (state) => {
    const selectFormData = formValueSelector('findMembership');

    return {
        auth: state.user.auth,
        data: state.membership,
        phone: selectFormData(state, 'phone'),
        firstName: selectFormData(state, 'firstName'),
        lastName: selectFormData(state, 'lastName'),
        membership: selectFormData(state, 'membership'),
    };
};

export default connect(mapStateToProps, actions)(FindMembershipForm);
