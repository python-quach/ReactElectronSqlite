import React from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';

const SearchInput = (fields) => {
    return (
        <Form.Input label='Search' className='searchMe' width={4}>
            <Input icon focus>
                <input {...fields.input} />
                <Icon name='search' color='blue' />
            </Input>
        </Form.Input>
    );
};

export default SearchInput;
