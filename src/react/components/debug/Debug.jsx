import React, { useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import Message from './Message';
import { shape, string, object } from 'prop-types';
import { connect } from 'react-redux';

const Debug = (props) => {
    const {
        button: { enable, disable },
    } = props;

    const [disabled, setDisabled] = useState(true);

    const handleDisableMessage = () => {
        setDisabled((disabled) => !disabled);
    };

    return (
        <Segment raised>
            <Button
                content={disabled ? enable : disable}
                onClick={handleDisableMessage}
            />
            <Message disabled={disabled} data={props} />
        </Segment>
    );
};

Debug.defaultProps = {
    props: {},
    button: { enable: 'enable debug', disable: 'disable debug' },
};

Debug.propTypes = {
    props: object.isRequired,
    button: shape({
        enable: string,
        disable: string,
    }),
};

const mapStateToProps = (state) => {
    return {
        // form: state.form ? state.form : {},
        // user: state.user,
        membership: state.membership,
        // history: state.history,
        // account: state.account,
        // invoices: state.invoices,
    };
};

export default connect(mapStateToProps, null)(Debug);
