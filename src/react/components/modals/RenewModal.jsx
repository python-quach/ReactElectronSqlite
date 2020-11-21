import React, { useEffect, useState } from 'react';
import { Segment, Modal, Button, Icon } from 'semantic-ui-react';
import { Form } from '../forms';
import RenewReceipt from '../receipts/RenewReceipt';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

function RenewModal(props) {
    const {
        showHistory,
        record,
        renewForm,
        renewMembership,
        clearRenew,
        invoice,
        content,
        left,
        color,
        size,
        kaka,
        findMembership,
        // clearMembershipError,
        // openBuy,
        // close,
        purchase,
        history,
        location,
    } = props;
    const [open, setOpen] = useState(false);
    const [renew, setRenew] = useState(false);

    // useEffect(() => {
    //     if (openBuy) {
    //         close(false);
    //     }
    // }, [close, openBuy]);

    useEffect(() => {
        if (open) {
            console.log({
                renewForm,
                invoice,
                record,
                renew,
                kaka,
                purchase,
                history,
                location,
            });
        }
    }, [
        open,
        renewForm,
        invoice,
        record,
        renew,
        kaka,
        purchase,
        history,
        location,
    ]);

    return (
        <Modal
            size='large'
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
                <Button
                    size={size || 'small'}
                    color={color || 'teal'}
                    floated={left}
                    // content='Renew'
                    content={content || 'Renew'}
                    onClick={() => {
                        showHistory(record.id);
                        // if (close) {
                        //     close(false);
                        // }
                        if (purchase) {
                            purchase(false);
                        }
                    }}
                />
            }>
            <Modal.Header>Customer Membership Renewal</Modal.Header>

            <Modal.Content>
                <Segment raised>
                    <Form.Renew record={record} renew={renew} kaka={kaka} />
                </Segment>
                {renew ? (
                    <RenewReceipt invoice={invoice} record={record} />
                ) : null}
                <pre>{JSON.stringify({ invoice, record }, null, 2)}</pre>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    color='red'
                    onClick={() => {
                        console.log(record.account);
                        clearRenew();
                        setOpen(false);
                        setRenew(false);
                        findMembership({ membership: record.account });
                        // if (close) {
                        //     close(false);
                        // }
                        // clearMembershipError();
                    }}>
                    <Icon name='remove' /> Done
                </Button>
                {!invoice || !renew ? (
                    <Button
                        disabled={
                            renewForm.values
                                ? !parseInt(renewForm.values.renewGallon) > 0
                                : false
                        }
                        color='blue'
                        onClick={() => {
                            // console.log(renewForm.values);
                            setRenew(true);
                            renewMembership(renewForm.values);
                            showHistory(record.id);
                            // findMembership({ id: record.id });
                            // clearMembershipError();

                            // if (close) {
                            //     close(false);
                            // }
                        }}>
                        <Icon name='cart arrow down' /> Renew Membership
                    </Button>
                ) : null}
            </Modal.Actions>
        </Modal>
    );
}

// TODO: need to change the variable kaka to something else more meaningful
const mapStateToProps = (state) => {
    return {
        kaka: state.form.renew ? state.form.renew.values : {},
    };
};

export default connect(mapStateToProps, actions)(RenewModal);
