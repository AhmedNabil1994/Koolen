import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
import './ChangePassword.css';
import { resetPassword } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(null);
    const [password, setpassword] = useState(null);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setpassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e) => {
        setpassword(e.target.value);
    };

    const resetPasswordFn = (e) => {
        e.preventDefault();
        const payload = {
            email,
            code,
            password,
        };
        resetPassword(
            payload,
            (success) => {
                if (success.success) {
                    toastSuccess(success);
                    history.push('/account/login');
                } else {
                    toastError(success);
                }
            },
            (fail) => toastError(fail),
        );
    };

    return (
        <div className="change-password">
            <div className="container">
                <div className="row">
                    <div className="mx-auto col-sm-10 col-md-8 col-lg-6 col-12">
                        <div className="content my-5 my-lg-16 card">
                            <h3 className="lh-1 mb-2">Reset Password</h3>
                            <form action="" noValidate="novalidate" className="v-form">
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
                                                        required
                                                        placeholder="Email address"
                                                        className="form-control"
                                                        onChange={handleEmailChange}
                                                    />
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
                                                            type="number"
                                                            required
                                                            id="in-0"
                                                            min={0}
                                                            placeholder="Enter the code"
                                                            autoComplete="one-time-code"
                                                            className="otp-field-box--0 form-control"
                                                            onChange={handleCodeChange}
                                                        />
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
                                                        required
                                                        className="form-control"
                                                        placeholder="Enter your password"
                                                        onChange={handlePasswordChange}
                                                    />
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
                                                        id="confirm-password"
                                                        type="password"
                                                        name="repeatPassword"
                                                        required
                                                        className="form-control"
                                                        placeholder="Confirm Password"
                                                        onChange={handlePasswordConfirmChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons-container d-flex justify-content-between">
                                    <button className="btn" type="submit" onClick={resetPasswordFn}>
                                        Reset Password
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

// function mapStateToProps(state) {
//     return {
//         auth: state,
//     };
// }
// export default connect(mapStateToProps)(ChangePassword);
export default ChangePassword;