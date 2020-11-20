import React from 'react';
import { Field } from 'redux-form';
import { normalizeMembership } from '../helpers';

function MembershipInput(props) {
    return <Field {...props} maxLength={5} normalize={normalizeMembership} />;
}

export default MembershipInput;
