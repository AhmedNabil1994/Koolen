import React from 'react';
import './AccountVerify.css';

const AccountVerify = () => (
    <div className="account-verify">
        <div className="container">
            <div className="row">
                <div className="mx-auto col-sm-10 col-md-8 col-lg-6 col-12">
                    <div className="content my-5 my-lg-16 border overflow-hidden shadow-light">
                        <div className="info--text mb-3">A verification code has been sent to your email.</div>
                        <h3 className="text-uppercase lh-1 mb-4">
                            <div className="primary--text fw-900">Verify</div>
                            <div className="d-block fw-900 grey--text text--darken-3">Account</div>
                        </h3>
                        <div className="fs-16 fw-500 mb-3">Enter your email address, verification code</div>
                        <form action="" noValidate="novalidate" className="v-form">
                            <div className="mb-4">
                                <div className="mb-1 fs-13 fw-500">Email</div>
                                <div className="v-input v-input--hide-details theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder">
                                    <div className="v-input__control">
                                        <div className="v-input__slot">
                                            <div className="v-text-field__slot">
                                                <input type="email" required id="email" placeholder="Email address" />
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
                                                        className="otp-field-box--0"
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
                                    </div>
                                </div>
                            </div>
                            <button
                                className="px-12 mb-4 v-btn v-btn--has-bg theme--light elevation-0 v-size--x-large primary"
                                type="submit"
                            >
                                <span className="v-btn__content">Verify</span>
                            </button>
                            <button
                                className="px-12 mb-4 ms-3 v-btn v-btn--has-bg theme--light elevation-0 v-size--x-large"
                                type="button"
                            >
                                <span className="v-btn__content">Resend Code</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AccountVerify;
