import React, { Fragment } from 'react';
import Input from './Input';

const Field = (props) => (
    <Fragment>
        <Input.Phone {...props} size='massive' />
        <Input.Membership {...props} size='massive' />
        <Input.Name
            name='firstName'
            placeholder='First Name'
            label='First Name'
            {...props}
        />

        <Input.Name
            name='lastName'
            label='Last Name'
            placeholder='Last Name'
            {...props}
        />
    </Fragment>
);

export default Field;
