export function name(value, previousValue, allValues, previousAllValues, name) {
    // console.log(
    //     'normalizeName:',
    //     value,
    //     previousValue,
    //     allValues,
    //     previousAllValues,
    //     name
    // );

    // Check to make sure only letter are allow
    const wordPattern = /^[a-zA-Z ]+$/;

    // Return the first letter as Uppercase, and make letter afterward lowercase, we only do this if there is pattern match
    // and there is a character enter,
    if (value.match(wordPattern) && value.length > 0) {
        return (
            value.charAt(0).toUpperCase() +
            value.slice(1).replace(/\s/g, '').toLowerCase()
        );
    } else {
        // Allow us to delete the the second to last character
        if (value.length > 1) {
            console.log(previousValue);
            return previousValue;
        } else {
            // console.log(
            //     value,
            //     previousValue,
            //     allValues,
            //     previousAllValues,
            //     name
            // );
            // Once there are not character to delete we return ''
            return '';
        }
    }
}

export function normalizePhoneNumber(value) {
    const numberPattern = /\d+/g;
    if (value.match(numberPattern)) {
        return value.match(numberPattern).join('');
    }
}

// export function normalizeName(value, previousValue, allValues, previousAllValues, name) {
//     const wordPattern = /^[a-zA-Z ]+$/;
//     if (value.match(wordPattern) && value.length > 0) {
//         return value.charAt(0).toUpperCase() + value.slice(1).replace(/\s/g, '').toLowerCase();
//     } else {
//         if (value.length > 1) {
//             return previousValue;
//         } else {
//             return '';
//         }
//     }
// }

export function normalizeMembership(value, prevValue) {
    const numberPattern = /^[0-9]+$/g;
    console.log(value);
    if (value.match(numberPattern)) {
        return value;
    } else {
        if (value.length > 1) {
            return prevValue;
        } else {
            return '';
        }
    }
}

export function todayDate() {
    const today = new Date();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    const yyyy = today.getFullYear();

    if (dd < 10) {
        dd = `0${dd}`;
    }

    if (mm < 10) {
        mm = `0${mm}`;
    }

    return `${mm}/${dd}/${yyyy}`;
    // return todayDate;
}

export function formatPhoneNumber(number) {
    if (number) {
        const x = number.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
        return '(' + x[1] + ') ' + x[2] + '-' + x[3];
    }
}

export function formatMembershipFee(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
    });

    // return value;

    if (value.length < formatter.format(value).length || 0) {
        // if (value ? value.length < formatter.format(value).length : 0) {
        return value;
    } else {
        return formatter.format(value);
    }
}

export function normalizeMembershipFee(value, previousValue) {
    const numberPattern = /^[0-9]{1,9}[.]{0,1}[0-9]{0,1}[0-9]{0,1}$/g;

    if (value.match(numberPattern)) {
        return value;
    } else if (previousValue.length < value.length) {
        return previousValue;
    } else {
        return '';
    }
}
