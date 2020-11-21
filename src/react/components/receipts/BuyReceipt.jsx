import React, { useEffect } from 'react';
import { Segment, Table, Label } from 'semantic-ui-react';

function BuyReceipt({ invoice, record }) {
    useEffect(() => {
        if (invoice) console.log({ invoice, record });
    }, [invoice, record]);

    if (invoice) {
        return (
            <Segment raised>
                <Table celled color='blue' key='blue' inverted size='large'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Receipt</Table.HeaderCell>
                            <Table.HeaderCell>Membership #</Table.HeaderCell>
                            <Table.HeaderCell>InvoiceDate</Table.HeaderCell>
                            <Table.HeaderCell>GallonBuy</Table.HeaderCell>
                            <Table.HeaderCell>GallonLeft</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Label ribbon color='green' size='large'>
                                    Invoice: {invoice.InvoiceId}
                                </Label>
                            </Table.Cell>
                            <Table.Cell>{record.account}</Table.Cell>
                            <Table.Cell>{invoice.InvoiceDate}</Table.Cell>
                            <Table.Cell>{invoice.GallonBuy}</Table.Cell>
                            <Table.Cell>{invoice.GallonLeft}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Segment>
        );
    } else {
        return null;
    }
}

export default BuyReceipt;
