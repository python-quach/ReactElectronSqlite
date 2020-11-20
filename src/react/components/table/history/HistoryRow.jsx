import React from 'react';
import { GallonBuyCell, RenewGallonCell, RenewRibbonCell } from './cell';
import { Table } from 'semantic-ui-react';

function History({ invoice }) {
    return invoice.map((record, index) => (
        <Table.Row key={index}>
            <Table.Cell as={RenewRibbonCell} record={record} />
            <Table.Cell content={record.FirstName + '  ' + record.LastName} />
            <Table.Cell content={record.MemberAccount} />
            <Table.Cell>{record.InvoiceDate}</Table.Cell>
            <Table.Cell as={GallonBuyCell} record={record} />
            <Table.Cell>{record.GallonLeft}</Table.Cell>
            <Table.Cell as={RenewGallonCell} record={record} />
        </Table.Row>
    ));
}

export default History;
