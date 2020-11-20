const { ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3');
const { channels } = require('../src/shared/constants');
const { query } = require('./query');

function loadSQL(app) {
    // SQL
    const userData = app.getPath('userData');
    const dbFile = path.resolve(userData, 'db.sqlite3');
    const db = new sqlite3.Database(dbFile, (err) => {
        console.log('Database error:', { err, userData, dbFile });
    });

    // Verify User Login
    ipcMain.on(channels.USER_INFO, (event, { username, password }) => {
        query.AUTH(db, username, password, (data) => {
            event.sender.send(channels.USER_INFO, data);
        });
    });

    // Find Membership
    ipcMain.on(channels.FIND_MEMBERSHIP, (event, args) => {
        query.FIND(db, args, (data) => {
            event.sender.send(channels.FIND_MEMBERSHIP, data);
        });
    });

    // Get total gallon left
    ipcMain.on(channels.GET_TOTAL_GALLON, (event, arg) => {
        query.GET_TOTAL_GALLON(db, arg, (gallonLeft) => {
            event.sender.send(channels.GET_TOTAL_GALLON, gallonLeft);
        });
    });

    // Cancel Membership
    ipcMain.on(channels.DELETE_MEMBERSHIP, (event, arg) => {
        query.DELETE(db, arg, (data) => {
            event.sender.send(channels.DELETE_MEMBERSHIP, data);
        });
    });

    // Listen for history request
    ipcMain.on(channels.GET_HISTORY, (event, arg) => {
        query.HISTORY(db, arg, (data) => {
            event.sender.send(channels.GET_HISTORY, data);
        });
    });

    // Get invoices
    ipcMain.on(channels.GET_INVOICES, (event, arg) => {
        query.INVOICES(db, arg, (data) => {
            event.sender.send(channels.GET_INVOICES, data);
        });
    });

    // Add new membership to database
    ipcMain.on(channels.ADD_MEMBERSHIP, (event, arg) => {
        query.ADD(db, arg, (data) => {
            event.sender.send(channels.ADD_MEMBERSHIP, data);
        });
    });

    // Buy membership gallon
    ipcMain.on(channels.BUY_MEMBERSHIP, (event, arg) => {
        query.BUY(db, arg, (data) => {
            event.sender.send(channels.BUY_MEMBERSHIP, data);
        });
    });

    // Renew Membership to database
    ipcMain.on(channels.RENEW_MEMBERSHIP, (event, arg) => {
        query.RENEW(db, arg, (data) => {
            event.sender.send(channels.RENEW_MEMBERSHIP, data);
        });
    });

    // Edit Membership Info
    ipcMain.on(channels.EDIT_MEMBERSHIP, (event, arg) => {
        query.EDIT(db, arg, (data) => {
            event.sender.send(channels.EDIT_MEMBERSHIP, data);
        });
    });
}

exports.loadSQL = loadSQL;
