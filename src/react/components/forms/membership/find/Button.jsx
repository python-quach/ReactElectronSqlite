import React, { Fragment } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const FindFormButton = ({
    phone,
    membership,
    firstName,
    lastName,
    data,
    clearMembership,
    submitIcon,
    submitPosition,
    submitContent,
    submitColor,
    submitType,
    submitStyle,
}) => {
    return (
        <Fragment>
            <Form.Button
                disabled={
                    (!phone && !membership && !(firstName && lastName)) ||
                    (membership
                        ? membership.length < 5
                        : false || phone
                        ? phone.length < 14
                        : false && !(firstName && lastName))
                }
                icon={submitIcon}
                labelPosition={submitPosition}
                content={submitContent}
                color={submitColor}
                type={submitType}
                style={submitStyle}
            />
            <Button
                disabled={!data.members}
                icon='delete'
                labelPosition='right'
                content='Clear'
                color='red'
                style={{ marginTop: '24px' }}
                onClick={(e) => {
                    e.preventDefault();
                    clearMembership();
                }}
            />
        </Fragment>
    );
};

FindFormButton.defaultProps = {
    phone: '',
    membership: '',
    firstName: '',
    lastName: '',
    submitIcon: 'search',
    submitPosition: 'left',
    submitContent: 'Find',
    submitColor: 'blue',
    submitType: 'submit',
    submitStyle: { marginTop: '24px' },
};

FindFormButton.propTypes = {
    phone: PropTypes.string.isRequired,
    membership: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

export default FindFormButton;
