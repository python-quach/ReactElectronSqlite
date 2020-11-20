import React from 'react';
import { Field } from 'redux-form';
import { name } from '../helpers';

// function NameInput(props) {
//     return <Field {...props} normalize={name} />;
// }

const NameInput = (props) => <Field {...props} normalize={name} />;

export default NameInput;
