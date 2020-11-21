import React from 'react';
import { Segment, Table } from 'semantic-ui-react';
import HistoryRow from './HistoryRow';

function HistoryTable({ invoice }) {
    if (invoice && invoice.length > 0) {
        return (
            <Segment raised>
                <Table celled compact>
                    {/* <Table color='blue' inverted celled compact size='large'> */}
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Invoice #</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>
                                Membership Account
                            </Table.HeaderCell>
                            <Table.HeaderCell>Purchase Date</Table.HeaderCell>
                            <Table.HeaderCell>Gallon Buy</Table.HeaderCell>
                            <Table.HeaderCell>Gallon Left</Table.HeaderCell>
                            <Table.HeaderCell>Renew Gallon</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <HistoryRow invoice={invoice} />
                    </Table.Body>
                </Table>
            </Segment>
        );
    } else {
        return null;
    }
}

export default HistoryTable;
