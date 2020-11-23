import React, { useEffect, useState } from 'react';
import { Table, Button, Label, Icon } from 'semantic-ui-react';
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

    // const test = (gallon) => {
    //     console.log(gallon);
    //     if (parseInt(gallon) < 10) {
    //         return `&nbps ${gallon}`;
    //     } else {
    //         return gallon;
    //     }
    // };

    return rows.map(
        ({ id, account, since, first, last, phone, gallon }, index) => (
            <Table.Row key={index}>
                <Table.Cell>
                    <Label
                        ribbon
                        content={account}
                        size='massive'
                        color={index % 2 !== 0 ? 'olive' : 'teal'}
                    />
                    {/* <Label
                        tag
                        // ribbon='right'
                        // ribbon='left'
                        content={'Gallon Remain ' + gallon || 0}
                        // content={gallon ? test(gallon) : 0}
                        size='huge'
                        color={index % 2 !== 0 ? 'olive' : 'teal'}
                        icon='fork'
                    /> */}
                    <Button
                        color='vk'
                        content='Gallon Remaining'
                        size='massive'
                        // icon='fork'
                        label={{
                            // as='h1',
                            basic: true,
                            as: 'a',
                            size: 'huge',
                            // size: 'tiny',
                            color: 'blue',
                            pointing: 'left',
                            content: gallon || 0,
                            // content: gallon ? test(gallon) : 0,
                        }}
                    />
                    {/* {gallon} */}
                </Table.Cell>
                {/* <Table.Cell  content={since} /> */}
                <Table.Cell>
                    <Label
                        size='massive'
                        // as='a'
                        content={since}
                        icon='calendar'
                    />
                    {/* 
                    <Label pointing='left' size='huge'>
                        {since}
                        <Icon name='mail' />
                    </Label> */}
                    {/* <h1>{since}</h1> */}
                </Table.Cell>
                {/* <Table.Cell content={first + ' ' + last} /> */}
                <Table.Cell>
                    <Label
                        size='massive'
                        // as='a'
                        content={first + '   ' + last}
                        icon='user outline'
                    />
                </Table.Cell>
                {/* <Table.Cell content={formatPhoneNumber(phone)} /> */}
                <Table.Cell textAlign='left'>
                    <Label
                        size='massive'
                        // as='a'
                        content={formatPhoneNumber(phone)}
                        icon='phone'
                    />
                </Table.Cell>

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
                    {/* <Button
                        content='Cancel Membership'
                        size='massive'
                        color='red'
                        onClick={() => {
                            deleteMembership(id);
                            setRows((row) =>
                                row.filter((record) => record.id !== id)
                            );
                        }}
                    /> */}
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
