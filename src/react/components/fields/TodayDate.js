import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'redux-form';

export default function TodayDate() {
    return <Field name='todayDate' label='Today Date' component={Form.Input} />;
}
