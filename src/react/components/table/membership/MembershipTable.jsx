import React from 'react';
import { Segment, Table, Message } from 'semantic-ui-react';
import MembershipRow from './MembershipRow';

const MembershipTable = ({ data }) => {
    if (data.members ? data.members.length > 0 : null) {
        return (
            <Segment raised>
                {/* <Table celled color='grey' inverted> */}
                <Table celled color='blue'>
                    <Table.Header>
                        <Table.Row>
                            {/* <Table.HeaderCell>Record </Table.HeaderCell> */}
                            <Table.HeaderCell>Account </Table.HeaderCell>
                            <Table.HeaderCell>Member Since</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            {/* <Table.HeaderCell>Remain Gallon</Table.HeaderCell> */}
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <MembershipRow members={data.members} />
                    </Table.Body>
                </Table>
            </Segment>
        );
    } else {
        if (data.error) {
            return <Message error content={data.error} />;
        } else {
            return null;
        }
    }
};

export default MembershipTable;
