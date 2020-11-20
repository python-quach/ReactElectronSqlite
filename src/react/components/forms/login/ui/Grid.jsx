import React from 'react';
import { string, object, element } from 'prop-types';
import { Segment, Header, Grid, Popup, Icon } from 'semantic-ui-react';

const LoginGrid = ({
    columns,
    gridStyle,
    gridVerticalAlign,
    gridColumnWidth,
    popUpContent,
    iconName,
    iconColor,
    headerContent,
    children,
}) => (
    <Grid columns={columns} style={gridStyle} verticalAlign={gridVerticalAlign}>
        <Grid.Column />
        <Grid.Column style={gridColumnWidth}>
            <Segment raised>
                <Header>
                    <Popup
                        content={popUpContent}
                        trigger={<Icon name={iconName} color={iconColor} />}
                    />
                    <Header.Content content={headerContent} />
                </Header>
                {children}
            </Segment>
        </Grid.Column>
        <Grid.Column />
    </Grid>
);

LoginGrid.defaultProps = {
    columns: 'equal',
    gridStyle: { height: '100vh' },
    gridVerticalAlign: 'middle',
    gridColumnWidth: { maxWidth: 450 },
    popUpContent: 'Please enter require info',
    iconName: 'signup',
    iconColor: 'blue',
    headerContent: 'User Account Login',
};

LoginGrid.propTypes = {
    children: element.isRequired,
    columns: string,
    gridStyle: object,
    gridVerticalAlign: string,
    gridColumnWidth: object,
    popUpContent: string,
    iconName: string,
    iconColor: string,
    headerContent: string,
};

export default LoginGrid;
