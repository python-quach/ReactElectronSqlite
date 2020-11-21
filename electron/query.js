const verifyUserLogin = (db, username, password, callback) => {
    console.log('verify login', { username, password });
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(sql, [username, password], (err, row) => {
        if (err) return console.log(err.message);
        if (!row) callback({ auth: false, error: 'Invalid Credential' });

        callback({ auth: true, error: null });
    });
};

const findMembership = (db, args, callback) => {
    console.log('find member:', { args });
    const { id, membership, phone, firstName, lastName } = args;
    const sql = `SELECT 
                    MembershipID id, 
                    MemberAccount account, 
                    MemberSince since, 
                    FirstName first, 
                    LastName last, 
                    Phone phone,
                    RemainingGallon gallon
                FROM memberships 
                    WHERE MembershipID = ? 
                    OR MemberAccount = ? 
                    OR Phone = ? 
                    OR FirstName = ?
                    AND LastName = ?`;
    db.all(sql, [id, membership, phone, firstName, lastName], (err, rows) => {
        if (err) return console.log(err.message);
        if (rows.length > 0) callback(rows);

        callback({ error: 'Unable to find member' });
    });
};

const findTotalGallon = (db, arg, callback) => {
    console.log('heard get total', arg);
    const sql = `SELECT GallonLeft FROM invoices 
                    INNER JOIN memberships 
                    USING(MembershipId) 
                    WHERE MembershipID = ? 
                    ORDER BY InvoiceId 
                    DESC LIMIT 1`;

    db.get(sql, arg, (err, row) => {
        if (err) return console.log(err.message);
        callback(row.GallonLeft);
    });
};

const findHistory = (db, arg, callback) => {
    console.log('heard history', arg);
    const sql = `SELECT InvoiceId, InvoiceDate, GallonBuy, GallonLeft, RenewGallon, FirstName, LastName, MembershipId, MemberAccount 
                    FROM invoices 
                    INNER JOIN memberships 
                    USING(MembershipId) 
                    WHERE MembershipID = ?`;
    db.all(sql, arg, function (err, rows) {
        if (err) return console.log(err.message);
        callback(rows);
    });
};

const deleteMembership = (db, arg, callback) => {
    console.log('heard delete', arg);
    const sql = `DELETE FROM memberships WHERE MembershipID = ?`;
    db.run(sql, arg, function (err) {
        if (err) return console.log(err.message);
        callback(this.lastID);
    });
};

const getInvoices = (db, arg, callback) => {
    console.log('heard get invoices: ', { arg });

    const { id, limit, offset } = arg;
    const sql_getTotalInvoices = `SELECT COUNT(*) as count FROM invoices WHERE MembershipId = ?`;
    const sql_totalGallonPurchase = `SELECT GallonBuy, GallonLeft FROM invoices WHERE MembershipId = ${id}`;

    db.all(sql_totalGallonPurchase, (err, rows) => {
        if (rows.length > 0) {
            const total = rows.reduce(function (acc, obj) {
                if (obj.GallonBuy !== 'RENEW')
                    return acc + parseInt(obj.GallonBuy);
                else {
                    return acc;
                }
            }, 0);

            const remaining = rows[rows.length - 1];

            const { GallonLeft } = remaining;

            const sql = `SELECT 
                            InvoiceId, 
                            InvoiceDate, 
                            GallonBuy, 
                            GallonLeft, 
                            RenewGallon, 
                            FirstName, 
                            LastName, 
                            MembershipId, 
                            MemberAccount 
                        FROM invoices 
                        INNER JOIN memberships USING(MembershipId) 
                        WHERE MembershipID = ? 
                        ORDER BY InvoiceId DESC
                        LIMIT ${limit} OFFSET ${offset}`;

            db.get(sql_getTotalInvoices, id, (err, count) => {
                db.all(sql, id, (err, rows) => {
                    if (err) return console.log(err.message);
                    callback({
                        rows,
                        count: count.count,
                        totalPurchaseGallon: total,
                        remainingGallon: GallonLeft,
                        test: remaining,
                    });
                });
            });
        } else {
            callback(rows);
        }
    });
};

