// import React, { useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import './ChangePassword.css';
import { resetPassword } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';

const ChangePassword = () => {
    const intl = useIntl();
    const history = useHistory();
    const changePasswordFormik = useFormik({
        initialValues: {
            email: '',
            code: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(intl.formatMessage({ id: 'validation.email.format' }))
                .required(intl.formatMessage({ id: 'validation.email.required' })),
            code: Yup.number()
                .typeError('code must be a number')
                .required('code is required'),
            password: Yup.string()
                .min(6, intl.formatMessage({ id: 'validation.password.format' }))
                .required(intl.formatMessage({ id: 'validation.repeatPassword.required' })),
            repeatPassword: Yup.string()
                // .required(intl.formatMessage({ id: 'validation.repeatPassword.format' }))
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'password does not match'),
        }),
        onSubmit: (values) => {
            const { email, password, code } = values;
            resetPassword(
                {
                    email,
                    password,
                    code,
                },
                (success) => {
                    if (success.success) {
                        toastSuccess(success);
                        history.push('/account/login');
                    } else {
                        toastError(success);
                        // changePasswordFormik.resetForm();
                    }
                },
                (fail) => {
                    toastError(fail);
                },
            );
        },
    });

    return (
        <div className="change-password">
            <div className="container">
                <div className="row">
                    <div className="mx-auto col-sm-10 col-md-8 col-lg-6 col-12">
                        <div className="content my-5 my-lg-16 card">
                            <h3 className="lh-1 mb-2">Reset Password</h3>
                            <form onSubmit={changePasswordFormik.handleSubmit}>
                                <div className="mb-2">
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
                                                        className={`form-control ${changePasswordFormik.touched.email && changePasswordFormik.errors.email && 'is-invalid'}`}
                                                        value={changePasswordFormik.values.email}
                                                        onChange={changePasswordFormik.handleChange}
                                                        {...changePasswordFormik.getFieldProps('email')}
                                                    />
                                                    {
                                                        changePasswordFormik.touched.email && changePasswordFormik.errors.email
                                                            ? (
                                                                <div className="invalid-feedback">
                                                                    {changePasswordFormik.errors.email}
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2">
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
                                                            className={`form-control ${changePasswordFormik.touched.code && changePasswordFormik.errors.code && 'is-invalid'}`}
                                                            value={changePasswordFormik.values.code}
                                                            onChange={changePasswordFormik.handleChange}
                                                            {...changePasswordFormik.getFieldProps('code')}
                                                        />
                                                        {
                                                            changePasswordFormik.touched.code && changePasswordFormik.errors.code
                                                                ? (
                                                                    <div className="invalid-feedback">
                                                                        {changePasswordFormik.errors.code}
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
                                <div className="mb-2">
                                    <div className="mb-1 fs-13 fw-500">Password</div>
                                    <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
                                        <div className="v-input__control">
                                            <div className="v-input__slot">
                                                <div className="v-text-field__slot">
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        className={`form-control ${changePasswordFormik.touched.password && changePasswordFormik.errors.password && 'is-invalid'}`}
                                                        placeholder="Enter your password"
                                                        value={changePasswordFormik.values.password}
                                                        onChange={changePasswordFormik.handleChange}
                                                        {...changePasswordFormik.getFieldProps('password')}
                                                    />
                                                    {
                                                        changePasswordFormik.touched.password && changePasswordFormik.errors.password
                                                            ? (
                                                                <div className="invalid-feedback">
                                                                    {changePasswordFormik.errors.password}
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className="mb-1 fs-13 fw-500">Confirm Password</div>
                                    <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
                                        <div className="v-input__control">
                                            <div className="v-input__slot">
                                                <div className="v-text-field__slot">
                                                    <input
                                                        id="repeatPassword"
                                                        type="password"
                                                        name="repeatPassword"
                                                        className={`form-control ${changePasswordFormik.touched.repeatPassword && changePasswordFormik.errors.repeatPassword && 'is-invalid'}`}
                                                        placeholder="Confirm Password"
                                                        value={changePasswordFormik.values.repeatPassword}
                                                        onChange={changePasswordFormik.handleChange}
                                                        {...changePasswordFormik.getFieldProps('repeatPassword')}
                                                    />
                                                    {
                                                        changePasswordFormik.touched.repeatPassword && changePasswordFormik.errors.repeatPassword
                                                            ? (
                                                                <div className="invalid-feedback">
                                                                    {changePasswordFormik.errors.repeatPassword}
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn" type="submit">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// function mapStateToProps(state) {
//     return {
//         auth: state,
//     };
// }
// export default connect(mapStateToProps)(ChangePassword);
export default ChangePassword;
