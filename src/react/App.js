import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu, Debug, Form } from './components';
// import { Menu, Form } from './components';
import './style.css';

const App = () => {
    return (
        <Router>
            <Menu />
            {/* <Debug /> */}
            <Switch>
                <Route exact path='/' component={Form.Login} />
                <Route exact path='/find' component={Form.Find} />
                <Route exact path='/add' component={Form.Add} />
            </Switch>
        </Router>
    );
};

export default App;
