import React from 'react';
import { Form, Segment, Header, Popup, Icon } from 'semantic-ui-react';
import Field from './Field';
import FindFormButton from './Button';
import { reduxForm } from 'redux-form';

const FindMembershipForm = ({
    handleSubmit,
    clearFields,
    data,
    find,
    clearMembershipError,
    phone,
    membership,
    firstName,
    lastName,
    clearMembership,
    children,
    reset,
    popUpContent,
    iconName,
    iconColor,
    headerContent,
}) => {
    return (
        <Segment>
            <Segment>
                <Header>
                    <Popup
                        content={popUpContent}
                        trigger={<Icon name={iconName} color={iconColor} />}
                    />
                    <Header.Content as='h1' content={headerContent} />
                </Header>

                <Form onSubmit={handleSubmit(find(reset))}>
                    <Form.Group>
                        <Field
                            clear={clearFields}
                            error={data.error}
                            clearMembershipError={clearMembershipError}
                        />
                        <FindFormButton
                            phone={phone}
                            membership={membership}
                            firstName={firstName}
                            lastName={lastName}
                            data={data}
                            clearMembership={clearMembership}
                        />
                    </Form.Group>
                </Form>
                {/* {children} */}
            </Segment>
            {children}
        </Segment>
    );
};

FindMembershipForm.defaultProps = {
    popUpContent: 'Please enter require info',
    iconName: 'search',
    iconColor: 'blue',
    headerContent: 'Find Membership',
};

export default reduxForm({ form: 'findMembership' })(FindMembershipForm);
