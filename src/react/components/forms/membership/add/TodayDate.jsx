import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

export default function TodayDate() {
    return (
        <Field
            className='AddTodayDate'
            name='todayDate'
            size='large'
            label='Today Date'
            component={Form.Input}
            width={2}
        />
    );
}
