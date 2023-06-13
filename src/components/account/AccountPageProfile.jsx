// react
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

// apis
import { editUserInfo } from '../../api/auth';
import { toastSuccess, toastError } from '../toast/toastComponent';
// store
import { EDIT_PROFILE } from '../../store/auth/auth.types';

function AccountPageProfile({ auth, dispatch }) {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const { user: { name, email, phone } } = auth;
        setUser({ fullName: name, email, phone });
    }, []);

    function onChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function submit(e) {
        e.preventDefault();
        const {
            fullName, email, phone,
        } = user;
        editUserInfo({
            name: fullName, email, phone,
        }, (success) => {
            if (success.success) {
                toastSuccess(success);
                const { user } = success;

                dispatch({ type: EDIT_PROFILE, payload: { user } });
            } else { toastError(success); }
        }, (fail) => { toastError(fail); });
    }

    return (
        <div className="card">
            <Helmet>
                <title>{`Profile — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>Edit Profile</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="fullName"
                                value={user.fullName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-email">Email Address</label>
                            <input
                                id="profile-email"
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={user.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-phone">Phone Number</label>
                            <input
                                id="profile-phone"
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phone"
                                value={user.phone}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <button onClick={submit} type="button" className="btn btn-primary">Save</button>
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
export default connect(mapStateToProps)(AccountPageProfile);
