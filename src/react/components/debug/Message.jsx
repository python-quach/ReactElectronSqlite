import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ disabled, data }) => {
    if (disabled) return null;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

Message.defaultProps = {
    disabled: false,
    data: {},
};

Message.propTypes = {
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};

export default Message;
