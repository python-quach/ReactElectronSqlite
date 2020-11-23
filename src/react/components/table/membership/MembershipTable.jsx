import React from 'react';
import { Segment, Table, Message } from 'semantic-ui-react';
import MembershipRow from './MembershipRow';

const MembershipTable = ({ data }) => {
    console.log({ data });
    if (data.members ? data.members.length > 0 : null) {
        return (
            <Segment raised>
                <Table
                    size='large'
                    columns={16}
                    celled
                    color='blue'
                    compact
                    singleLine
                    striped
                    padded
                    inverted
                    selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h2>Account</h2>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h2>Member Since</h2>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h2>Name</h2>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h2>Phone</h2>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h2>Actions</h2>
                            </Table.HeaderCell>
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
            return (
                <Message error content={data.error} as='h1' size='massive' />
            );
        } else {
            return null;
        }
    }
};

export default MembershipTable;
