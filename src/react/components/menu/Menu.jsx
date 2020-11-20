import React, { useState } from 'react';
import { Segment, Menu } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

function NavMenu({ auth, signout, clearMembership }) {
    const [activeItem, setActiveItem] = useState('/find');

    const history = useHistory();

    const handleNavMenuClick = (e, { name }) => {
        clearMembership();
        setActiveItem('/' + name);
    };

    if (auth) {
        return (
            <Segment raised>
                <Menu inverted color='blue' size='huge'>
                    <Menu.Item
                        as={Link}
                        to='/find'
                        name='find'
                        content='Find Membership'
                        active={activeItem === '/find'}
                        onClick={handleNavMenuClick}
                    />
                    <Menu.Item
                        as={Link}
                        to='/add'
                        name='add'
                        content='Add Membership'
                        active={activeItem === '/add'}
                        onClick={handleNavMenuClick}
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                            as={Link}
                            to='/'
                            name='signout'
                            onClick={() => signout(history)}
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth,
    };
};

export default connect(mapStateToProps, actions)(NavMenu);
