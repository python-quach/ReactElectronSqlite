import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as helpers from '../../helpers';
import PhoneInput from 'react-phone-input-2';

const Phone = (props) => {
    return (
        <PhoneInput
            {...props.input}
            inputProps={{ readOnly: true }}
            specialLabel={'Phone'}
            disableCountryCode={true}
            disableDropdown={true}
            onlyCountries={['us']}
            defaultMask={'(...)-...-....'}
            alwaysDefaultMask={true}
            placeholder={'(408)-123-4567'}
            country={'us'}
            containerClass='four wide field'
            inputClass='ui focus input '
            inputStyle={{
                color: '#134469',
                fontWeight: 'bold',
                fontSize: 'large',
            }}
        />
    );
};

function RenewForm(props) {
    const { renewGallon, totalGallon, renew, kaka, test } = props;
    const [total, setTotal] = useState(totalGallon);

    useEffect(() => {
        console.log({ renewGallon, totalGallon, renew, kaka });
    }, [renewGallon, totalGallon, renew, kaka]);

    useEffect(() => {
        console.log({ kaka, totalGallon, renewGallon });
        if (renewGallon !== '') {
            // if (kaka && kaka.gallon) {
            //     setTotal(totalGallon + parseInt(kaka.gallon));
            // }
            if (kaka && kaka.gallon) {
                setTotal(kaka.gallon);
            } else {
                setTotal(totalGallon + parseInt(renewGallon));
            }
            // setTotal((totalGallon) => {
            //     return totalGallon + parseInt(renewGallon);
            // });
        } else {
            if (kaka && kaka.gallon) {
                setTotal(kaka.gallon);
            } else {
                setTotal(totalGallon);
            }
        }

        // if (kaka && kaka.renewGallon !== '') {
        //     setTotal(totalGallon + parseInt(kaka.renewGallon));
        // } else {
        //     if (kaka && kaka.gallon) setTotal(kaka.gallon);
        //     setTotal(totalGallon);
        // }
        // if (kaka && kaka.gallon !== 0) {
        //     setTotal(totalGallon + parseInt(kaka.gallon));
        // } else {
        //     setTotal(totalGallon);
        // }
    }, [renewGallon, totalGallon, kaka]);

    return (
        <Form>
            <Form.Group>
                <Field
                    component={Form.Input}
                    name='since'
                    label='MemberSince'
                    width={4}
                    readOnly
                    className='memberSince'
                />
                <Field
                    component={Form.Input}
                    name='todayDate'
                    label='Today Date'
                    width={4}
                    readOnly
                    className='todayDate'
                />
                <Field
                    type='hidden'
                    component={Form.Input}
                    name='hidden'
                    width={2}
                />
                <Field
                    error
                    component={Form.Input}
                    name='account'
                    label='Member #'
                    width={3}
                    readOnly
                    focus
                    className='memberAccount'
                />

                <Field
                    error
                    component={Form.Input}
                    name='id'
                    label='Record #'
                    width={3}
                    readOnly
                    className='memberRecord'
                    focus
                />
            </Form.Group>
            <Form.Group>
                <Field
                    component={Form.Input}
                    name='first'
                    label='First Name'
                    normalize={helpers.name}
                    className='firstName'
                    focus
                    width={4}
                    readOnly
                />
                <Field
                    className='lastName'
                    focus
                    width={4}
                    readOnly
                    // error
                    component={Form.Input}
                    name='last'
                    label='Last Name'
                    normalize={helpers.name}
                />
                <Field
                    type='hidden'
                    component={Form.Input}
                    name='hidden'
                    width={2}
                />
                <Field
                    disabled={renew || (kaka && kaka.gallon > 0)}
                    // disabled={renew}
                    className='feeStyle'
                    icon='dollar'
                    iconPosition='left'
                    width={3}
                    component={Form.Input}
                    name='fee'
                    label='Membership Fee'
                    format={helpers.formatMembershipFee}
                    normalize={helpers.normalizeMembershipFee}
                />
                <Field
                    // disabled={renew}
                    disabled={renew || (kaka && kaka.gallon > 0)}
                    className='gallonLeft'
                    component={Form.Input}
                    name='GallonLeft'
                    label='Total Gallon Left'
                    focus
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={3}
                />
            </Form.Group>
            <Form.Group>
                <Field
                    component={Phone}
                    name='phone'
                    normalize={helpers.normalizePhoneNumber}
                    width={4}
                />
                <Field
                    className='lastDateBuy'
                    component={Form.Input}
                    label={
                        kaka && kaka.RenewGallon === 0
                            ? 'Last Date Buy'
                            : 'Last Date Renew'
                    }
                    readOnly
                    name='InvoiceDate'
                    width={4}
                />
                <Field
                    type='hidden'
                    component={Form.Input}
                    name='hidden'
                    width={2}
                />
                <Field
                    disabled={renew || (kaka && kaka.gallon > 0)}
                    // disabled={renew}
                    className='renewGallon'
                    component={Form.Input}
                    name='renewGallon'
                    icon='theme'
                    iconPosition='left'
                    label='Renew Gallon'
                    focus
                    type='number'
                    width={3}
                    min='0'
                    max='999'
                    normalize={(value) => {
                        if (value.length < 4) {
                            return value;
                        }
                    }}
                />
                <Form.Input
                    // className='MemberGallonRenewal'
                    value={total}
                    name='totalGallon'
                    label='Member Gallon'
                    focus
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={3}
                    // className='totalMemberGallon'
                    className={renew ? 'totalMember' : 'totalMemberGallon'}
                />
            </Form.Group>
        </Form>
    );
}

const mapStateToProps = (state, ownProps) => {
    const lastPurchaseHistory = state.history[state.history.length - 1] || {
        GallonBuy: 0,
        GallonLeft: 0,
        RenewGallon: 0,
    };

    return {
        initialValues: {
            todayDate: helpers.todayDate(),
            fee: 20,
            renewGallon: 0,
            totalGallon: lastPurchaseHistory.GallonLeft,
            ...ownProps.record,
            ...lastPurchaseHistory,
        },
        test: state.membership.renew,
        renewGallon:
            state.form.renew && state.form.renew.values
                ? state.form.renew.values.renewGallon
                : 0,
        totalGallon:
            state.form.renew && state.form.renew.values
                ? state.form.renew.values.totalGallon
                : 0,
    };
};

const ReduxForm = reduxForm({ form: 'renew', enableReinitialize: true })(
    RenewForm
);
export default connect(mapStateToProps, null)(ReduxForm);
