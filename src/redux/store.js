import { combineReducers, createStore, applyMiddleware } from 'redux';
import {
    userReducer,
    membershipReducer,
    historyReducer,
    accountReducer,
    invoiceReducer,
} from './reducers';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    membership: membershipReducer,
    history: historyReducer,
    account: accountReducer,
    invoices: invoiceReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
