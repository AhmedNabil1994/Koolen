import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './AccountVerify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { toastSuccess, toastError } from '../toast/toastComponent';
import { resendCode, verifyCode } from '../../api/auth';
import { LOGIN } from '../../store/auth/auth.types';
import { getToken } from '../../api/network';

const AccountVerify = (props) => {
    const { dispatch } = props;
    console.log('the props', props);
    const intl = useIntl();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            code: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(intl.formatMessage({ id: 'validation.email.format' }))
                .required(intl.formatMessage({ id: 'validation.email.required' })),
            code: Yup.number()
                .typeError('code must be a number')
                .required('code is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const resendCodeFn = (e) => {
        e.preventDefault();
        const payload = {
            email: formik.values.email,
        };
        resendCode(
            payload,
            (success) => {
                if (success.success) {
                    toastSuccess(success);
                } else {
                    toastError(success);
                }
            },
            (fail) => toastError(fail),
        );
    };

    const verifyCodeFn = (e) => {
        e.preventDefault();
        const payload = {
            email: formik.values.email,
            code: formik.values.code,
        };
        verifyCode(
            payload,
            (success) => {
                if (success.success) {
                    toastSuccess(success);
                    // edit
                    const { access_token: token, user } = success;
                    console.log(token);
                    console.log(user);
                    getToken(token);
                    dispatch({ type: LOGIN, payload: { token, user } });
                    history.push('/');
                    // history.push('/account/login');
                } else {
                    toastError(success);
                }
            },
            (fail) => toastError(fail),
        );
    };

    return (
        <div className="account-verify">
            <div className="container">
                <div className="row">
                    <div className="mx-auto col-sm-10 col-md-8 col-lg-6 col-12">
                        <div className="content my-5 my-lg-16 border overflow-hidden shadow-light">
                            <div className="info--text mb-3 title-1">
                                A verification code has been sent to your email.
                            </div>
                            <h3 className="text-uppercase lh-1 mb-4">
                                <div className="primary--text fw-900">Verify</div>
                                <div className="d-block fw-900 grey--text text--darken-3">Account</div>
                            </h3>
                            <div className="title-2 mb-3">Enter your email address, verification code</div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <div className="mb-1 fs-13 fw-500">Email</div>
                                    <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
                                        <div className="v-input__control">
                                            <div className="v-input__slot">
                                                <div className="v-text-field__slot">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email address"
                                                        className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        {...formik.getFieldProps('email')}
                                                    />
                                                    {
                                                        formik.touched.email && formik.errors.email
                                                            ? (
                                                                <div className="invalid-feedback">
                                                                    {formik.errors.email}
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="mb-1 fs-13 fw-500">Code</div>
                                    <div className="v-otp-input theme--light">
                                        <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="text"
                                                            id="code"
                                                            name="code"
                                                            placeholder="Enter the code"
                                                            className={`form-control ${formik.touched.code && formik.errors.code && 'is-invalid'}`}
                                                            value={formik.values.code}
                                                            onChange={formik.handleChange}
                                                            {...formik.getFieldProps('code')}
                                                        />
                                                        {
                                                            formik.touched.code && formik.errors.code
                                                                ? (
                                                                    <div className="invalid-feedback">
                                                                        {formik.errors.code}
                                                                    </div>
                                                                )
                                                                : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons-container d-flex justify-content-between">
                                    <button className="btn verify" type="submit" onClick={verifyCodeFn}>
                                        Verify
                                    </button>
                                    <button className="btn resend-code" type="submit" onClick={resendCodeFn}>
                                        Resend Code
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        auth: state,
    };
}
export default connect(mapStateToProps)(AccountVerify);
