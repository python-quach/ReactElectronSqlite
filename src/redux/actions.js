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
    UPDATE_MEMBERSHIP,
    EDIT_MEMBERSHIP,
    UPDATE_ACTIVE_ITEM,
    CLEAR_HISTORY,
} from './types';
import { channels } from '../shared/constants';
import { reset } from 'redux-form';

const { ipcRenderer } = window;

export function authenticate({ username, password }) {
    return function (dispatch) {
        ipcRenderer.send(channels.USER_INFO, { username, password });

        ipcRenderer.on(channels.USER_INFO, (event, data) => {
            ipcRenderer.removeAllListeners(channels.USER_INFO);
            dispatch({ type: AUTH_USER, payload: data });
        });
    };
}

export function clearHistory() {
    return function (dispatch) {
        dispatch({ type: CLEAR_HISTORY });
    };
}

export const updateActiveItem = (activeLink) => (dispatch, getState) => {
    // console.log('update activeLink', getState());
    dispatch({ type: UPDATE_ACTIVE_ITEM, payload: activeLink });
};

export function clearBuy() {
    return function (dispatch) {
        dispatch({ type: CLEAR_BUY });
    };
}

export function clearRenew() {
    return function (dispatch) {
        dispatch({ type: CLEAR_RENEW });
    };
}

// RENEW MEMBERSHIP
export function renewMembership(values) {
    console.log('renewMembership: ', values);

    const data = {
        ...values,
        fee: parseInt(values.fee),
    };

    console.log('renewMember', { data });

    return function (dispatch, getState) {
        ipcRenderer.send(channels.RENEW_MEMBERSHIP, data);

        ipcRenderer.on(channels.RENEW_MEMBERSHIP, (event, data) => {
            console.log('response: ', data);
            ipcRenderer.removeAllListeners(channels.RENEW_MEMBERSHIP);
            dispatch({ type: RENEW_MEMBERSHIP, payload: data });
            dispatch({ type: FIND_MEMBERSHIP, payload: [data.row] });

            dispatch(reset('renew'));
        });
    };
}

// BUY MEMBERSHIP
export function buyMembership(values) {
    return function (dispatch) {
        ipcRenderer.send(channels.BUY_MEMBERSHIP, values);

        ipcRenderer.on(channels.BUY_MEMBERSHIP, (event, data) => {
            console.log('response: ', data);
            ipcRenderer.removeAllListeners(channels.BUY_MEMBERSHIP);
            dispatch({ type: BUY_MEMBERSHIP, payload: data });
            dispatch({ type: FIND_MEMBERSHIP, payload: [data.row] });
        });
    };
}

export const getTotalGallon = (id) => (dispatch) => {
    ipcRenderer.send(channels.GET_TOTAL_GALLON, id);

    ipcRenderer.on(channels.GET_TOTAL_GALLON, (event, response) => {
        console.log({ response });

        ipcRenderer.removeAllListeners(channels.GET_TOTAL_GALLON);
        dispatch({ type: GET_TOTAL_GALLON, payload: response });
    });
};

// FIND MEMBERSHIP
export const findMembership = (data) => (dispatch) => {
    ipcRenderer.send(channels.FIND_MEMBERSHIP, data);

    ipcRenderer.on(channels.FIND_MEMBERSHIP, (_, response) => {
        ipcRenderer.removeAllListeners(channels.FIND_MEMBERSHIP);
        dispatch({ type: FIND_MEMBERSHIP, payload: response });
    });
};

// GallonBuy: 0
// GallonLeft: 0
// RenewGallon: 0
// account: "93280"
// first: "Audrey"
// id: 55
// last: "Tam"
// phone: "4083802382"
// since: "11/19/2020"
// todayDate: "11/19/2020"

export const editMembership = (data) => (dispatch) => {
    const { id, first, last, phone } = data;
    ipcRenderer.send(channels.EDIT_MEMBERSHIP, { id, first, last, phone });

    ipcRenderer.on(channels.EDIT_MEMBERSHIP, (_, response) => {
        ipcRenderer.removeAllListeners(channels.EDIT_MEMBERSHIP);
        dispatch({ type: EDIT_MEMBERSHIP, payload: response });
    });
};

// UPDATE MEMBERSHIP
export const updateMembership = (data) => (dispatch) => {
    console.log(data);
    ipcRenderer.send(channels.UPDATE_MEMBERSHIP, data);

    ipcRenderer.on(channels.UPDATE_MEMBERSHIP, (event, data) => {
        ipcRenderer.removeAllListeners(channels.UPDATE_MEMBERSHIP);
        dispatch({ type: UPDATE_MEMBERSHIP, payload: data });
    });
};

// ADD MEMBERSHIP
export const addNewMembership = (data) => (dispatch) => {
    ipcRenderer.send(channels.ADD_MEMBERSHIP, data);

    ipcRenderer.on(channels.ADD_MEMBERSHIP, (_, data) => {
        ipcRenderer.removeAllListeners(channels.ADD_MEMBERSHIP);
        dispatch({ type: ADD_MEMBERSHIP, payload: data });
    });
};

// DELETE EXISTING MEMBERSHIP
export function deleteMembership(id) {
    return function (dispatch) {
        ipcRenderer.send(channels.DELETE_MEMBERSHIP, id);

        ipcRenderer.on(channels.DELETE_MEMBERSHIP, (event, data) => {
            ipcRenderer.removeAllListeners(channels.DELETE_MEMBERSHIP);
            dispatch({ type: DELETE_MEMBERSHIP, payload: id });
        });
    };
}

// Get User Account History
export function showHistory(id) {
    return function (dispatch) {
        ipcRenderer.send(channels.GET_HISTORY, id);

        ipcRenderer.on(channels.GET_HISTORY, (event, data) => {
            ipcRenderer.removeAllListeners(channels.GET_HISTORY);
            dispatch({ type: GET_HISTORY, payload: data });
        });
    };
}

// Get Invoice from account
export const getInvoices = ({ id, limit, offset }) => (dispatch) => {
    ipcRenderer.send(channels.GET_INVOICES, { id, limit, offset });

    ipcRenderer.on(channels.GET_INVOICES, (event, data) => {
        ipcRenderer.removeAllListeners(channels.GET_INVOICES);
        console.log({ data });
        dispatch({ type: GET_INVOICES, payload: data });
    });
};

export function clearError() {
    return function (dispatch) {
        dispatch({ type: CLEAR_ERROR });
    };
}

export function clearMembershipError() {
    return function (dispatch) {
        dispatch({ type: CLEAR_MEMBERSHIP_ERROR });
    };
}

export function clearMembership() {
    return function (dispatch) {
        dispatch({ type: CLEAR_MEMBERSHIP });
        dispatch(reset('renew'));
    };
}

export function signout(history) {
    return function (dispatch) {
        dispatch({ type: SIGN_OUT });
    };
}

export function load(data) {
    console.log('load', data);
    return function (dispatch) {
        dispatch({ type: LOAD, payload: data });
    };
}
