import React from 'react';
import { Modal, Button, Icon, Pagination } from 'semantic-ui-react';
import HistoryTable from '../table/history/HistoryTable';

function HistoryModal(props) {
    const { showHistory, record, invoices } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            open={open}
            size='large'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
                <Button
                    size='small'
                    content='History'
                    onClick={() => {
                        console.log('history');
                        showHistory(record.id);
                        console.log('invoices', invoices);
                    }}
                />
            }>
            <Modal.Header>Customer History</Modal.Header>
            <Modal.Content>
                <Pagination totalPages={10} />
                <HistoryTable invoice={invoices} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default HistoryModal;
