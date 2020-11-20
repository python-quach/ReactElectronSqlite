import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

export default function Membership(props) {
    const { clear, clearMembershipError, error, type } = props;
    // const minValue = (min) => (value) => (value && value < min ? `Must be at least ${min}` : undefined);
    // const minValue5 = minValue(5);
    return (
        <Field
            name='membership'
            placeholder='xxxxxx'
            label='Membership #'
            component={Form.Input}
            maxLength={5}
            normalize={(value, prevValue) => {
                const numberPattern = /^[0-9]+$/g;
                console.log(value);
                if (value.match(numberPattern)) {
                    return value;
                } else {
                    if (value.length > 1) {
                        return prevValue;
                    } else {
                        return '';
                    }
                }
            }}
            onChange={() =>
                type === 'add' ||
                clear(true, false, 'phone', 'firstName', 'lastName')
            }
            onFocus={() => !error || clearMembershipError()}
        />
    );
}