const addMembership = (db, arg, callback) => {
    const { phone, firstName, lastName, membership, todayDate } = arg;
    console.log('heard add new member', arg);

    db.run(
        `INSERT INTO memberships(MemberAccount, MemberSince, FirstName, LastName, Phone) VALUES(?, ?, ?, ?, ?)`,
        [membership, todayDate, firstName, lastName, phone],
        function (err) {
            if (err) {
                console.log(err.message);
                let message;

                if (
                    err.message ===
                    'SQLITE_CONSTRAINT: UNIQUE constraint failed: memberships.Phone'
                ) {
                    message = `Phone Number: ${phone}`;
                }

                if (
                    err.message ===
                    'SQLITE_CONSTRAINT: UNIQUE constraint failed: memberships.MemberAccount'
                ) {
                    message = `Account Number: ${membership}`;
                }
                callback({
                    error: `Membership  ${message}  already existed, please use a different one`,
                });
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            db.get(
                `SELECT 
                    MembershipID id, 
                    MemberAccount account, 
                    MemberSince since, 
                    FirstName first,  
                    LastName last,  
                    Phone phone 
                FROM memberships 
                WHERE MembershipID = ?`,
                this.lastID,
                (err, row) => {
                    if (err) return console.log(err.message);
                    console.log('row detail', row);
                    callback([row]);
                }
            );
        }
    );
};

const buyMembershipGallon = (db, arg, callback) => {
    console.log('heard buy membership', arg);
    const { buyGallon, totalGallon, id, todayDate } = arg;
    console.log('buyGallon', parseInt(buyGallon));
    console.log('totalGallon', totalGallon);

    const remainingGallon = totalGallon - parseInt(buyGallon);
    const sql = `INSERT into invoices(MembershipId, GallonBuy, InvoiceDate, GallonLeft, RenewGallon) 
                VALUES(?, ?, ?, ?, ?)`;
    const test = `SELECT InvoiceId, MembershipId , InvoiceDate, GallonBuy , GallonLeft , RenewGallon 
                FROM invoices 
                WHERE InvoiceId = ? `;

    const sql_find = `SELECT  MembershipID id, 
                            MemberAccount account, 
                        MemberSince since, 
    FirstName first, 
    LastName last, 
    Phone phone,
    RemainingGallon gallon
    FROM memberships WHERE MembershipID = ?`;

    // Find and Update the membership total gallon left
    const sql_updateGallon = `UPDATE memberships
                                SET RemainingGallon = ?
                                WHERE MembershipID = ?`;

    db.run(
        sql,
        [id, parseInt(buyGallon), todayDate, remainingGallon, 0],
        function (err) {
            if (err) {
                callback({ error: `MembershipId ${id} unable to add invoice` });
                return console.log(err.messages);
            }
            db.get(test, this.lastID, (err, row) => {
                const buyData = row;
                const gallonRemain = row.GallonLeft;
                console.log({ gallonRemain, id });

                db.run(sql_updateGallon, [gallonRemain, id], () => {
                    if (err) return console.log(err.message);

                    db.get(sql_find, [id], (err, row) => {
                        console.log('buy row detail', { ...buyData, row });
                        callback({ ...buyData, row });
                    });
                });
            });
        }
    );
};

const renewMembership = (db, arg, callback) => {
    console.log('heard renew membership', arg);
    const { renewGallon, GallonLeft, id, todayDate, fee } = arg;

    const sql = `INSERT into invoices(MembershipId, GallonBuy, InvoiceDate, GallonLeft, RenewGallon, Fee) 
                    VALUES(?, ?, ?, ?, ?, ?)`;
    const test = `SELECT InvoiceId, MembershipId , InvoiceDate, GallonBuy , GallonLeft , RenewGallon 
                    FROM invoices 
                    WHERE InvoiceId = ? `;

    const sql_find = `SELECT  MembershipID id, 
                    MemberAccount account, 
                MemberSince since, 
            FirstName first, 
LastName last, 
Phone phone,
RemainingGallon gallon
FROM memberships WHERE MembershipID = ?`;

    // Find and Update the membership total gallon left
    const sql_updateGallon = `UPDATE memberships
                        SET RemainingGallon = ?
                        WHERE MembershipID = ?`;

    const newGallonLeft = parseInt(renewGallon) + GallonLeft;

    db.run(
        sql,
        [id, 'RENEW', todayDate, newGallonLeft, parseInt(renewGallon), fee],
        function (err) {
            if (err) {
                callback({ error: `Membership # ${id} unable to add invoice` });
            }

            db.get(test, this.lastID, (err, row) => {
                const renewData = row;
                const gallonRemain = row.GallonLeft;
                console.log({ gallonRemain, id });

                db.run(sql_updateGallon, [gallonRemain, id], () => {
                    if (err) return console.log(err.message);

                    db.get(sql_find, [id], (err, row) => {
                        console.log('renew row detail', { ...renewData, row });
                        callback({ ...renewData, row });
                    });
                });
            });

            // console.log(
            //     `A renew row has been inserted with row id ${this.lastID}`
            // );
            // db.get(test, this.lastID, (err, row) => {
            //     if (err) return console.log(err.message);
            //     console.log('renew row detail', row);
            //     callback(row);
            // });
        }
    );
};

const editMembership = (db, arg, callback) => {
    console.log('editMembership', { arg });
    const { id, first, last, phone } = arg;

    const sql = `UPDATE memberships 
                    SET Phone = ?,
                        FirstName = ?,
                        LastName = ? 
                    WHERE 
                        MembershipID = ? `;

    db.run(sql, [phone, first, last, id], () => {
        db.get(
            `SELECT MembershipID id, MemberAccount account, MemberSince since, FirstName first, LastName last, Phone phone 
            FROM memberships 
            WHERE MembershipID = ? 
            `,
            id,
            (err, row) => {
                console.log('update', { row });
                callback([row]);
            }
        );
        // callback(this.lastID);
    });
};
module.exports = {
    query: {
        AUTH: verifyUserLogin,
        FIND: findMembership,
        ADD: addMembership,
        RENEW: renewMembership,
        BUY: buyMembershipGallon,
        EDIT: editMembership,
        TOTAL_GALLON: findTotalGallon,
        DELETE: deleteMembership,
        HISTORY: findHistory,
        INVOICES: getInvoices,
    },
};
