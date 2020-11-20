import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

export default function FirstName(props) {
    const { clear, clearMembershipError, error, type } = props;
    // console.log(object)
    return (
        <Field
            name='firstName'
            placeholder='First Name'
            label='First Name'
            component={Form.Input}
            normalize={(
                value,
                previousValue,
                allValues,
                previousAllValues,
                name
            ) => {
                const wordPattern = /^[a-zA-Z ]+$/;
                if (value.match(wordPattern) && value.length > 0) {
                    return (
                        value.charAt(0).toUpperCase() +
                        value.slice(1).replace(/\s/g, '').toLowerCase()
                    );
                } else {
                    if (value.length > 1) {
                        return previousValue;
                    } else {
                        return '';
                    }
                }
            }}
            onChange={() => {
                if (type !== 'add') {
                    clear(true, false, 'membership', 'phone');
                }
            }}
            onFocus={() => {
                // console.log(error);
                !error || clearMembershipError();
            }}
        />
    );
}
