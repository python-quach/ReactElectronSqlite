import {
    AUTH_USER,
    SIGN_OUT,
    CLEAR_ERROR,
    ADD_MEMBERSHIP,
    FIND_MEMBERSHIP,
    CLEAR_MEMBERSHIP_ERROR,
    DELETE_MEMBERSHIP,
    GET_HISTORY,
    LOAD,
    RENEW_MEMBERSHIP,
    BUY_MEMBERSHIP,
    CLEAR_BUY,
    CLEAR_RENEW,
    GET_INVOICES,
    GET_TOTAL_GALLON,
    CLEAR_MEMBERSHIP,
    EDIT_MEMBERSHIP,
} from './types';

const initialStateInvoice = {
    invoices: null,
    count: null,
    totalPurchaseGallon: null,
    remainingGallon: null,
    test: null,
};

export function invoiceReducer(state = initialStateInvoice, action) {
    switch (action.type) {
        case GET_INVOICES:
            return {
                ...state,
                invoices: action.payload.rows,
                count: action.payload.count,
                totalPurchaseGallon: action.payload.totalPurchaseGallon,
                remainingGallon: action.payload.remainingGallon,
                test: action.payload.test,
            };
        case SIGN_OUT:
            return {
                ...state,
                invoices: null,
                count: null,
                totalPurchaseGallon: null,
                remainingGallon: null,
                test: null,
            };
        default:
            return state;
    }
}

// import * as actionTypes from '../types';

export function userReducer(state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return action.payload;
        case SIGN_OUT:
            return {};
        case CLEAR_ERROR:
            return {};
        default:
            return state;
    }
}

export function historyReducer(state = [], action) {
    switch (action.type) {
        case SIGN_OUT:
            return [];
        case GET_HISTORY:
            return action.payload;
        default:
            return state;
    }
}

const initialState = {
    members: null,
    member: null,
    renew: null,
    buy: null,
    error: null,
    totalGallon: 0,
};

export function membershipReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_MEMBERSHIP:
            if (payload.error) {
                console.log(payload.error);
                return {
                    ...state,
                    error: payload.error,
                };
            }
            return {
                ...state,
                members: payload,
                // member: payload,
            };
        case FIND_MEMBERSHIP:
            return {
                ...state,
                members: !payload.error ? payload : null,
                error: payload.error ? payload.error : null,
            };
        case RENEW_MEMBERSHIP:
            return {
                ...state,
                renew: payload,
            };
        case BUY_MEMBERSHIP:
            console.log('buy membership', payload);
            return {
                ...state,
                buy: payload,
            };
        case CLEAR_BUY:
            return {
                ...state,
                buy: null,
            };
        case EDIT_MEMBERSHIP:
            console.log(payload);
            return {
                ...state,
                members: payload,
            };
        case CLEAR_RENEW:
            return {
                ...state,
                renew: null,
            };
        case CLEAR_MEMBERSHIP_ERROR:
            // return [];
            return { ...state, error: null };
        // return null;
        case CLEAR_MEMBERSHIP:
            return {
                ...state,
                members: null,
                renew: null,
                buy: null,
                error: null,
                totalGallon: 0,
            };
        case DELETE_MEMBERSHIP:
            console.log(payload);
            return state;
        case SIGN_OUT:
            console.log(payload);
            return {
                ...state,
                members: null,
                renew: null,
                buy: null,
                error: null,
                totalGallon: 0,
            };
        // return [];
        case GET_TOTAL_GALLON:
            return { ...state, totalGallon: payload };
        default:
            return state;
    }
}

export function accountReducer(state = {}, { type, payload }) {
    switch (type) {
        case LOAD:
            console.log(payload);
            return payload;
        default:
            return state;
    }
}
