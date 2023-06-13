// react
import React, { useState } from 'react';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';

// data stubs
import theme from '../../data/theme';

// api
import { editUserInfo } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';

function AccountPagePassword({ auth }) {
    const [password, setPassword] = useState({
        new: '',
        reenter: '',
    });
    const { name, email, phone } = auth.user;

    function onChange(e) {
        setPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function createPass() {
        const payload = {
            name, email, phone, password: password.new, confirmPassword: password.reenter,
        };
        editUserInfo(payload, (success) => {
            if (success.success) {
                toastSuccess(success);
            } else {
                toastError(success);
            }
        }, (fail) => toastError(fail));
    }

    return (
        <div className="card">
            <Helmet>
                <title>{`Change Password — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5><FormattedMessage id="changePassword" defaultMessage="Change Password" /></h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <div className="form-group">
                            <label htmlFor="password-new">New Password</label>
                            <input
                                type="password"
                                name="new"
                                className="form-control"
                                id="password-new"
                                placeholder="New Password"
                                value={password.new}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-confirm">Re-Enter New Password</label>
                            <input
                                type="password"
                                name="reenter"
                                className="form-control"
                                id="password-confirm"
                                placeholder="Reenter New Password"
                                value={password.reenter}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group mt-5 mb-0">
                            <button onClick={createPass} type="button" className="btn btn-primary">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(AccountPagePassword);
