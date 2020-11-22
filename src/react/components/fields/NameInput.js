import React from 'react';
import { Field } from 'redux-form';
import { name } from '../helpers';

const NameInput = (props) => <Field {...props} normalize={name} />;

export default NameInput;
