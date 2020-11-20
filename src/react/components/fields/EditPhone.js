import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Field } from 'redux-form';

function PhoneField(props) {
    return (
        <PhoneInput
            {...props.input}
            specialLabel={'Phone'}
            disableCountryCode={true}
            disableDropdown={true}
            onlyCountries={['us']}
            defaultMask={'(...)-...-....'}
            alwaysDefaultMask={true}
            placeholder={'(408)-123-4567'}
            country={'us'}
        />
    );
}

export default function Phone(props) {
    return (
        <Field
            name='phone'
            component={PhoneField}
            normalize={(value) => {
                const numberPattern = /\d+/g;
                if (value.match(numberPattern)) {
                    return value.match(numberPattern).join('');
                }
            }}
        />
    );
}
