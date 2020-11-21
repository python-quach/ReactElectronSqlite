import React, { useState, useEffect } from 'react';
import { Segment, Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';

function NavMenu({
    auth,
    signout,
    clearMembership,
    location,
    history,
    updateActiveItem,
}) {
    // const history = useHistory();
    // console.log(history.location.pathname);
    // const [activeItem, setActiveItem] = useState('/find');
    const [activeItem, setActiveItem] = useState(location.pathname);

    // const history = useHistory();

    const handleNavMenuClick = (e, { name }) => {
        clearMembership();
        setActiveItem('/' + name);
    };

    useEffect(() => {
        console.log(location.pathname);
        setActiveItem(location.pathname);
    }, [setActiveItem, location.pathname]);

    if (auth) {
        return (
            <Segment raised>
                <Menu inverted color='blue' size='huge'>
                    <Menu.Item
                        as={Link}
                        to='/find'
                        name='find'
                        content='Find Membership'
                        // active={activeItem === '/find'}
                        active={activeItem === '/find'}
                        onClick={handleNavMenuClick}
                    />
                    <Menu.Item
                        as={Link}
                        to='/add'
                        name='add'
                        content='Add Membership'
                        active={activeItem === '/add'}
                        // active={activeItem === '/add'}
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
        activeItem: state.menu.activeItem,
    };
};

export default withRouter(connect(mapStateToProps, actions)(NavMenu));
