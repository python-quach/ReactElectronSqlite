import React, { Fragment } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../../../../redux/actions';

import PropTypes from 'prop-types';

const FindFormButton = ({
    phone,
    membership,
    firstName,
    lastName,
    data,
    clearMembership,
    submitContent,
    submitColor,
    submitType,
    submitStyle,
    history,
    signout,
}) => {
    return (
        <Fragment>
            <Button.Group>
                <Form.Button
                    disabled={
                        (!phone && !membership && !(firstName && lastName)) ||
                        (membership
                            ? membership.length < 5
                            : false || phone
                            ? phone.length < 14
                            : false && !(firstName && lastName))
                    }
                    content={submitContent}
                    color={submitColor}
                    type={submitType}
                    style={submitStyle}
                    size='massive'
                />
                <Button.Or style={{ marginTop: '14px' }} size='massive' />
                <Button
                    disabled={!data.members}
                    content='Clear'
                    size='massive'
                    color='youtube'
                    // style={{ marginTop: '24px' }}
                    onClick={(e) => {
                        e.preventDefault();
                        clearMembership();
                    }}
                />
                {/* <Button.Or style={{ marginTop: '14px' }} size='massive' />
                <Button
                    content='Add'
                    size='massive'
                    color='instagram'
                    // style={{ marginTop: '24px' }}
                    onClick={(e) => {
                        e.preventDefault();
                        clearMembership();
                    }}
                />
                <Button.Or style={{ marginTop: '14px' }} size='massive' />
                <Button
                    as={Link}
                    to='/'
                    content='Logout'
                    size='massive'
                    color='facebook'
                    // style={{ marginTop: '24px' }}
                    onClick={(e) => {
                        signout();
                        // e.preventDefault();
                        // clearMembership();
                        // history.push('/');
                    }}
                /> */}
            </Button.Group>
        </Fragment>
    );
};

FindFormButton.defaultProps = {
    phone: '',
    membership: '',
    firstName: '',
    lastName: '',
    submitContent: 'Find',
    submitColor: 'facebook',
    submitType: 'submit',
    // submitStyle: { marginTop: '24px' },
};

FindFormButton.propTypes = {
    phone: PropTypes.string.isRequired,
    membership: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

export default connect(null, actions)(withRouter(FindFormButton));
