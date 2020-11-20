import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

export default function LastName(props) {
    const { clear, clearMembershipError, error, type } = props;
    return (
        <Field
            name='lastName'
            label='Last Name'
            placeholder='Last Name'
            component={Form.Input}
            normalize={(value, previousValue, allValues, previousAllValues, name) => {
                const wordPattern = /^[a-zA-Z ]+$/;
                if (value.match(wordPattern) && value.length > 0) {
                    return value.charAt(0).toUpperCase() + value.slice(1).replace(/\s/g, '').toLowerCase();
                } else {
                    if (value.length > 1) {
                        return previousValue;
                    } else {
                        return '';
                    }
                }
            }}
            onChange={() => type === 'add' || clear(true, false, 'membership', 'phone')}
            onFocus={() => !error || clearMembershipError()}
        />
    );
}
