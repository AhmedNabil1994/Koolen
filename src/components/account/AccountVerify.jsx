import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AccountVerify.css';
import { resendCode, verifyCode } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';

const AccountVerify = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(null);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const resendCodeFn = (e) => {
        console.log('Received');
        e.preventDefault();
        const payload = {
            email,
        };
        resendCode(
            payload,
            (success) => {
                if (success.success) {
                    console.log(success.message);
                    toastSuccess(success);
                } else {
                    console.log(success.message);
                    toastError(success);
                }
            },
            (fail) => toastError(fail),
        );
    };

    const verifyCodeFn = (e) => {
        // console.log('Received');
        e.preventDefault();
        const payload = {
            email,
            code,
        };
        verifyCode(
            payload,
            (success) => {
                if (success.success) {
                    console.log(success.message);
                    toastSuccess(success);
                    history.push('/');
                } else {
                    console.log(success.message);
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
                            <form action="" noValidate="novalidate" className="v-form">
                                <div className="mb-4">
                                    <div className="mb-1 fs-13 fw-500">Email</div>
                                    <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
                                        <div className="v-input__control">
                                            <div className="v-input__slot">
                                                <div className="v-text-field__slot">
                                                    <input
                                                        type="email"
                                                        required
                                                        id="email"
                                                        placeholder="Email address"
                                                        className="form-control"
                                                        onChange={handleEmailChange}
                                                    />
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
                                                            type="number"
                                                            required
                                                            id="in-0"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--0 form-control"
                                                            onChange={handleCodeChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="number"
                                                            required
                                                            id="in-1"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--1"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="number"
                                                            required
                                                            id="in-2"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="number"
                                                            required
                                                            id="in-3"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="number"
                                                            required
                                                            id="in-4"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--4"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--outlined">
                                            <div className="v-input__control">
                                                <div className="v-input__slot">
                                                    <div className="v-text-field__slot">
                                                        <input
                                                            type="number"
                                                            required
                                                            id="in-5"
                                                            min={0}
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--5"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
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

export default AccountVerify;
