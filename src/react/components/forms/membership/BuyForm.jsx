import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions';
import { reduxForm, Field } from 'redux-form';
import * as helpers from '../../helpers';
import RenewPhone from '../../fields/RenewPhoneInput';

function BuyForm(props) {
    const { buyGallon, totalGallon, purchase, buy, renew, GallonBuy } = props;
    const [total, setTotal] = useState(totalGallon);

    useEffect(() => {
        console.log({ purchase, buy, renew, GallonBuy });
    }, [purchase, buy, renew, GallonBuy]);

    useEffect(() => {
        if (buyGallon === '') {
            setTotal(totalGallon);
        } else {
            setTotal(totalGallon - parseInt(buyGallon));
        }
    }, [buyGallon, totalGallon]);

    return (
        <Form>
            <Form.Group>
                <Field
                    name='since'
                    className='memberSince'
                    label='MemberSince'
                    component={Form.Input}
                    width={4}
                    readOnly
                />
                <Field
                    name='todayDate'
                    component={Form.Input}
                    label='Today Date'
                    width={4}
                    readOnly
                    className='todayDate'
                />
                <Field
                    name='hidden'
                    component={Form.Input}
                    type='hidden'
                    width={2}
                />
                <Field
                    name='account'
                    component={Form.Input}
                    label='Member #'
                    width={3}
                    readOnly
                    error
                    focus
                    className='memberAccount'
                />
                <Field
                    error
                    name='id'
                    component={Form.Input}
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
                    component={Form.Input}
                    name='last'
                    label='Last Name'
                    normalize={helpers.name}
                    className='lastName'
                    focus
                    width={4}
                    readOnly
                />
                <Field
                    type='hidden'
                    component={Form.Input}
                    name='hidden'
                    width={2}
                />
                {renew !== 0 ? (
                    <Form.Input
                        error
                        value={props.initialValues.RenewGallon}
                        name='renewGallon'
                        label='Last Renew Gallon'
                        focus
                        icon='tint'
                        iconPosition='left'
                        readOnly
                        width={3}
                        className='totalMemberGallon'
                    />
                ) : (
                    <Field
                        error={purchase}
                        className='lastGallon'
                        focus
                        component={Form.Input}
                        name='lastGallon'
                        label='Last Gallon Buy'
                        icon='tint'
                        iconPosition='left'
                        readOnly
                        width={3}
                        format={(value) => {
                            if (value === 'RENEW') {
                                return 0;
                            } else {
                                return value;
                            }
                        }}
                    />
                )}
                {/* <Field
                    error={purchase}
                    className='lastGallon'
                    focus
                    component={Form.Input}
                    name='lastGallon'
                    label='Last Gallon Buy'
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={3}
                    format={(value) => {
                        if (value === 'RENEW') {
                            return 0;
                        } else {
                            return value;
                        }
                    }}
                /> */}
                {/* <Field
                    component={Form.Input}
                    name='fee'
                    label='Membership Fee'
                    format={helpers.formatMembershipFee}
                    normalize={helpers.normalizeMembershipFee}
                    className='feeStyle'
                    icon='dollar'
                    iconPosition='left'
                    width={2}
                /> */}
                <Field
                    className='totalMemberGallon'
                    component={Form.Input}
                    name='totalGallon'
                    label='Total Gallon'
                    focus
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={3}
                />
            </Form.Group>
            <Form.Group>
                {/* We need to modify the containerClass on this one */}
                <Field
                    component={RenewPhone}
                    name='phone'
                    normalize={helpers.normalizePhoneNumber}
                    readOnly
                />
                <Field
                    className='lastDateBuy'
                    component={Form.Input}
                    // label='Last Date Buy'
                    label={renew !== 0 ? 'Last Date Renew' : 'Last Date Buy'}
                    // label='Last Date Buy'
                    readOnly
                    name='InvoiceDate'
                    width={4}
                />
                {/* <Field
                    className='lastGallon'
                    focus
                    component={Form.Input}
                    name='lastGallon'
                    label='Last Gallon Buy'
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={2}
                    format={(value) => {
                        if (value === 'RENEW') {
                            return 0;
                        } else {
                            return value;
                        }
                    }}
                /> */}
                {/* <Form.Input
                    value={props.initialValues.RenewGallon}
                    name='renewGallon'
                    label='Last Renew Gallon'
                    focus
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={2}
                    className='totalMemberGallon'
                /> */}
                <Field
                    type='hidden'
                    component={Form.Input}
                    name='hidden'
                    width={2}
                />
                {}
                <Field
                    className='buyGallon'
                    component={Form.Input}
                    disabled={purchase}
                    name='buyGallon'
                    icon='theme'
                    iconPosition='left'
                    label='Gallon Buy'
                    focus
                    type='number'
                    width={3}
                    min='0'
                    // max='999'
                    max={totalGallon}
                    normalize={(value, preValue) => {
                        if (value === '') {
                            return value;
                        } else {
                            if (
                                !value.match(/^0+(?!$)/) &&
                                value <= totalGallon
                            )
                                return parseInt(value, 10);
                            return preValue;
                        }
                    }}
                />
                <Form.Input
                    disabled={purchase}
                    value={total}
                    name='gallonBuyLeft'
                    label='Gallon Left If Buy'
                    focus
                    icon='tint'
                    iconPosition='left'
                    readOnly
                    width={3}
                    className='totalMemberGallon'
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
            fee: 25,
            buyGallon: 0,
            lastGallon: parseInt(lastPurchaseHistory.GallonBuy) || 0,
            totalGallon: lastPurchaseHistory.GallonLeft,
            ...ownProps.record,
            ...lastPurchaseHistory,
        },
        buyGallon: state.form.buy ? state.form.buy.values.buyGallon : 0,
        totalGallon: state.form.buy ? state.form.buy.values.totalGallon : 0,
    };
};

const ReduxForm = reduxForm({ form: 'buy', enableReinitialize: true })(BuyForm);
export default connect(mapStateToProps, actions)(ReduxForm);
