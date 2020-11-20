import React, { useState, useEffect } from 'react';
import { Modal, Segment, Button, Message } from 'semantic-ui-react';
import { Form } from '../forms';
import BuyReceipt from '../receipts/BuyReceipt';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

function BuyModal({
    header,
    size,
    leftButton,
    rightButton,
    record,
    showHistory,
    values,
    buyMembership,
    invoice,
    clearBuy,
}) {
    const [open, setOpenModal] = useState(false);
    const [purchase, setPurchase] = useState(false);

    useEffect(() => {
        if (open) {
            console.log({ record, purchase, values });
        }
    }, [open, record, purchase, values]);

    useEffect(() => {
        if (
            open &&
            Object.keys(values).length !== 0 &&
            values.totalGallon !== 0
        )
            console.log({ ...values });
    }, [open, values]);

    return (
        <Modal
            size={size || 'large'}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={open}
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            trigger={
                <Button
                    size='small'
                    color='pink'
                    content='Buy'
                    onClick={() => {
                        showHistory(record.id);
                    }}
                />
            }>
            <Modal.Header>{header || 'Default Header'}</Modal.Header>

            <Modal.Content>
                <Segment raised>
                    <Form.Buy
                        record={record}
                        purchase={purchase}
                        buy={values.buyGallon}
                        renew={values.RenewGallon}
                    />
                </Segment>
                {purchase ? (
                    <BuyReceipt invoice={invoice} record={record} />
                ) : null}
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </Modal.Content>

            <Modal.Actions>
                {values.length === 0 || values.totalGallon === 0 ? (
                    <Message
                        content='There are no more gallon left to buy, Please Renew Membership and Add Water'
                        negative
                    />
                ) : null}

                <Button
                    {...leftButton}
                    onClick={() => {
                        clearBuy();
                        setOpenModal(false);
                        setPurchase(false);
                    }}
                />
                {!invoice || values.totalGallon > 0 ? (
                    <Button
                        disabled={
                            parseInt(values.buyGallon) <= 0 ||
                            values.buyGallon === ''
                        }
                        {...rightButton}
                        onClick={() => {
                            buyMembership(values);
                            showHistory(record.id);
                            setPurchase(true);
                        }}
                    />
                ) : null}
            </Modal.Actions>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        invoice: state.membership.buy,
        renewInvoice: state.membership.renew,
        history: state.history,
        invoices: state.history,

        values: state.form.buy ? state.form.buy.values : {},
        renewForm: state.form.renew
            ? {
                  values: state.form.renew.values,
                  submitSucceeded: state.form.renew.submitSucceeded,
              }
            : {},
    };
};

export default connect(mapStateToProps, actions)(BuyModal);
