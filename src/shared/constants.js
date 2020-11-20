module.exports = {
    channels: {
        APP_INFO: 'app_info',
        USER_INFO: 'user_info',
        FIND_MEMBERSHIP: `SELECT
            MembershipID id, 
            MemberAccount account, 
            MemberSince since, 
            FirstName first,  
            LastName last,  
            Phone phone 
        FROM
            memberships 
        WHERE
            MemberAccount = ?`,
        ADD_MEMBERSHIP: `SELECT 
            MembershipID id, 
            MemberAccount account, 
            MemberSince since, 
            FirstName first,  
            LastName last,  
            Phone phone 
        FROM memberships 
            WHERE MembershipID = ?`,
        DELETE_MEMBERSHIP: `DELETE FROM memberships WHERE MembershipID = ?`,
        GET_HISTORY: 'get_history',
        RENEW_MEMBERSHIP: 'renew_membership',
        BUY_MEMBERSHIP: 'buy_membership',
        GET_INVOICES: 'get_invoices',
        GET_TOTAL_GALLON: 'get_total_gallon',
        UPDATE_MEMBERSHIP: 'update_membership',
        EDIT_MEMBERSHIP: 'edit_membership',
    },
};
