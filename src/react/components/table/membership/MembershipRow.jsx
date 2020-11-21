import React, { useEffect, useState } from 'react';
import { Table, Button, Label } from 'semantic-ui-react';
import { formatPhoneNumber } from '../../helpers';
import { Modal } from '../../modals';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions';

const MembershipRow = (props) => {
    const {
        deleteMembership,
        showHistory,
        buyMembership,
        values,
        invoice,
        clearBuy,
        clearRenew,
        renewInvoice,
        renewForm,
        renewMembership,
        members,
    } = props;

    const [rows, setRows] = useState(members);

    useEffect(() => {
        setRows((rows) => {
            return members;
        });
    }, [members]);

    useEffect(() => {
        console.log(`MembershipRow: `, { values, renewForm, members, invoice });
        // members.map((record, index) => {
        //     console.log(index);
        // });
    }, [values, renewForm, members, invoice]);

    return rows.map(
        ({ id, account, since, first, last, phone, gallon }, index) => (
            <Table.Row key={index}>
                <Table.Cell>
                    <Label
                        ribbon
                        content={'Membership # ' + account}
                        size='large'
                        color={index % 2 !== 0 ? 'olive' : 'teal'}
                    />
                    <Button
                        color='vk'
                        floated='right'
                        content='Gallon Remaining'
                        // icon='fork'
                        label={{
                            basic: true,
                            color: 'blue',
                            pointing: 'left',
                            content: gallon || 0,
                        }}
                    />
                    {/* {gallon} */}
                </Table.Cell>
                <Table.Cell content={since} />
                <Table.Cell content={first + ' ' + last} />
                <Table.Cell content={formatPhoneNumber(phone)} />
                <Table.Cell>
                    <Modal.Buy
                        setRows={setRows}
                        members={members}
                        record={{ id, account, since, first, last, phone }}
                        values={values}
                        clearBuy={clearBuy}
                        invoice={invoice}
                        showHistory={showHistory}
                        buyMembership={buyMembership}
                        header={'Membership Water Buy'}
                        leftButton={{ color: 'red', content: 'Done' }}
                        rightButton={{ color: 'blue', content: 'Buy' }}
                    />
                    <Modal.Renew
                        renewMembership={renewMembership}
                        showHistory={showHistory}
                        renewForm={renewForm}
                        record={{ id, account, since, first, last, phone }}
                        clearRenew={clearRenew}
                        invoice={renewInvoice}
                    />
                    <Modal.Invoice id={id} />
                    <Modal.Edit
                        record={{ id, account, since, first, last, phone }}
                    />
                    <Button
                        content='Cancel Membership'
                        size='small'
                        color='red'
                        onClick={() => {
                            deleteMembership(id);
                            setRows((row) =>
                                row.filter((record) => record.id !== id)
                            );
                        }}
                    />
                </Table.Cell>
            </Table.Row>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        invoice: state.membership.buy,
        renewInvoice: state.membership.renew,
        history: state.history,
        invoices: state.history,
        renewForm: state.form.renew ? { values: state.form.renew.values } : {},
        gallonTotal: state.membership.totalGallon,
        gigi: state.invoices.invoices,

        values: state.form.buy ? state.form.buy.values : {},
    };
};

export default connect(mapStateToProps, actions)(MembershipRow);
