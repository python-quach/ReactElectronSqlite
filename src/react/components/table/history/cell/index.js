import React from 'react';
import { Label, Table } from 'semantic-ui-react';

export function GallonBuyCell(props) {
    const { record } = props;
    if (record.GallonBuy === 'RENEW') {
        return <Table.Cell positive>{record.GallonBuy}</Table.Cell>;
    } else {
        return <Table.Cell>{record.GallonBuy}</Table.Cell>;
    }
}

export function RenewGallonCell(props) {
    const { record } = props;
    if (record.GallonBuy === 'RENEW') {
        return <Table.Cell positive>{record.RenewGallon}</Table.Cell>;
    } else {
        return <Table.Cell>{record.RenewGallon}</Table.Cell>;
    }
}

export function RenewRibbonCell(props) {
    const { record } = props;
    if (record.GallonBuy === 'RENEW') {
        return (
            <Table.Cell>
                <Label color='green' ribbon>
                    {record.InvoiceId || ''}
                </Label>
            </Table.Cell>
        );
    } else {
        return (
            <Table.Cell>
                <Label ribbon>{record.InvoiceId || ''}</Label>
            </Table.Cell>
        );
    }
}
