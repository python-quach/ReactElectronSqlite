import React, { useState } from 'react';
import { Segment, Modal, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Form } from '../forms/';

function EditModal(props) {
    const { record } = props;
    const [open, setOpen] = useState(false);

    return (
        <Modal
            size='fullscreen'
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
                <Button
                    size='small'
                    color='yellow'
                    content='Edit'
                    onClick={() => {}}
                />
            }>
            <Modal.Header>Edit Account</Modal.Header>
            <Modal.Content>
                <Segment raised>
                    <Form.Edit record={record} />
                </Segment>
            </Modal.Content>

            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Close
                </Button>
                <Button
                    color='blue'
                    onClick={() => {
                        console.log(props.store.form.edit.values);
                        props.editMembership(props.store.form.edit.values);
                        props.findMembership(record.id);
                        setOpen(false);
                    }}>
                    <Icon name='edit' /> Update membership
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        store: state,
    };
};

export default connect(mapStateToProps, actions)(EditModal);
