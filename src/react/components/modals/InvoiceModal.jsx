import React, { useEffect, useState } from 'react';
import {
    Segment,
    Modal,
    Button,
    Table,
    Pagination,
    Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

const InvoiceModal = (props) => {
    const {
        id,
        getInvoices,
        invoices,
        count,
        totalPurchaseGallon,
        remainingGallon,
        data,
    } = props;
    const [open, setOpenModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        if (open) console.log({ count });
    }, [count, open]);

    useEffect(() => {
        if (open)
            console.log('InvoiceModal:', {
                open,
                id,
                limit,
                offset,
                invoices,
                totalPurchaseGallon,
                remainingGallon,
                data,
            });
    }, [
        open,
        id,
        limit,
        offset,
        invoices,
        totalPurchaseGallon,
        remainingGallon,
        data,
    ]);

    useEffect(() => {
        if (open) getInvoices({ id, limit, offset });
    }, [offset, id, limit, getInvoices, open]);

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    return (
        <Modal
            size='large'
            closeOnEscape={false}
            closeOnDimmerClick={false}
            open={open}
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            trigger={
                <Button
                    size='massive'
                    color='olive'
                    content='invoice'
                    onClick={() => console.log('Modal Open')}
                />
            }>
            <Modal.Header></Modal.Header>

            <Modal.Content>
                <Segment raised>
                    <InvoiceTable invoices={invoices}>
                        <Buttons
                            total={data.totalPurchaseGallon}
                            remain={remainingGallon}
                        />

                        <Pagination
                            // color='blue'
                            // inverted
                            // floated='right'
                            activePage={activePage}
                            onPageChange={onChange}
                            totalPages={Math.ceil(count / 10)}
                            ellipsisItem={null}
                        />
                    </InvoiceTable>
                </Segment>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    content='Done'
                    secondary
                    onClick={() => {
                        setLimit(10);
                        setOffset(0);
                        setOpenModal(false);
                    }}
                />
                <Button
                    content='Save'
                    primary
                    onClick={() => setOpenModal(false)}
                />
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        data: state.invoices,
        invoices: state.invoices.invoices,
        count: state.invoices.count,
        totalPurchase: state.invoices.totalPurchaseGallon,
        remainingGallon: state.invoices.remainingGallon,
    };
};

export default connect(mapStateToProps, { getInvoices: actions.getInvoices })(
    InvoiceModal
);

const InvoiceTable = (props) => {
    const { invoices } = props;
    useEffect(() => {
        console.log('InvoiceTable: ', { invoices });
    });

    if (invoices) {
        return (
            // <Table celled fixed singleLine>
            // <Table celled compact>
            <Table celled compact size='large' singleLine color='blue'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Invoice</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Membership</Table.HeaderCell>
                        <Table.HeaderCell>Purchase Date</Table.HeaderCell>
                        <Table.HeaderCell>Gallon Buy</Table.HeaderCell>
                        <Table.HeaderCell>Gallon Left</Table.HeaderCell>
                        <Table.HeaderCell>Renew Gallon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {invoices.map((invoice, index) => {
                        const {
                            FirstName,
                            GallonBuy,
                            GallonLeft,
                            InvoiceDate,
                            InvoiceId,
                            LastName,
                            MemberAccount,
                            RenewGallon,
                        } = invoice;
                        return (
                            <Table.Row className='renewTableRow' key={index}>
                                <Table.Cell className='InvoiceCell'>
                                    <Label
                                        size='large'
                                        color={
                                            GallonBuy === 'RENEW'
                                                ? 'green'
                                                : 'red'
                                        }
                                        ribbon>
                                        {InvoiceId}
                                    </Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {FirstName + ' ' + LastName}
                                </Table.Cell>
                                <Table.Cell>{MemberAccount}</Table.Cell>
                                <Table.Cell>{InvoiceDate}</Table.Cell>
                                <Table.Cell
                                    className='RenewGallon'
                                    positive={GallonBuy === 'RENEW' || false}
                                    negative={GallonBuy !== 'RENEW' || false}
                                    textAlign='center'>
                                    {GallonBuy}
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    {GallonLeft}
                                </Table.Cell>
                                <Table.Cell
                                    className='GallonBuy'
                                    positive={GallonBuy === 'RENEW' || false}
                                    negative={GallonBuy !== 'RENEW' || false}
                                    textAlign='center'>
                                    {RenewGallon}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                            {props.children}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    } else {
        return null;
    }
};

const Buttons = ({ total, remain }) => (
    <div>
        <Button
            color='blue'
            floated='right'
            content='Gallon Remaining'
            // icon='fork'
            label={{
                basic: true,
                color: 'blue',
                pointing: 'left',
                content: remain,
            }}
        />
        <Button
            color='red'
            floated='right'
            content='Total Gallon Bought'
            // icon='heart'
            label={{
                basic: true,
                color: 'red',
                pointing: 'left',
                content: total,
            }}
        />
    </div>
);
