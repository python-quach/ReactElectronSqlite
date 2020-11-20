// REACT
import React from 'react';
import ReactDOM from 'react-dom';

// REACT-REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// COMPONENTS
import App from './react/App';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
