import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export default function ReduxDebugMessage(props) {
    const { name, value } = props;

    const header = `Store: ${name}`;
    const debugMessage = `${JSON.stringify(value, null, 2)}`;

    return (
        <Segment raised secondary>
            <Header as='h5' color='blue'>
                <Header.Content>
                    <p>{header}</p>
                    <pre>{debugMessage}</pre>
                </Header.Content>
            </Header>
        </Segment>
    );
}
