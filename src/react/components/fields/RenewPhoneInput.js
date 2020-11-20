import React from 'react';
import PhoneInput from 'react-phone-input-2';

export default function RenewPhoneInput(props) {
    return (
        <PhoneInput
            {...props.input}
            inputProps={{ readOnly: true }}
            specialLabel={'Phone'}
            disableCountryCode={true}
            disableDropdown={true}
            onlyCountries={['us']}
            defaultMask={'(...)-...-....'}
            alwaysDefaultMask={true}
            placeholder={'(408)-123-4567'}
            country={'us'}
            containerClass='four wide field'
            // containerClass='three wide field'
            inputClass='ui focus input '
            inputStyle={{
                // backgroundColor: 'rgb(87 194 226 / 20%',
                color: '#134469',
                fontWeight: 'bold',
                fontSize: 'large',
                // width: '168.375px',
            }}
        />
    );
}

// export default RenewPhoneField;
